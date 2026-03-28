import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../../assets/Shubh logo.png";

function Navbar() {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("userId");

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/auth");
  };

  return (
    <nav className={styles.navbar}>
      {/* LOGO */}
      <div className={styles.logo}>
        <Link to="/">
          <img src={logo} alt="Shubh Logo" />
        </Link>
      </div>

      {/* SEARCH */}
      <div className={styles.search}>
        <input type="text" placeholder="Search products..." />
        <button>🔍</button>
      </div>

      {/* LINKS */}
      <div className={styles.links}>
        <Link className={styles.link} to="/">Dashboard</Link>
        <Link className={styles.link} to="/products">Products</Link>
        <Link className={styles.link} to="/cart">Cart 🛒</Link>
        <Link className={styles.link} to="/about">About</Link>

        {!isLoggedIn ? (
          <Link className={styles.link} to="/auth">Login</Link>
        ) : (
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;