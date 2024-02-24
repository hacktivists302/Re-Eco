import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pickup.css";
import axios from "axios"


const Pickup = () => {
  const navigate = useNavigate();
  const [pickDet, setPickDet] = useState({
    email: "",
    pin: "",
    token: "",
    quantity: "",
    tier: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPickDet((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log("IN try catch")

      const userData={
        email:pickDet.email,
        pin:pickDet.pin,
        token:pickDet.token,
        quantity:pickDet.quantity,
        tier:pickDet.tier,
      }
    console.log("BEFORE AXIOS")

      axios.post("http://localhost:4000/picksignin/pickdetails",userData,{
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
          navigate("/pickup/signin");
        }
      }).catch((err) => {
        window.alert("User Does not Exist");
        // console.log("new2");
        console.error(err);
      });
  };

  return (
    <>
      <div className="whole-body">
        <div className="pickup-wrapper">
          <form action="/pickdetails" method="post" className="pick-login-form">
            <div className="form-element">
              <label for="customer-name">Customer Email :</label>
              <input
                type="text"
                name="email"
                id="customer-name"
                className="pickup-input-field"
                onChange={handleChange}
                value={pickDet.name}
              />
            </div>
            <div className="form-element">
              <label for="customer-pin">Pin Code :</label>
              <input
                name="pin"
                id="customer-pin"
                className="pickup-input-field"
                onChange={handleChange}
                value={pickDet.pin}
              />
            </div>
            <div className="form-element">
              <label for="customer-code">Token ID :</label>
              <input
                name="token"
                id="customer-code"
                className="pickup-input-field"
                onChange={handleChange}
                value={pickDet.token}
              />
            </div>
            <div className="form-element">
              <label for="weight-estimate">Estimated weight :</label>
              <input
                name="quantity"
                id="weight-estimate"
                className="pickup-input-field"
                onChange={handleChange}
                value={pickDet.quantity}
              />
            </div>
            <div className="form-element">
              <label for="tier-estimate">Estimated Tier :</label>
              <input
                name="tier"
                id="tier-estimate"
                className="pickup-input-field"
                onChange={handleChange}
                value={pickDet.tier}
              />
            </div>
            <div className="pick-button-container">
              <button className="pick-confirm-button" onClick={handleSubmit}>Confirm Pickup</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Pickup;
