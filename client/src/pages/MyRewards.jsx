import React, { useEffect } from "react";
import "../styles/my-rewards.css";
import { useState } from "react";
import axios from "axios";

const UserReward = (props) => {
  return (
    <>
      <div className="rewards-card">
        <div className="rewards-sub">{props.sub}</div>
        <div className="rewards-content">{props.content}</div>
      </div>
    </>
  );
};

const MyRewards = () => {
  const [rewardData, setRewardData] = useState([]);
  //--------sample email--------//
  const email="das206053@gmail.com";

  const showMyRewards = async () => {
    let API = [
      `http://localhost:4000/user/rewards/${email}`,
    ];
  
  Promise.all(
    API.map(async (api) => {
      const res = await axios.get(api);
      setRewardData(res.data.rewards)
      console.log(res.data.rewards);//array of aobject
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
    showMyRewards();
  }, []);

  return (
    <>
      <div className="rewards-container">
        <div className="render-rewards">
          {rewardData.map((reward) => {
            console.log(reward);
            return (
              <UserReward
                key={reward.rewardNumber}
                sub={reward.sub}
                content={reward.content}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MyRewards;
