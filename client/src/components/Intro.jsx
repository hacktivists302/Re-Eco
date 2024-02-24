import React, { useState } from "react";
import "../styles/landing-page.css";

const Intro = () => {
  const [pin, setPin] = useState("");
  const [msgColor, setMsgColor] = useState({ color: "", msg: "" });

  const pinEnter = (e) => {
    setPin(e.target.value);
  };

  const checkPin = () => {
    if (pin > 700000 && pin < 700100) {
      setMsgColor({
        color: "green",
        msg: "Hurray! We are available in your area.",
      });
    } else {
      setMsgColor({ color: "red", msg: "Not Available" });
    }
  };

  return (
    <>
      <div className="intro-section" id="intro">
        <div className="msg-container">
          <div className="msg-1">
            Sell your recyclabels online with <span>ReEco!</span>
          </div>
          <div className="msg-2">
            Earn while care with ReEco the web app that turns your recycling
            efforts into rewards, making a greener world even more rewarding!
          </div>

          <div className="check-avail">
            <div>Check Availability!</div>

            <div className="pin-enter">
              <div>
                <input
                  className="pincode"
                  type="number"
                  placeholder="Enter Pin Code"
                  onChange={pinEnter}
                  value={pin}
                />
              </div>

              <div className="check-button">
                <button id="check" onClick={checkPin}>
                  Check
                </button>
              </div>
            </div>

            <div className="message-container">
              <span style={msgColor}>{msgColor.msg}</span>
            </div>
          </div>
        </div>
        <div className="images">
          <div className="img-1"></div>
          <div className="img-2"></div>
        </div>
        <div className="intro-side"></div>
        <div className="leaf-1"></div>
        <div className="leaf-2"></div>
        <div className="leaf-3"></div>
      </div>
    </>
  );
};

export default Intro;
