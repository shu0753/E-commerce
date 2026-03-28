import React, { useState } from "react";
import styles from "./signup.module.css";

function Signup({ setActiveTab }) { // ✅ Receive setActiveTab from Auth

  const [signupData, setSignupData] = useState({
    email: "",
    firstname: "",
    lastname: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  // Handle input changes
  function handleOnchange(e) {
    const { name, value } = e.target;
    setSignupData(prev => ({ ...prev, [name]: value }));
  }

  // Submit Registration
  async function submitRegister(e) {
    e.preventDefault();

    // Validation
    if (
      !signupData.email ||
      !signupData.firstname ||
      !signupData.lastname ||
      !signupData.phone ||
      !signupData.password ||
      !signupData.confirmPassword
    ) {
      alert("All fields are required!");
      return;
    }

    if (signupData.password !== signupData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: signupData.email,
          firstName: signupData.firstname,
          lastName: signupData.lastname,
          phoneNO: signupData.phone,
          password: signupData.password,
          confirmPassword: signupData.confirmPassword
        })
      });

      const data = await res.json();
      console.log("Register Response:", data);

      if (data.success) {
        alert("Registration Successful ✅");

        // Reset form
        setSignupData({
          email: "",
          firstname: "",
          lastname: "",
          phone: "",
          password: "",
          confirmPassword: ""
        });

        // ✅ Switch to login tab
        if (setActiveTab) setActiveTab("login");

      } else {
        alert(data.message || "Registration Failed");
      }

    } catch (error) {
      console.error("Register Error:", error);
      alert("Registration Failed!");
    }
  }

  return (
    <form className={styles.form} onSubmit={submitRegister}>
      <h1 className={styles.title}>Signup</h1>

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={signupData.email}
        onChange={handleOnchange}
        required
      />

      <div className={styles.row}>
        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          value={signupData.firstname}
          onChange={handleOnchange}
          required
        />
        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          value={signupData.lastname}
          onChange={handleOnchange}
          required
        />
      </div>

      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={signupData.phone}
        onChange={handleOnchange}
        required
      />

      <div className={styles.row}>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={signupData.password}
          onChange={handleOnchange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={signupData.confirmPassword}
          onChange={handleOnchange}
          required
        />
      </div>

      <button type="submit">Signup</button>
    </form>
  );
}

export default Signup;