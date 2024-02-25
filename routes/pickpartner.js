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
      console.log("partner not found");
      res.status(404).json({ msg: "partner not found" });
    }
    const matchPassword = exsistingUser.password === password;
    if (!matchPassword) {
      console.log("Invalid credentials");
      res.status(400).json({ msg: "Invalid credentials" });
    }

    console.log("Hello partner");
    res.json({
      msg: "Hey partner",
    });
  } catch (error) {
    console.log(error);
  }
});

async function matchToken(token) {
  console.log("hello from match token")
  console.log(token);
  const matchObject = await userSlot.findOne({ token });
  console.log("match", matchObject); 
  return matchObject.email;
}

//random reward object
const randomGenReward = async () => {
  const rewards = await userReward.find();
  let randomNumber = Math.floor(Math.random() * 4) + 1;
  // console.log(rewards[randomNumber])
  return rewards[randomNumber];
};

//-----Giving order details to pick up partner-----//
router.post("/pickdetails", async (req, res) => {
  const { email, pin, token, quantity, tier } = req.body;
  console.log("hello world")
  console.log(email);
  try {
  const tokenemail =await matchToken(token); //email output
  console.log(tokenemail);
    // const matchObject = await userSlot.findOne({ token:token });

    // console.log(matchObject)
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
