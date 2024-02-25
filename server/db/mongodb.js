const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(() => {
    console.log("failed to connect");
  });

const logInSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [4, "Password must be atleast 4 characters long"],
  },
  /*password2: {
    type: String,
    required: [true, "Password is required"],
    minlength: [4, "Password must be atleast 4 characters long"],
  },*/
  
  userSlot:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "userSlot"
  }],
  userNotification:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "userNotification"
  }],
  userReward:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "userReward"
  }],
});

const slotInSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  pin: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    generated: true,
  },
});
const pickInSchema = new mongoose.Schema({
  loginid: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const rewardSchema = new mongoose.Schema({

 id: {
    type: Number,
  },
  sub: {
    type: String,
  },
  content: {
    type: String,
  },

});

const notificationSchema = new mongoose.Schema({
   notificationMessage: {
     type: String,
   },
 });

const user = new mongoose.model("LogInuser", logInSchema);
const userSlot = new mongoose.model("userSlot", slotInSchema);
const userReward = new mongoose.model("userReward", rewardSchema);
const usernotification = new mongoose.model("userNotification", notificationSchema);

const pickPartner = new mongoose.model("pickPartner", pickInSchema);

module.exports = {
  user: user,
  userSlot: userSlot,
  pickPartner: pickPartner,
  userReward: userReward,
  usernotification: usernotification,
};
