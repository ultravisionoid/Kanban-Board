import { useEffect, useState } from "react";
import { User } from "./interface/User";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./Components/Header";
import Login from "./Components/Login";
import Footer from "./Components/Footer";
import NotFound from "./Components/NotFound";
import SignUp from "./Components/SignUp";

function App() {
  let [user, setUser] = useState<User | null>();
  const handleLogin = async function (userData: User) {
    await setUser(userData);
    console.log(userData);
    console.log("USER:", user);
    window.location.reload();
  };
  const handleLogoff = () => {
    setUser(null);
    window.location.reload();
  };
  useEffect(() => {
    // console.log(userData);
    console.log("USER:", user);
    try {
      let token = localStorage.getItem("token");
      let email = localStorage.getItem("email");
      let username = localStorage.getItem("username");
      let _id = localStorage.getItem("_id");
      if (token && email && username && _id) {
        let tempUser = {
          token,
          email,
          username,
          _id,
          password: "adsd",
        };
        if (!user) setUser(tempUser);
      } else {
        try {
          if (!localStorage.getItem("token")) {
            if (user?.token) localStorage.setItem("token", user?.token);
            if (user?.email) localStorage.setItem("email", user.email);
            if (user?.username) localStorage.setItem("username", user.username);
            if (user?._id) localStorage.setItem("_id", user._id);
            console.log("setting storage", user?.token, user?.username);
          }
        } catch (error) {
          console.log("Login failed, try again", error);
        }
      }
    } catch (e) {
      console.log(e);
    }

    // console.log(localStorage.getItem("token"));
  }, [user]);

  return (
    <>
      <h3>Kanban board {user?.username}</h3>

      <Router>
        <Header onlogout={handleLogoff}></Header>
        {/* <Link to="/">Home</Link>
        <Link to="login">Login</Link> */}
        <Routes>
          <Route path="/" element={<div>Home Page</div>}></Route>
          {!user?.username && (
            <Route
              path="/login"
              element={<Login onlogin={handleLogin}></Login>}
            ></Route>
          )}
          <Route path="signup" element={<SignUp />}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer></Footer>
      </Router>
    </>
  );
}

export default App;
