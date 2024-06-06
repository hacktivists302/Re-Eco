import React, { useEffect, useState } from "react";
import "../styles/my-rewards.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Url } from "../config";

const UserReward = (props) => {
  return (
    <div className="rewards-card">
      <div className="rewards-sub">{props.sub}</div>
      <div className="rewards-content">{props.content}</div>
    </div>
  );
};

const MyRewards = () => {
  const navigate=useNavigate();
  const [rewardData, setRewardData] = useState([]);
  const [error, setError] = useState(null);

  const showMyRewards = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/signin")
        throw new Error("user does not exsist");
      }

      const response = await axios.get(`${Url}/user/rewards`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const reward = response.data.rewards;
      setRewardData(reward);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching rewards:", error);
    }
  };

  useEffect(() => {
    showMyRewards();
  }, []);

  return (
    <div className="rewards-container">
      {error && <div className="error-message">{error}</div>}
      <div className="render-rewards">
        {rewardData.map((reward) => (
          <UserReward
            key={reward.rewardNumber}
            sub={reward.sub}
            content={reward.content}
          />
        ))}
      </div>
    </div>
  );
};

export default MyRewards;
