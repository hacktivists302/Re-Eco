import React from "react";

const Timeline = () => {
  return (
    <>
      <div className="timeline-container" id="timeline">
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
      </div>
    </>
  );
};

export default Timeline;
