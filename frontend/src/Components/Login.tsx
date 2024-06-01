import axios from "axios";
import React, { ChangeEvent, HTMLInputTypeAttribute, useState } from "react";
import { Route, Link, Routes, Navigate, useNavigate } from "react-router-dom";
import "../index.css";
function Login({ onlogin }: any) {
  let [credentials, setCredetials] = useState({
    email: "",
    password: "",
  });
  let [toggle, setToggle] = useState(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // const { name, value }= e.target as HTMLInputElement;
    const { name, value } = e.target;

    setCredetials({ ...credentials, [name]: value });
  };

  const navigate = useNavigate();
  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(credentials);

    axios
      .post("http://localhost:3000/user/login", credentials, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // console.log(response.data);
        setToggle(false);
        onlogin(response.data);
        navigate("/");
      })
      .catch((error) => {
        console.log("Error:", error.response.data);
        setToggle(true);
      });
  };
  return (
    <>
      {toggle && (
        <h4 className="alert alert-danger" role="alert">
          Wrong Password{" "}
          <button className="close" aria-hidden="true">
            &times;
          </button>
        </h4>
      )}
      <div className="login-container">
        <h2>Sign In </h2>
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
          <br />
          <button type="submit" className="btnl">
            Login
          </button>
        </form>

        <Link to="/signup">Sign up</Link>
        <br />
        <Link to="forgotPassword">Forgot Password</Link>
      </div>
    </>
  );
}

export default Login;
