import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
//import { browserHistory } from 'react-router-dom';
import { loginAndGoToUser as reduxLogin } from '../redux/currentUser';

/* -----------------    COMPONENT     ------------------ */

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
  }

  render() {
    const { message } = this.props;
    return (
      <div className="signin-container">
        <div className="buffer local">
          <form onSubmit={this.onLoginSubmit}>
            <div className="form-group">
              <label>email</label>
              <input
                name="email"
                type="email"
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
                <label>password</label>
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  required
                />
            </div>
            <button type="submit" className="btn btn-block btn-primary">{message}</button>
          </form>
        </div>
        <div className="or buffer">
          <div className="back-line">
            <span>OR</span>
          </div>
        </div>
        <div className="buffer oauth">
          <p>
            <a
              target="_self"
              href="/api/auth/google"
              className="btn btn-social btn-google">
              <i className="fa fa-google" />
              <span>{message} with Google</span>
            </a>
          </p>
        </div>
      </div>
    );
  }

  onLoginSubmit(event) {
    event.preventDefault();
    const { message } = this.props;
    const { email, password } = event.target;
    const user = {
      email: email.value,
      password: password.value
    }
    // const thunk = login(user);
    // store.dispatch(thunk);
    this.props.reactLogin(user)
    // .then(loggedInUser => {
    //   console.log(loggedInUser);
    //   console.log(browserHistory);
    //   browserHistory.push(`/users/${loggedInUser.id}`)
    // })
    // .catch(console.error.bind(console))
    //console.log(`${message} isn't implemented yet`, user);
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = () => ({ message: 'Log in' });
// const mapDispatch = dispatch => ({
//   reactLogin: user => {
//     const thunk = reduxLogin(user);
//     dispatch(thunk)
//   }
// });

const mapDispatch = dispatch => ({
  reactLogin: user => (dispatch(reduxLogin(user)))
});

//const mapDispatch => { reactLogin: reduxLogin }

export default connect(mapState, mapDispatch)(Login);
