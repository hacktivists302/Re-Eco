import React from "react";
import "../styles/pickup-signin.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

const PickupSignin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    loginid: "",
    password: "",
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

  const PickupData = async (e) => {
    e.preventDefault();

    // console.log("IN try catch")

      const userData={
        loginid:form.loginid,
        password:form.password
      }
    console.log("BEFORE AXIOS")

      axios.post("http://localhost:4000/picksignin",userData,{
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
          navigate("/pickup");
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
      <div className="whole-body">
        <div class="pick-sign-wrapper">
          <form action="/picksignin" method="post" class="pick-sign-login-form">
            <label for="login-id">Login ID: </label>
            <input
              type="text"
              name="loginid"
              id="login-id"
              class="pick-sign-input-field"
              onChange={handleChange}
              value={form.loginid}
            />

            <label for="password-field">Password: </label>
            <input
              type="password"
              name="password"
              id="password-field"
              class="pick-sign-input-field"
              onChange={handleChange}
              value={form.password}
            />
            <div class="note">
              *Note: This web application is exclusively authorised for use by
              Eco Perks authorised personal.
            </div>

            <div class="pick-button-container">
              <button class="pick-sign-in-button" onClick={PickupData}>Sign In</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PickupSignin;
