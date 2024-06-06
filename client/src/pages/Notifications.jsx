import "../styles/notifications.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDot } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserNotification = (props) => {
  return (
    <>
      <div className="recieved-notification">
        <FontAwesomeIcon icon={faCircleDot} />
        <div className="notification-msg">{props.notificationMessage}</div>
      </div>
    </>
  );
};

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const navigate=useNavigate();
 

  useEffect(() => {
    try {
      const token=localStorage.getItem("token")
      if(!token){
        navigate("/signin")
       
        throw new Error("user does not exsist");
      }
      
     
      axios.get("http://localhost:4000/user/notifications", {
          headers: {
            Authorization: "Bearer " +token,
          },
        })
        .then((res) => {
      
          setNotifications(res.data.notifications);
        });
    } catch (error) {
     
    }

  }, []);

  return (
    <>
      <div className="user-notifications-container">
        <div className="clear-notif-container">
          <button>Clear All</button>
        </div>
        {notifications
          .map((notification) => {
           
            return (
              <UserNotification
                key={notification.notificationNumber}
                notificationMessage={notification.notificationMessage}
              />
            );
          })
          .reverse()}
      </div>
    </>
  );
};

export default Notifications;
