import React from "react";
import { useState, useEffect } from "react";
import rewards from "./OurRewards";

const Reward = (props) => {
  return (
    <>
      <div className="card">
        <div className="sub">{props.sub}</div>
        <div className="content">{props.content}</div>
      </div>
    </>
  );
};

const Rewards = () => {
  const [stackArea, setStackArea] = useState(null);

  useEffect(() => {
    let stackArea = document.querySelector(".stack-area");
    setStackArea(stackArea);
  }, []);

  let cards = document.querySelectorAll(".card");

  function rotateCards() {
    let angle = 0;
    cards.forEach((card) => {
      if (card.classList.contains("active")) {
        card.style.transform = `translate(-50%, -120vh) rotate(-48deg)`;
      } else {
        card.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
        angle = angle - 10;
      }
    });
  }

  rotateCards();

  window.addEventListener("scroll", () => {
    if (stackArea) {
      let proportion =
        stackArea.getBoundingClientRect().top / window.innerHeight;
      if (proportion <= 0) {
        let n = cards.length;
        let index = Math.ceil((proportion * n) / 2);
        index = Math.abs(index) - 1;
        for (let i = 0; i < n; i++) {
          if (i <= index) {
            cards[i].classList.add("active");
          } else {
            cards[i].classList.remove("active");
          }
        }
        rotateCards();
      }
    }
  });

  return (
    <>
      <div className="reward-content" id="rewards-section">
        <section className="center">
          <div className="stack-area">
            <div className="left">
              <div className="title">Our Rewards Overhaul</div>
              <div className="sub-title">
                Instant rewards at your fingertips!
                <br />
                <button>See More Details</button>
              </div>
            </div>
            <div className="right">
              {rewards.map((reward) => {
                return (
                  <Reward
                    key={reward.id}
                    sub={reward.sub}
                    content={reward.content}
                  />
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Rewards;
