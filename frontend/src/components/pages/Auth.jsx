import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import styles from "./auth.module.css";
import logo from "../../assets/Shubh logo.png"; // Shubh logo import

function Auth() {
  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate();

  return (
    <div className={styles.container}>

      {/* LEFT SIDE */}
      <div className={styles.left}>
        
        {/* Divine Aura / Background */}
        <div className={styles.aura}></div>

        {/* Shubh Logo */}
        <div className={styles.logo}>
          <img src={logo} alt="Shubh Logo" className={styles.leftLogo} />
        </div>

        {/* Heading */}
        <h1 className={styles.leftHeading}>ShubhDeep Mart</h1>

        {/* Sanskrit Mantra */}
        <div className={styles.mantra}>
          ॐ सर्वे भवन्तु सुखिनः, सर्वे सन्तु निरामयाः 🪔
        </div>

        {/* Welcome Text */}
        <p>
          Welcome to ShubhDeepMart – your spiritual shopping destination for authentic Hindu ritual products.
        </p>

        {/* Back Button */}
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          ← Back
        </button>

      </div>

      {/* RIGHT SIDE */}
      <div className={styles.right}>

        {/* Tabs */}
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

        {/* Form Area */}
        <div className={styles.formArea}>
          {activeTab === "login" && <Login />}
          {activeTab === "signup" && <Signup setActiveTab={setActiveTab} />}
        </div>

      </div>

    </div>
  );
}

export default Auth;