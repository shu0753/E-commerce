import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../../assets/Shubh logo.png";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">
          <img src={logo} alt="Shubh Logo" />
        </Link>
      </div>
      <div className={styles.search}>
        <input type="text" placeholder="Search products..." />
        <button>Search</button>
      </div>
      <div className={styles.links}>
        <Link className={styles.link} to="/">Dashboard</Link>
        <Link className={styles.link} to="/products">Products</Link>
        <Link className={styles.link} to="/cart">Cart 🛒</Link>
        <Link className={styles.link} to="/about">About</Link>
        <Link className={styles.link} to="/auth">Login</Link>
      </div>

    </nav>
  );
}

export default Navbar;