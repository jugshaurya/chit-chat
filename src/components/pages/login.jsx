import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { ReactComponent as LoginSVG } from "../../assets/login.svg";
const Login = props => {
  const [usercredentials, setUserCredentials] = useState({
    email: "",
    password: ""
  });

  const [loginError, setLoginError] = useState(null);
  const [loginSuccessMessage, setLoginSuccessMessage] = useState(null);
  const { email, password } = usercredentials;

  const handleChange = e => {
    const { name, value } = e.target;
    setUserCredentials({ ...usercredentials, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const user = await auth.signInWithEmailAndPassword(email, password);
      console.log(user);
      setLoginError(null);
      setLoginSuccessMessage("Signed in Successfully");
    } catch (err) {
      console.error(err);
      setLoginError(err.message);
      setLoginSuccessMessage(null);
    }
  };

  return (
    <div id="log-in" className="container pt-3">
      <div className="row text-center">
        <div className="login-left col-sm-12 col-md-6">
          <h3 className="pb-2 text-lg-middle"> Log In</h3>
          <div className="alert-box pt-2 pb-2 px-1 text-lg-middle">
            {loginError && (
              <div className="alert alert-danger">{loginError}</div>
            )}
            {loginSuccessMessage && (
              <div className="alert alert-success">{loginSuccessMessage}</div>
            )}
          </div>

          <form className="py-2 px-5 text-md-middle" onSubmit={handleSubmit}>
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

            <button className="btn btn-primary px-3" type="submit">
              Submit
            </button>
            <div>
              Create an account? <Link to="/signup">Sign Up</Link>
            </div>
          </form>
        </div>
        <div className="login-right col-sm-12 col-md-6 pt-2">
          <LoginSVG />
        </div>
      </div>
    </div>
  );
};

export default Login;
