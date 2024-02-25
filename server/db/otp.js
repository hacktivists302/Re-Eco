const mongoose = require("mongoose");
require("dotenv").config();

const { userSlot } = require("./mongodb");
const { pickPartner } = require("./mongodb");

    function generateOTP() {
    const OTP_EXPIRY = 5 * 60 * 1000;
    const characters = "0123456789";
    const charactersLength = characters.length;
    let length = 6;
    let OTP = "";
    for (let i = 0; i < length; i++) {
        OTP += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    const OTP_EXPIRES = Date.now() + OTP_EXPIRY;
    this.otp = OTP;
    this.otpExpires = OTP_EXPIRES;
    return OTP, OTP_EXPIRES;
};


 
