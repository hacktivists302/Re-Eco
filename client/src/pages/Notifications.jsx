import "../styles/notifications.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDot } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import axios from "axios";

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
  //--------sample email--------//

  useEffect(() => {
   
    axios.get("http://localhost:4000/user/notifications", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
    
        setNotifications(res.data.notifications);
      });
  }, []);

  return (
    <>
      <div className="user-notifications-container">
        <div className="clear-notif-container">
          <button>Clear All</button>
        </div>
        {notifications
          .map((notification) => {
            console.log(notification);
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
