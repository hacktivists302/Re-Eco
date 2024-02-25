import React from "react";
import pic1 from "../images/E-Waste.webp";
import pic2 from "../images/Metal.webp";
import pic3 from "../images/Paper.webp";
import pic4 from "../images/Plastics_100x127-pix-e1652794748191.webp";

const Accept = () => {
  return (
    <>
      <h1 className="Accept_heading">What We Accept</h1>
      <div className="pictures">
        <ul className="pictures-logo">
          <li className="image">
            <img src={pic1} />
          </li>
          <li className="image">
            <img src={pic2} />
          </li>
          <li className="image">
            <img src={pic3} />
          </li>
          <li className="image">
            <img src={pic4} />
          </li>
        </ul>
      </div>
    </>
  );
};

export default Accept;
