import React from "react";
import "../styles/sidebar.css";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../images/logo/main_logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSquareCheck,
  faBell,
  faGift,
  faGear,
  faX,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

const showHideSidebar = () => {
  const sidebar = document.querySelector(".sidebar");
  const xIcon = document.querySelector(".x-icon");
  const hamburgerIcon = document.querySelector(".hamburger-icon");

  if (!sidebar || !xIcon || !hamburgerIcon) return;

  sidebar.classList.toggle("hide-sidebar");
  xIcon.classList.toggle("show-x-icon");
  hamburgerIcon.classList.toggle("show-hamburger-icon");
};

const Sidebar = () => {
  const [sideLink, setSideLink] = useState(null);
  const location = useLocation();

  let runOnce = false;
  window.addEventListener("resize", () => {
    if (window.innerWidth < 1000) {
      if (!runOnce) {
        runOnce = true;
        showHideSidebar();
        return;
      }
    }

    if (window.innerWidth >= 1000) {
      if (runOnce) {
        runOnce = false;
        showHideSidebar();
        return;
      }
    }
  });

  useEffect(() => {
    if (sideLink) {
      sideLink.classList.remove("active-link-part");
    }

    const url = location.pathname.split("/")[2];

    if (url === "myprofile") {
      setSideLink(document.querySelector(".MyProfile"));
    } else if (url === "slotbooking") {
      setSideLink(document.querySelector(".BookSlot"));
    } else if (url === "notifications") {
      setSideLink(document.querySelector(".Notifications"));
    } else if (url === "myrewards") {
      setSideLink(document.querySelector(".MyRewards"));
    }

    if (sideLink) {
      sideLink.classList.add("active-link-part");
      showHideSidebar();
    }
  });

  const changeActive = (e) => {
    const element = e.target.parentNode.parentNode;
    setSideLink((prev) => {
      if (prev) {
        prev.classList.remove("active-link-part");
        element.classList.add("active-link-part");
      } else {
        element.classList.add("active-link-part");
      }
      return element;
    });
  };

  return (
    <>
      <nav className="sidebar">
        <div className="sidebar-logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="main-links">
          <div className="sidebar-link MyProfile">
            <div className="font-icon">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <Link to="/user/myprofile">
              <div onClick={changeActive}>My Profile</div>
            </Link>
          </div>
          <div className="sidebar-link BookSlot">
            <div className="font-icon">
              <FontAwesomeIcon icon={faSquareCheck} />
            </div>
            <Link to="/user/slotbooking">
              <div onClick={changeActive}>Book Slot</div>
            </Link>
          </div>
          <div className="sidebar-link Notifications">
            <div className="font-icon">
              <FontAwesomeIcon icon={faBell} />
            </div>
            <Link to="/user/notifications">
              <div onClick={changeActive}>Notifications</div>
            </Link>
          </div>
          <div className="sidebar-link MyRewards">
            <div className="font-icon">
              <FontAwesomeIcon icon={faGift} />
            </div>
            <Link to="/user/myrewards">
              <div onClick={changeActive}>My Rewards</div>
            </Link>
          </div>
        </div>
        <div className="sidebar-link create-area">
          <div className="font-icon">
            <FontAwesomeIcon icon={faGear} />
          </div>
          <div>Settings</div>
        </div>
      </nav>
      <div
        className="hamburger-icon show-hamburger-icon"
        onClick={showHideSidebar}
      >
        <FontAwesomeIcon icon={faBars} />
      </div>
      <div className="x-icon" onClick={showHideSidebar}>
        <FontAwesomeIcon icon={faX} />
      </div>
      <Outlet />
    </>
  );
};

export default Sidebar;
