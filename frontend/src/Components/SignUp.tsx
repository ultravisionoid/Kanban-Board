import axios from "axios";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
function SignUp() {
  let [credentials, setCredetials] = useState({
    email: "",
    password: "",
    username: "",
  });
  const navi = useNavigate();
  function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(credentials);
    axios
      .post("http://localhost:3000/users", credentials, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        navi("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  let handleChange = (f: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = f.target;
    setCredetials({ ...credentials, [name]: value });
  };
  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            className="signup-form-group"
            value={credentials.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="signup-form-group">
          <label>Email:</label>
          <input
            type="email"
            className="signup-form-control"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="text"
            name="password"
            className="signup-form-group"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">SignUp</button>
      </form>
    </div>
  );
}

export default SignUp;
