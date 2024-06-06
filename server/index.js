const express = require("express");
const path = require("path");
const app = express();
const userRouter = require("./routes/user");
const pickpartnerRouter = require("./routes/pickpartner");
// const jwt = require("jsonwebtoken");
// const nodemailer = require("nodemailer");
// const { google } = require("googleapis");
require("dotenv").config();
// const templatePath = require("./templates");

const cors = require("cors");

// app.use(express.static("public")); //to load css files and images
app.use(express.json());
app.use(cors());
// app.use(cookieParser());
// app.use(express.urlencoded({ extended: false }));

app.use("/user", userRouter);
app.use("/picksignin", pickpartnerRouter);

//complete forgot password email api and process
// const CLIENT_ID = process.env.CLIENT_ID;
// const CLIENT_SECRET = process.env.CLIENT_SECRET;
// const REDIRECT_URI = "https://developers.google.com/oauthplayground";
// const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

// const oAuth2Client = new google.auth.OAuth2(
//   CLIENT_ID,
//   CLIENT_SECRET,
//   REDIRECT_URI
// );
// oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// async function sendMail(email, link) {
//   try {
//     const accessToken = await oAuth2Client.getAccessToken();

//     const transport = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         type: "OAuth2",
//         user: "deepjyoti2301@gmail.com",
//         clientId: CLIENT_ID,
//         clientSecret: CLIENT_SECRET,
//         refreshToken: REFRESH_TOKEN,
//         accessToken: accessToken,
//       },
//     });

//     const mailOptions = {
//       from: "ECOPERKS <deepjyoti2301@gmail.com>",
//       to: email,
//       subject: "Ecoperks Password reset",
//       text: link,
//     };
//     const result = await transport.sendMail(mailOptions);
//   } catch (error) {
//     return error;
//   }
// } //email ends here

// app.get("/resetpass/:id/:token", async (req, res, next) => {
//   const { id, token } = req.params;
//   //checking the id exists in database
//   try {
//     const check = await user.findOne({ _id: id });

//     // valid id valid user
//     const secret = JWT_SECRET + check.password;

//     const payload = jwt.verify(token, secret);
//     res.render("reset-password", { email: check.email });
//   } catch (error) {
//     res.send(error.message);
//   }
// });

app.listen(process.env.PORT || 4000, () => {
  console.log(`port connected at http://localhost:4000/user`);
});
