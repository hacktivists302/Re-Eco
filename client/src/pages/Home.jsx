import React from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  return (
    <>
      <div class="recycle-page-content">
        <header class="header-recycle">
          <div class="header-text">
            Getting Rewarded for Recycling has never been so easy
          </div>
        </header>

        <div class="roadmap">
          <div class="step">
            <div class="step-num">Step 1</div>

            <div class="step-text">Simply Signup to Eco Perks</div>
          </div>

          <div class="step">
            <div class="step-num">Step 2</div>

            <div class="step-text">Book your Slot to Schdule a pickup</div>
          </div>

          <div class="step">
            <div class="step-num">Step 3</div>

            <div class="step-text">
              Our Ecopartners will door pickup your waste
            </div>
          </div>

          <div class="step">
            <div class="step-num">Step 4</div>

            <div class="step-text">Get Instant Rewards on Succesful Pickup</div>
          </div>
        </div>

        <div class="book-slot">
          <a href="/slotbooking">
            <button class="book-slot-button">
              <Link to="/user/slotbooking">Book A Slot</Link>
            </button>
          </a>
        </div>

        <div class="explore-more">
          <div class="explore-more-text">Explore More</div>

          <div class="explore-arrow">
            <FontAwesomeIcon icon={faArrowDown} />
          </div>
        </div>

        <div class="recycle-text-container">
          <div class="recycle-text">
            Recycling through our website is designed with your convenience in
            mind. We understand that traditional recycling methods can be
            time-consuming and cumbersome, which is why we've streamlined the
            process to make it as easy as possible for you.
          </div>
          <div class="recycle-text">
            Recycling should be easy and hassle-free, and that's exactly what we
            offer at EcoPerks. We understand that your time is valuable, and
            that's why we've designed our platform to be incredibly
            time-efficient.
          </div>
          <div class="recycle-text">
            At EcoPerks, we believe that your commitment to recycling should be
            instantly recognized and rewarded. That's why we offer you immediate
            gratification.
          </div>
          <div class="recycle-text">
            At EcoPerks, we believe in complete transparency when it comes to
            our recycling process. We want you to have confidence that your
            recycling efforts are making a genuine difference for the
            environment.
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
