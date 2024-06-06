const { Router } = require("express");
const bcrypt = require("bcryptjs");
const router = Router();
const jwt = require("jsonwebtoken");

require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
const { auth } = require("../middleware/auth");
const {
  user,
  userSlot,
  userReward,
  usernotification,
} = require("../db/mongodb");
//---------Unique Token logic----------//
function generateSixDigitToken() {
  let token = "";
  for (let i = 0; i < 6; i++) {
    token = token + Math.floor(10 * Math.random());
  }
  return token;
}

function uniqueToken(extoken) {
  let token;
  do {
    token = generateSixDigitToken();
    if (extoken == token) {
      continue;
    } else {
      break;
    }
  } while (true);
  return token;
}

//---------Token logic----------//

function generateOTP() {
  const characters = "0123456789";
  const charactersLength = characters.length;
  let OTP = "";
  let length = 6;
  for (let i = 0; i < length; i++) {
    OTP += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  //this.otp = OTP;
  console.log(OTP);
  return OTP;
}

const mygeneratedOTP = generateOTP();

//handleerrors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };
};

router.post("/signup", async (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    //use zod for input validation
    const exsistingUser = await user.findOne({ email: email });

    if (exsistingUser) {
      return res.json({ message: "User already exsist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await user.create({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: hashedPassword,
    });
    const userId = newUser._id;
    const token = jwt.sign({ userId }, JWT_SECRET);

    res.status(200).json({ message: "New user created", token: token });
  } catch (error) {
    console.error("An error occurred:", error);
    next(error);
  }
});

router.post("/signin", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // console.log(email)
    const exsistingUser = await user.findOne({ email: email });
    if (!exsistingUser) {
      return res.status(404).json({ msg: "User not found" });
    }
    const matchPassword = await bcrypt.compare(
      password,
      exsistingUser.password
    );
    
    if (!matchPassword) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    const userId=exsistingUser._id;
    const token=jwt.sign({userId},JWT_SECRET);

    res.status(200).json({
      message: "Hello user",
      token:token
    });

  } catch (error) {
    console.error("An error occurred:", error);
    next(error);
  }
});
//get user profile
router.get("/profile",auth, async (req, res) => {
  const exsistingUser = await user.findOne({ _id:req.userId });
  const exsistingSlot = await userSlot.findOne({ email:exsistingUser.email  });

  console.log(exsistingUser);
  res.json({
    profileData: {
      firstname: exsistingUser.firstname,
      lastname: exsistingUser.lastname,
      email: exsistingUser.email,
      pin: exsistingSlot.pin,
      address: exsistingSlot.address,
    },
  });
});

//update user profile
router.put("/profile", auth, async (req, res) => {
  try {
    const exsistingUser = await user.findOne({ _id:req.userId });
  
    const exsistingSlot = await userSlot.findOne({ email: exsistingUser.email });

    if (exsistingUser) {
      exsistingUser.firstname = req.body.firstname || exsistingUser.firstname;
      exsistingUser.lastname = req.body.lastname || exsistingUser.lastname;
      exsistingUser.email = req.body.email || exsistingUser.email;
      if (req.body.pin || req.body.address) {
        exsistingSlot.pin = req.body.pin || exsistingSlot.pin;
        exsistingSlot.address = req.body.address || exsistingSlot.address;
      }
      const updateSLot = await exsistingSlot.save();
      const updateProfile = await exsistingUser.save();
      // console.log(updateProfile)
      res.json({
        firstname: updateProfile.firstname,
        lastname: updateProfile.lastname,
        email: updateProfile.email,
        pin: updateSLot.pin,
        address: updateSLot.address,
      });
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
});

//rewards routes
//--------when authentication we have to change the rewards routes-----//
router.get("/rewards", auth, async (req, res, next) => {
  try {
    const userId = req.userId;
    //finduser
    const exsistingUser = await user.findOne({_id:userId});
    if (!exsistingUser) {
      res.json({
        msg: "no rewards",
      });
    }
    const alluserRewards = exsistingUser.userReward;
    // console.log( alluserRewards)//array of object id
    const rewardPromises = alluserRewards.map(async function (reward) {
      const reward1 = await userReward.findOne({ _id: reward._id });
      return reward1;
    });

    const rewards = await Promise.all(rewardPromises);
    //  console.log(rew)

    res.json({
      rewards: rewards,
    });
  } catch (error) {
    console.error("An error occurred:", error);
    next(error);
  }
});

//slot booking
router.post("/slotbooking", auth, async (req, res, next) => {
  const { email, address, pin, contact, date } = req.body;
  const exsistingUsers = await userSlot.find({});
  const tokenArray=exsistingUsers.map((user)=>user.token);
  const newToken = uniqueToken(tokenArray.map((token)=>token));

  try {
    const slot = await userSlot.create({
      email: email,
      address: address,
      pin: pin,
      number: contact,
      date: date,
      token: newToken,
      otp: mygeneratedOTP,
    });
    
    await user.updateOne(
      {
        email: email,
      },
      {
        $push: {
          userSlot: slot._id,
        },
      }
    );
    const fulluser = await user.findOne({ email: email });
    console.log(fulluser)

    const notification = await usernotification.create({
      notificationMessage: `Hey ${fulluser.firstname} this is your 6-digit token,Kindly Share this ${newToken} with our Delivery Executive`,
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
    res.status(200).json({
      msg: "Slot is Booked",
    });
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(400).json({msg:"Something is wrong"})
  }
});

router.get("/notifications", auth, async (req, res, next) => {
  try {
    const userId=req.userId;

    //finduser
    const exsistingUser = await user.findOne({ _id: userId });
   
    if (!exsistingUser) {
      res.json({
        msg: "no notifications",
      });
    }
    const allUserNotifications = exsistingUser.userNotification;
    // console.log( allUserNotifications)//array of object id
    const notificationPromises = allUserNotifications.map(async function (
      notification
    ) {
      const notification1 = await usernotification.findOne({
        _id: notification._id,
      });
      return notification1;
    });

    const notifications = await Promise.all(notificationPromises);
    

    res.json({
      notifications: notifications,
    });
  } catch (error) {
  
    console.error("An error occurred:", error);
    next(error);
  }
});

router.post("/forgotpass", async (req, res) => {
  try {
    const check = await user.findOne({ email: req.body.email });

    if (check.email === req.body.email) {
      const secret = JWT_SECRET + check.password;
      console.log(secret); //testing

      const email = check.email;
      const payload = {
        email: check.email,
        id: check.id,
      };
      const token = jwt.sign(payload, secret, { expiresIn: "15m" });
      const link = `http://localhost:3000/${check.id}/${token}`;
      console.log(link);

      sendMail(email, link).then((result) =>
        console.log("Email sent".bgWhite.red, result)
      );

      res.send("<h1>Password reset link has been sent in your mail</h1>");
    } else {
      alert("Wrong email");
    }
  } catch (error) {
    res.send("Wrong details");
  }
});

router.post("/resetpass/:id/:token", async (req, res, next) => {
  try {
    const { id, token } = req.params;
    const { password1, password2 } = req.body;
    console.log(password1, password2);

    //checking the id exists in database
    const check = await user.findOne({ _id: id });

    // valid id valid user
    const secret = JWT_SECRET + check.password;
    const payload = jwt.verify(token, secret);

    if (password1 === password2) {
      console.log("password match: Succes".cyan);

      const adata = await user.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            password: bcrypt.hashSync(password1, 10),
          },
        }
      );
      console.log("Databse fetch : Normal".green);
      res.redirect("/signin");
    } else {
      res.send("Password and Confirm Password should be same");
      console.log("Warning! password match: Failure".red);
    }
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});

router.post("/resetpass/:id/:token", async (req, res, next) => {
  try {
    const { id, token } = req.params;
    const { password1, password2 } = req.body;
    console.log(password1, password2);

    //checking the id exists in database
    const check = await user.findOne({ _id: id });

    // valid id valid user
    const secret = JWT_SECRET + check.password;
    const payload = jwt.verify(token, secret);

    if (password1 === password2) {
      console.log("password match: Succes".cyan);

      const adata = await user.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            password: bcrypt.hashSync(password1, 10),
          },
        }
      );
      console.log("Databse fetch : Normal".green);
      res.redirect("/signin");
    } else {
      res.send("Password and Confirm Password should be same");
      console.log("Warning! password match: Failure".red);
    }
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});

module.exports = router;
