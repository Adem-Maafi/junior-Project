import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ isAuthenticated, handleLogout, setView }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" onClick={() => setView("home")}>Car App</Link>
      </div>
      <div className="navbar-links">
        {isAuthenticated ? (
          <>
            <Link to="/" onClick={() => setView("home")}>Home</Link>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={() => setView("addCar")}>Add Car</button>
          </>
        ) : (
          <>
            <button onClick={() => setView("login")}>Login</button>
            <button onClick={() => setView("register")}>Register</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;