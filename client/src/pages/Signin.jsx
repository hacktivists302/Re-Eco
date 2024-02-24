import React from "react";
import "../styles/signin.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

const handleChange = (e) => {
const value=e.target.value;
    setForm({
        ...form,
        [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    // console.log("before try catch")
    e.preventDefault();

    // console.log("IN try catch")

      const userData={
        email:form.email,
        password:form.password
      }
    console.log("BEFORE AXIOS")

      axios.post("http://localhost:4000/user/signin",userData,{
        headers: {
          "Content-type": "application/json",
        },
        
      }).then((res)=>{
        console.log("new");
        console.log(res.status,res.data);
        const data =res;
        console.log(typeof data);
        // console.log("in axios")

        if ( !data) {
          window.alert("User Does not Exist");
        } else {
          navigate("/user/slotbooking");
        }
      })
    .catch((err) => {
      window.alert("User Does not Exist");
      // console.log("new2");
      console.error(err);
    });
  };

  return (
    <>
      <div className="signin-wrapper">
        <div className="login-form">
          <form
            action="/signin"
            method="post"
            className="login-container"
            id="login"
          >
            <div className="top">
              <span>
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </span>
              <div className="login-header">Sign In</div>
            </div>
            <div className="input-box">
              <input
                type="email"
                id="email"
                name="email"
                className="input-field"
                placeholder="Email"
                required
                onChange={handleChange}
                value={form.email}
              />
              <i className="bx bx-user"></i>
            </div>
            <div className="input-box">
              <input
                type="password"
                name="password"
                className="input-field"
                placeholder="Password"
                required
                onChange={handleChange}
                value={form.password}
              />
              <i className="bx bx-lock-alt"></i>
            </div>
            <div className="si-two-col">
              <div className="one">
                <input type="checkbox" id="login-check" required />
                <label for="login-check"> Remember Me</label>
              </div>
              <div className="two">
                <label>
                  <Link to="">Forgot password?</Link>
                </label>
              </div>
            </div>
            <div className="input-box" id="sign-in-button">
              <input
                type="submit"
                className="submit"
                value="Sign In"
                onClick={handleSubmit}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signin;
