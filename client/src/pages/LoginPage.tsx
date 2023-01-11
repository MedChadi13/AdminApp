import React, { useState } from "react";
import httpClient from "../httpClient";
import './login.modele.css'
import avatar from "./avatar.png"

import { Formik } from "formik";
import * as EmailValidator from "email-validator"; // used when validating with a self-implemented approach
import * as Yup from "yup"; // used when validating with a pre-built solution

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const logInUser = async () => {
    console.log(email, password);

    try {
      const resp = await httpClient.post("//localhost:5000/login", {
        email,
        password,
      });

      window.location.href = "/";
    } catch (error: any) {
      if (error.response.status === 401) {
        alert("Invalid credentials");
      }
    }
  };

  return (
    <div className='bot1' >
      <div className="login">
      <div className="avatar">
        <img src={avatar} />
      </div>
      <h2>Login</h2>
      <h3>Welcome back Admin</h3>

      <form className="login-form">
        <div className="textbox">
        <label>Email: </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id=""
          />
          <span className="material-symbols-outlined"> E-mail </span>
        </div>
        <div className="textbox">
        <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id=""
          />
          <span className="material-symbols-outlined"> Mot de passe </span>
        </div>
        <button type="button" onClick={() => logInUser()}>LOGIN</button>
        <a href="https://website.com">Forgot your credentials?</a>
      </form>
    </div>
    </div>
  );
};

export default LoginPage;
