import React from 'react';
import './login.css';

function LoginForm() {
  return (
    <section>
      <div className="container">
        <div className="form">
          <h2>Login Form</h2>
          <form>
            <div className="inputBox">
              <input type="text" placeholder="Username" />
            </div>
            <div className="inputBox">
              <input type="password" placeholder="Password" />
            </div>
            <div className="inputBox">
              <button type="submit" className="login-button">Login</button>
            </div>
            <p className="forget">Forget Password ? <button className="forget-button">Click Here</button></p>
            <p className="forget">Don't have an account ? <button className="signup-button">Sign up</button></p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default LoginForm;
