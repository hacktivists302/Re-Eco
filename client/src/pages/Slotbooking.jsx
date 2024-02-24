import React, { useEffect } from "react";
import "../styles/slotbooking.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLessThan, faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const Slotbooking = () => {
  const navigate = useNavigate();
  const [slotForm, setSlotForm] = useState({
    email: "",
    address: "",
    pin: "",
    contact: "",
    date: "Date Selected",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSlotForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    console.log("hello from button")
    e.preventDefault();
    try {
      const slotData={
        email:slotForm.email,
        address:slotForm.address,
        pin:slotForm.pin,
        contact:slotForm.contact,
        date:slotForm.date,
      }
      console.log(slotData.email);

      axios.post("http://localhost:4000/user/slotbooking",slotData).then((res)=>{
        console.log(res.status,res.data);
        const data =res.data;
        console.log("in axios")

        if (data.status === 400 || !data) {
          window.alert("User not Registered");
        } else {
          window.alert("Slot Booking Successful");
          navigate(`/user/notifications`)
        }
      })
    } catch (err) {
      console.log(err);
    }
  };

  const [daysTag, setDaysTag] = useState(null);
  const [currentDate, setCurrentDate] = useState(null);
  const [prevNextIcon, setPrevNextIcon] = useState(null);

  useEffect(() => {
    let daysTag = document.querySelector(".days"),
      currentDate = document.querySelector(".current-date"),
      prevNextIcon = document.querySelectorAll(".icons div");
    setDaysTag(daysTag);
    setCurrentDate(currentDate);
    setPrevNextIcon(prevNextIcon);
  }, []);

  const datePicked = (day, currentMonth, currentYear) => {
    const dayPicked = document.querySelector(`.js-day${day}`);
    const dateSelected = document.querySelector(".js-show-date");

    const date = new Date();
    const currentDate = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const slotPicked =
      dayPicked.innerHTML + "-" + (currentMonth + 1) + "-" + currentYear;

    if (
      (dayPicked.innerHTML < currentDate &&
        currentMonth <= month &&
        currentYear <= year) ||
      currentMonth < month ||
      currentYear < year
    ) {
      if (dateSelected.value !== "Date Selected") {
        dateSelected.value = "Date Selected";
      }

      alert(`Picked Wrong Date!`);
    } else {
      setSlotForm((prev) => {
        return {
          ...prev,
          date: slotPicked,
        }
      })
    }
  };

  const confirm = (e) => {
    e.preventDefault();
    const dateSelected = document.querySelector(".js-show-date").value;
    const name = document.querySelector(".js-name").value;
    const address = document.querySelector(".js-address").value;
    const pin = document.querySelector(".js-pin").value;
    const contact = document.querySelector(".js-contact").value;

    if (
      !name ||
      !address ||
      !pin ||
      !contact ||
      dateSelected === "Date Selected"
    ) {
      alert(`Kindly fill the details correctly first!`);
    } else {

    }
  };

  let date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
      lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
      lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
      lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) {
      liTag += `<li class="inactive"><div class="last-month">${
        lastDateofLastMonth - i + 1
      }</div></li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
      let isToday =
        i === date.getDate() &&
        currMonth === new Date().getMonth() &&
        currYear === new Date().getFullYear()
          ? "active"
          : "";
      liTag += `<li class="${isToday}"><div class="this-month js-day${i}">${i}</div></li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) {
      liTag += `<li class="inactive"><div class="next-month">${
        i - lastDayofMonth + 1
      }</div></li>`;
    }
    if (currentDate && daysTag) {
      currentDate.innerText = `${months[currMonth]} ${currYear}`;
      daysTag.innerHTML = liTag;
    }
  };

  if (prevNextIcon) {
    prevNextIcon.forEach((icon) => {
      icon.addEventListener("click", () => {
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if (currMonth < 0 || currMonth > 11) {
          date = new Date(currYear, currMonth);
          currYear = date.getFullYear();
          currMonth = date.getMonth();
        } else {
          date = new Date();
        }
        renderCalendar();
        clickEvent();
        console.log(dateHeader);
      });
    });
  }

  const dateHeader = document.querySelector(".current-date");

  const clickEvent = () => {
    if (dateHeader) {
      let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();

      const divisionIndex = dateHeader.innerText.search(" ");

      const selectedMonth = dateHeader.innerText.substring(0, divisionIndex);

      const selectedYear = dateHeader.innerText.substring(divisionIndex + 1);

      for (let i = 1; i <= lastDateofMonth; i++) {
        const day = document.querySelector(`.js-day${i}`);

        day.addEventListener("click", () => {
          datePicked(
            day.innerText,
            months.indexOf(selectedMonth),
            selectedYear
          );
        });
      }
    }
  };

  return (
    <>
      <div className="slotbooking-wrapper">
        <form className="steps-container" action="/user/slotbooking" method="post">
          <div className="container-1">
            <div action="" className="form-container">
              <div className="step-1">
                <p className="text">Step 1: User Information</p>
              </div>
              <div className="input-field-container">
                <label for="email" className="block">
                  Email:
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  className="slot-input-field js-name"
                  required
                  onChange={handleChange}
                  value={slotForm.name}
                />
              </div>
              <div className="input-field-container">
                <label for="address" className="block">
                  Address:
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="slot-input-field js-address"
                  required
                  onChange={handleChange}
                  value={slotForm.address}
                />
              </div>
              <div className="input-field-container">
                <label for="pin" className="block">
                  PIN:
                </label>
                <input
                  type="text"
                  id="pin"
                  name="pin"
                  className="slot-input-field js-pin"
                  required
                  onChange={handleChange}
                  value={slotForm.pin}
                />
              </div>
              <div className="input-field-container">
                <label for="contact" className="block">
                  Contact Number:
                </label>
                <input
                  type="tel"
                  id="contact"
                  name="contact"
                  className="slot-input-field js-contact"
                  pattern="[0-9]{10}"
                  required
                  onChange={handleChange}
                  value={slotForm.contact}
                />
              </div>
            </div>
          </div>

          <div className="container-2">
            <div className="step-2">
              <p className="text">Step 2: Date Selection</p>
            </div>

            <div className="calender-details">
              <div className="header">
                <h2 className="current-date">
                  {(renderCalendar(), clickEvent())}
                </h2>
                <div className="icons">
                  <div id="prev">
                    <FontAwesomeIcon icon={faLessThan} />
                  </div>
                  <div id="next">
                    <FontAwesomeIcon icon={faGreaterThan} />
                  </div>
                </div>
              </div>
              <div className="calendar">
                <ul className="weeks">
                  <li>Sun</li>
                  <li>Mon</li>
                  <li>Tue</li>
                  <li>Wed</li>
                  <li>Thu</li>
                  <li>Fri</li>
                  <li>Sat</li>
                </ul>
                <ul className="days"></ul>
              </div>
            </div>
          </div>

          <div className="final-step">
            <input
              className="show-date js-show-date"
              name="date"
              value={slotForm.date}
            />

            <div className="button-container">
              <input
                type="submit"
                className="confirm-button"
                value="Confirm"
                onClick={handleSubmit}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Slotbooking;
