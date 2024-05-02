import { useState } from "react";
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

function App() {
  let [user, setUser] = useState<User>();
  const handleLogin = function (userData: User) {
    setUser(userData);
  };
  return (
    <>
      <h3>Kanban board</h3>

      <Router>
        <Header></Header>
        {/* <Link to="/">Home</Link>
        <Link to="login">Login</Link> */}
        <Routes>
          <Route path="/" element={<div>Home Page</div>}></Route>
          <Route
            path="/login"
            element={<Login onlogin={handleLogin}></Login>}
          ></Route>
        </Routes>
        <Footer></Footer>
      </Router>
    </>
  );
}

export default App;
