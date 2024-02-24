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
  const email = "das206053@gmail.com";

  const showMyNotifications = async () => {
    let API = [`http://localhost:4000/user/notifications/${email}`];

    Promise.all(
      API.map(async (api) => {
        const res = await axios.get(api);
        setNotifications(res.data.notifications);
        console.log(res.data.notifications);

        // console.log(res.data.notifications);//array of aobject
      })
    ).catch((error) => {
      if (error.response) {
        // the request was made and the server responded with a status code
        console.log(error.response);
        console.log(error.response.status);
      } else if (error.request) {
        // the request was made but no response was received
        console.log("network error");
      } else {
        // something happened when setting up the request
        console.log(error.toJSON());
      }
    });
  };

  useEffect(() => {
    showMyNotifications();
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
