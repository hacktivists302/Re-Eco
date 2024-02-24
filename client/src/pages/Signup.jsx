import React, { useState } from "react";
import "../styles/signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    password2: "",
  });

  
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async(e) => {
    console.log("before try catch")
    e.preventDefault();
    
     console.log("in try catch")

      const userData={
        firstname:form.firstname,
        lastname:form.lastname,
        email:form.email,
        password:form.password,
        password2:form.password2,
      }
       console.log("before axios")

      axios.post("http://localhost:4000/user/signup",userData,{
        headers: {
          "Content-type": "application/json",
        },
      }).then((res)=>{
        console.log(res.status,res.data);
        const data =res.data;
        console.log("in axios")

        if (data.status === 400 || !data) {
          window.alert("User Does not Exist");
        } else {
          navigate("/signin");
        }
      }).catch((err) => {
        window.alert("User Does not Exist");
        // console.log("new2");
        console.error(err);
      });
  };



  return (
    <>
      <div className="signup-wrapper">
        <div className="register-form">
          <form
            className="register-container"
            id="register"
          >
            <div className="top">
              <span>
                Have an account?
                <Link to="/signin">Sign In</Link>
              </span>
              <div className="register-header">Sign Up</div>
            </div>
            <div className="two-forms">
              <div className="input-box">
                <input
                  type="text"
                  name="firstname"
                  className="input-field"
                  placeholder="Firstname"
                  onChange={handleChange}
                  value={form.firstname}
                />
                <i className="bx bx-user"></i>
              </div>
              <div className="input-box">
                <input
                  type="text"
                  name="lastname"
                  className="input-field"
                  placeholder="Lastname"
                  onChange={handleChange}
                  value={form.lastname}
                />
                <i className="bx bx-user"></i>
              </div>
            </div>
            <div className="input-box">
              <input
                type="text"
                name="email"
                className="input-field"
                placeholder="Email"
                onChange={handleChange}
                value={form.email}
              />
              <i className="bx bx-envelope"></i>
            </div>
            <div className="input-box">
              <input
                type="password"
                name="password"
                className="input-field"
                placeholder="Password"
                onChange={handleChange}
                value={form.password}
              />
              <i className="bx bx-lock-alt"></i>
            </div>
            <div className="input-box">
              <input
                type="password"
                name="password2"
                className="input-field"
                placeholder="Confirm Password"
                onChange={handleChange}
                value={form.password2}
              />
              <i className="bx bx-lock-alt"></i>
            </div>
            <div className="input-box" id="sign-up-button">
              <input type="submit" className="submit" value="Sign Up" onClick={handleSubmit}/>
            </div>
            <div className="su-two-col">
              <div className="one">
                <input type="checkbox" id="register-check" required />
                <label for="register-check">
                  Agree to our Terms and Conditions
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
