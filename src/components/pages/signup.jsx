import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth, database } from "../../firebase/firebase";
import { ReactComponent as SignupSVG } from "../../assets/signup.svg";
const Signup = props => {
  const [usercredentials, setUserCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [signUpError, setSignUpError] = useState(null);
  const [signUpSuccessMessage, setSignUpSuccessMessage] = useState(null);
  const { username, email, password, confirmPassword } = usercredentials;

  const handleChange = e => {
    const { name, value } = e.target;
    setUserCredentials({ ...usercredentials, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    // sign up user + (add name and photoURL to user info) with this data in database
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      // https://firebase.google.com/docs/auth/web/manage-users#update_a_users_profile
      await user.updateProfile({
        displayName: username,
        photoURL: `https://api.adorable.io/avatars/285/${user.email}.png`
      });

      // https://firebase.google.com/docs/database/web/read-and-write
      database.ref("users/" + user.uid).set({
        username: user.displayName,
        avatarURL: user.photoURL
      });

      setSignUpError(null);
      setSignUpSuccessMessage("User Created Successfully");
    } catch (err) {
      console.error(err);
      setSignUpError(err.message);
      setSignUpSuccessMessage(null);
    }
  };

  return (
    <div id="sign-up" className="container pt-3">
      <div className="row text-center">
        <div className="signup-left col-sm-12 col-md-6">
          <h3 className="pb-2 text-lg-middle"> Sign Up</h3>
          <div className="alert-box pt-2 pb-2 px-1 text-lg-middle">
            {signUpError && (
              <div className="alert alert-danger">{signUpError}</div>
            )}
            {signUpSuccessMessage && (
              <div className="alert alert-success">{signUpSuccessMessage}</div>
            )}
          </div>

          <form className="py-2 px-5 text-md-middle" onSubmit={handleSubmit}>
            <div className="form-group ml-md-3">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                className="form-control"
                type="text"
                name="username"
                placeholder="Enter Username"
                onChange={handleChange}
                value={username}
                required
              />
            </div>

            <div className="form-group ml-md-3">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                className="form-control"
                type="email"
                name="email"
                placeholder="Enter Email Address"
                onChange={handleChange}
                value={email}
                required
              />
            </div>

            <div className="form-group ml-md-3">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                className="form-control"
                type="password"
                name="password"
                placeholder="Enter Password"
                onChange={handleChange}
                value={password}
                autoComplete="true"
                required
              />
            </div>
            <div className="form-group ml-md-3">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                id="confirm-password"
                className="form-control"
                type="password"
                name="confirmPassword"
                placeholder="Enter Confirm Password"
                onChange={handleChange}
                value={confirmPassword}
                autoComplete="true"
                required
              />
            </div>
            <button className="btn btn-primary px-3" type="submit">
              Submit
            </button>
            <div>
              Already Have an account? <Link to="/login">Login</Link>
            </div>
          </form>
        </div>
        <div className="signup-right col-sm-12 col-md-6 pt-2">
          <SignupSVG />
        </div>
      </div>
    </div>
  );
};

export default Signup;
