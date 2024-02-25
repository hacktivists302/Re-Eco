const jwt = require("jsonwebtoken");
require("dotenv").config();

//Middlewares for handling authentication
const auth = async (req, res, next) => {
  const Atoken = req.cookies.jwt;

  if (!Atoken) {
    res.redirect("/signin");
    //return res.status(401).send("No token found");
  } else {
    jwt.verify(Atoken, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/signin");
      } else {
        //console.log(decodedToken);
        next();
      }
    });
  }
};
module.exports = { auth };
