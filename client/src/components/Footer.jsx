import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="footer" id="contact-section">
        <div className="footer-container">
          <div className="row">
            <div className="footer-col">
              <h4>EcoPerks</h4>
              <ul>
                <li>
                  <a href="#">about us</a>
                </li>
                <li>
                  <a href="#">our services</a>
                </li>
                <li>
                  <a href="#">privacy policy</a>
                </li>
                <li>
                  <a href="#">contact US</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Contributers</h4>
              <ul>
                <li>
                  <a href="">Akshat Jaiswal</a>
                </li>
                <li>
                  <a href="">Swapnamoy Midya</a>
                </li>
                <li>
                  <a href="">Deepjyoti Das</a>
                </li>
                <li>
                  <a href="">Rahul Das</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>follow us</h4>
              <div className="social-links">
                <a href="#">
                  <div className="github"></div>
                </a>
                <a href="#">
                  <div className="twitter"></div>
                </a>
                <a href="#">
                  <div className="instagram"></div>
                </a>
                <a href="#">
                  <div className="linkedin"></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
