const Router = require("express");
const router = Router();
const {
  pickPartner,
  userSlot,
  userReward,
  user,
  usernotification,
} = require("../db/mongodb");

//-----Pickup Partner signin routess-----//
router.post("/", async (req, res) => {
  const { loginid, password } = req.body;
  try {
    const exsistingUser = await pickPartner.findOne({ loginid: loginid });
    if (!exsistingUser) {
      res.status(404).json({ msg: "partner not found" });
    }
    const matchPassword = exsistingUser.password === password;
    if (!matchPassword) {
      res.status(400).json({ msg: "Invalid credentials" });
    }

    res.json({
      msg: "Hey partner",
    });
  } catch (error) {
    console.log(error);
  }
});

async function matchToken(token) {
  const matchObject = await userSlot.findOne({ token });
  return matchObject.email;
}

//random reward object
const randomGenReward = async () => {
  const rewards = await userReward.find();
  let randomNumber = Math.floor(Math.random() * 4) + 1;
  return rewards[randomNumber];
};

//-----Giving order details to pick up partner-----//
router.post("/pickdetails", async (req, res) => {
  const { email, pin, token, quantity, tier } = req.body;
  try {
  const tokenemail =await matchToken(token); //email output
    // const matchObject = await userSlot.findOne({ token:token });

    if (tokenemail === email) {
      const newreward = await randomGenReward(); //object of random reward

      await user.updateOne(
        {
          email: email,
        },
        {
          $push: {
            userReward: newreward._id,
          },
        }
      );

      const notification = await usernotification.create({
        notificationMessage: `${newreward.content} from ${newreward.sub}`,
      });

      await user.updateOne(
        {
          email: email,
        },
        {
          $push: {
            userNotification: notification._id,
          },
        }
      );

      res.json({
        //push rewards in user schema and notifications tab
        msg: "Pickup Successful",
      });
    } else {
      res.json({
        msg: "Wrong details",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
