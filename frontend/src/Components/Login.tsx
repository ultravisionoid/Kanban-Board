import React, { ChangeEvent, HTMLInputTypeAttribute, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  Navigate,
} from "react-router-dom";
function Login({ onlogin }: any) {
  let [credentials, setCredetials] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // const { name, value }= e.target as HTMLInputElement;
    const { name, value } = e.target;

    setCredetials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(credentials);
  };
  return (
    <div className="login-container">
      <h2>Login page</h2>
      <form onSubmit={handleSubmit}>
        <div className="login-form-group">
          <label>Email:</label>
          <input
            className="form-control"
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="login-form-group">
          <label>Password:</label>
          <input
            className="form-control"
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn">
          Login
        </button>
      </form>

      <Link to="/">Home</Link>
      <Link to="login">Login</Link>
    </div>
  );
}

export default Login;
