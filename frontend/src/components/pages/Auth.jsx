import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import styles from "./auth.module.css";

function Auth() {

  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate();

  return (
    <div className={styles.container}>

      <div className={styles.left}>
        <h1>Welcome to Shubh E-commerce</h1>
        <p>Your trusted online shopping platform</p>

        <button onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>

      <div className={styles.right}>

        <div className={styles.tabs}>
          <button
            className={activeTab === "login" ? styles.active : ""}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>

          <button
            className={activeTab === "signup" ? styles.active : ""}
            onClick={() => setActiveTab("signup")}
          >
            Signup
          </button>
        </div>

        <div className={styles.formArea}>
          {activeTab === "login" && <Login />}
          {activeTab === "signup" && <Signup />}
        </div>

      </div>

    </div>
  );
}

export default Auth;