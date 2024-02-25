import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLessThan, faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Timeline = () => {
  const [typeCustomer, setTypeCustomer] = useState("Seller");

  const showHideTimeline = () => {
    if (typeCustomer === "Seller") {
      setTypeCustomer("Buyer");
    } else {
      setTypeCustomer("Seller");
    }
    const timeline = document.querySelectorAll(".timeline");
    timeline.forEach((element) => {
      element.classList.toggle("hide-timeline");
    });
  };

  return (
    <>
      <div className="timeline-container" id="timeline">
        <div className="arrow-icon-container" onClick={showHideTimeline}>
          <FontAwesomeIcon icon={faLessThan} />
        </div>
        <div className="both-timeline-container">
          <div className="timeline-heading">
            <p>
              Timeline for <span>{typeCustomer}</span> Customer
            </p>
          </div>
          <div className="timeline">
            <ul>
              <li>
                <div className="timeline-content">
                  <h1>Step-1</h1>
                  <p>Simply Signup to ReEco</p>
                </div>
              </li>
              <li>
                <div className="timeline-content">
                  <h1>Step-2</h1>
                  <p>Book your Slot to Schdule a pickup</p>
                </div>
              </li>
              <li>
                <div className="timeline-content">
                  <h1>Step-3</h1>
                  <p>Our Ecopartners will door pickup your waste.</p>
                </div>
              </li>
              <li>
                <div className="timeline-content">
                  <h1>Step-4</h1>
                  <p>Get Instant Rewards on Succesful Pickup.</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="timeline hide-timeline">
            <ul>
              <li>
                <div className="timeline-content">
                  <h1>Step-1</h1>
                  <p>Register your buisness with ReEco</p>
                </div>
              </li>
              <li>
                <div className="timeline-content">
                  <h1>Step-2</h1>
                  <p>Tell us what kind of recycalables you need!</p>
                </div>
              </li>
              <li>
                <div className="timeline-content">
                  <h1>Step-3</h1>
                  <p>Get benifits of EPR points.</p>
                </div>
              </li>
              <li>
                <div className="timeline-content">
                  <h1>Step-4</h1>
                  <p>
                    Get ready to submerge into a healty innitiative a better
                    step for your company and your planet
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="arrow-icon-container" onClick={showHideTimeline}>
          <FontAwesomeIcon icon={faGreaterThan} />
        </div>
      </div>
    </>
  );
};

export default Timeline;
