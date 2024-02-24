import React from "react";

const Tier = () => {
  return (
    <>
      <div className="main-tier" id="tier">
        <div className="tier-container">
          <div className="tier-card">
            <div className="tier-box">
              <div className="tier-content">
                <h2>01</h2>
                <h3> TIER 1</h3>
                <p>
                  Tier 1 is designed for small quantities of waste, typically
                  ranging from 1 to 5 kilograms. It's like the "lightweight"
                  option, ideal for everyday household waste, small clean-up
                  projects, or recycling tasks. Whether it's disposing of
                  packaging materials, food scraps, or small electronic devices,
                  Tier 1 is your eco-friendly companion for lighter waste needs.
                </p>
              </div>
            </div>
          </div>
          <div className="tier-card">
            <div className="tier-box">
              <div className="tier-content">
                <h2>02</h2>
                <h3> TIER 2</h3>
                <p>
                  Tier 2 accommodates waste that falls between 5 and 10
                  kilograms in weight. This tier is your go-to solution for
                  dealing with waste that's a bit bulkier and heavier. Think of
                  it as the "medium-duty" tier, suitable for disposing of items
                  like larger household appliances, gardening debris, or
                  moderate-sized renovation waste.
                </p>
              </div>
            </div>
          </div>
          <div className="tier-card">
            <div className="tier-box">
              <div className="tier-content">
                <h2>03</h2>
                <h3> TIER 3</h3>
                <p>
                  Tier 3 is the heavyweight category, designed to handle waste
                  exceeding 10 kilograms in weight.Making it perfect for
                  large-scale commercial or industrial waste management. Whether
                  you're tackling construction debris, industrial byproducts, or
                  substantial volumes of waste material, Tier 3 provides the
                  capacity and capability needed for responsible disposal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tier;
