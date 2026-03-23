import React, { useState } from 'react'
import styles from './login.module.css'

function Login() {

  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  });
  const handleOnchange = (e) => {
    const { name, value } = e.target;

    setLoginData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(loginData);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Login</h1>

        <label>Username</label>
        <input
          type="text"
          name="username"
          value={loginData.username}
          onChange={handleOnchange}
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={loginData.password}
          onChange={handleOnchange}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;