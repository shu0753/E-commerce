import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";

function Login() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // basic validation
    if (!loginData.email || !loginData.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/signin/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      // check server response
      if (!res.ok) {
        throw new Error("Server error");
      }

      const data = await res.json();
      console.log("API Response:", data);

      if (data.success) {
        // store userId
        if (data.user?._id) {
          localStorage.setItem("userId", data.user._id);
          console.log("Stored userId:", data.user._id);
        } else {
          alert("User ID missing in response");
          return;
        }

        // redirect
        navigate("/products");
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Cannot connect to server. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Login</h1>

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={loginData.email}
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={loginData.password}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;