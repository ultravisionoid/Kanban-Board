import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  Navigate,
} from "react-router-dom";
import { User } from "../interface/User";
import { useEffect, useState } from "react";
function Header({ onlogout }: any) {
  const [token, settoken] = useState<string>("");
  useEffect(() => {
    const handleHeader = () => {
      const sT = localStorage.getItem("token");
      if (sT) {
        settoken(sT);
      }
    };
    handleHeader();
    window.addEventListener("storage", handleHeader);
    return () => {
      window.removeEventListener("storage", handleHeader);
    };
  }, []);
  const handleLogout = async () => {
    console.log("Logout");
    localStorage.clear();
    onlogout();
  };

  return (
    <div>
      Header
      {/* <Router> */}
      <Link to="/">Home</Link>
      {!token && <Link to="login">Login</Link>}
      {!!token && (
        <Link to="/" onClick={handleLogout}>
          Logout
        </Link>
      )}
      {/* </Router> */}
    </div>
  );
}

export default Header;
