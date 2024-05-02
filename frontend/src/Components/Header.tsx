import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  Navigate,
} from "react-router-dom";
function Header() {
  return (
    <div>
      Header
      {/* <Router> */}
      <Link to="/">Home</Link>
      <Link to="login">Login</Link>
      {/* </Router> */}
    </div>
  );
}

export default Header;
