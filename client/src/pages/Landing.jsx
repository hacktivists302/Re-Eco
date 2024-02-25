import React from "react";
import Intro from "../components/Intro";
import Navbar from "../components/Navbar";
import Rewards from "../components/Rewards";
import Footer from "../components/Footer";
import Timeline from "../components/Timeline";
import "../styles/navbar.css";
import "../styles/landing-page.css";
import Tier from "../components/Tier";
import Accept from "../components/Accept";

const Landing = () => {
  return (
    <>
      <Navbar />
      <Intro />
      <Rewards />
      <Accept />
      <Timeline />
      <Tier />
      <Footer />
    </>
  );
};

export default Landing;
