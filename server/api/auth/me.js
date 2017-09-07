const router = require('express').Router();
const User = require('../users/user.model');
const HttpError = require('../../utils/HttpError');

// http://localhost:8080/api/auth/me  PUT

// {
// 	"email": "kalo@sokum.com",
// 	"password": "rojgaf"
// }

// http://localhost:8080/api/users/1 GET

//  session Session {
//   cookie: 
//    { path: '/',
//      _expires: null,
//      originalMaxAge: null,
//      httpOnly: true },
//   counter: 3,
//   userId: 1 }

router.put('/', (req, res, next) => {
   const { email, password } = req.body;
   User.findOne({
       where: { email, password }
   }) 
   .then(user => {
       if(user) {
           req.session.userId = user.id;
           //res.json(req.session);
           res.json(user);
       } else {
           throw new HttpError(401);
       }
   })
   .catch(next)
})

module.exports = router;