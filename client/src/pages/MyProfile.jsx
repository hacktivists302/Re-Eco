import React from "react";
import { useState } from "react";
import "../styles/myprofile.css";

const MyProfile = () => {
  const [profileForm, setProfileForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    pincode: "",
    address1: "",
    address2: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfileForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <>
      <div className="MyProfile-form">
        <form className="MyProfile-container" id="MyProfile">
          <div className="top">
            <div className="MyProfile-header">My Profile</div>
          </div>
          <div className="profile-two-forms">
            <div className="profile-input-box">
              <i className="bx bx-user"></i>
              <input
                name="firstname"
                type="text"
                className="Input-field"
                placeholder="Firstname"
                required
                onChange={handleChange}
                value={profileForm.firstname}
              />
            </div>
            <div className="profile-input-box">
              <i className="bx bx-user"></i>
              <input
                name="lastname"
                type="text"
                className="Input-field"
                placeholder="Lastname"
                required
                onChange={handleChange}
                value={profileForm.lastname}
              />
            </div>
          </div>
          <div className="profile-input-box">
            <i className="bx bx-envelope"></i>
            <input
              name="email"
              type="text"
              className="profile-input-field"
              placeholder="Email"
              required
              onChange={handleChange}
              value={profileForm.email}
            />
          </div>
          <div className="profile-input-box">
            <i className="bx bxs-map-pin"></i>
            <input
              name="pincode"
              type="pincode"
              className="profile-input-field"
              placeholder="Pin code"
              required
              onChange={handleChange}
              value={profileForm.pincode}
            />
          </div>
          <div className="profile-input-box">
            <i className="bx bxs-map"></i>
            <input
              name="address1"
              type="address"
              className="profile-input-field"
              placeholder="Address line 1"
              required
              onChange={handleChange}
              value={profileForm.address1}
            />
          </div>
          <div className="profile-input-box">
            <i className="bx bxs-map"></i>
            <input
              name="address2"
              type="address"
              className="profile-input-field"
              placeholder="Address line 2"
              required
              onChange={handleChange}
              value={profileForm.address2}
            />
          </div>
          <div className="profile-input-button">
            <button type="button" className="EditButton">
              Confirm Edit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default MyProfile;
