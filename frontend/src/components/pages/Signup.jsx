import React, { useState } from 'react';
import styles from './signup.module.css';

function Signup({ setMode }) {

  const [signupData, setSignupData] = useState({
    email: "",
    firstname: "",
    lastname: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  function handleOnchange(e) {
    const { name, value } = e.target;

    setSignupData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  async function submitRegister(e) {
    e.preventDefault();

    // ✅ validation
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
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: signupData.email,
          firstName: signupData.firstname,  // ✅ match backend
          lastName: signupData.lastname,    // ✅ match backend
          phoneNO: signupData.phone,        // ✅ match backend
          password: signupData.password,
          confirmPassword: signupData.confirmPassword
        })
      });

      const data = await res.json();
      console.log("Register Response:", data);

      if (data.success) {
        alert("Registration Successful ✅");

        // reset form
        setSignupData({
          email: "",
          firstname: "",
          lastname: "",
          phone: "",
          password: "",
          confirmPassword: ""
        });

        if (setMode) {
          setMode("signin");
        }
      } else {
        alert(data.message || "Registration Failed");
      }

    } catch (error) {
      console.error("Register Error:", error);
      alert("Registration Failed!");
    }
  }

  return (
    <div className={styles.container}>
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
    </div>
  );
}

export default Signup;