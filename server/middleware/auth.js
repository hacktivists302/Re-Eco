const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

//Middlewares for handling authentication
const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  try {
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(403).json({msg:"user not authenticated/something went wrong"});
    }
    
    const token = authHeader.split(" ")[1];
    const decodedValue = jwt.verify(token, JWT_SECRET);
    if (decodedValue.userId) {
      req.userId = decodedValue.userId; //since decodedValue contains userId and  jwt secret as a header when jwt.signin
    }

    next();
  } catch (err) {
    return res.status(403).json({msg:"user not authenticated/something went wrong"});
  }
};
module.exports = { auth };
