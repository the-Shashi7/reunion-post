const jwt = require("jsonwebtoken");
const model = require("../model/userSchema");
const User = model.User;



exports.auth = async (req, res, next) => {
  try {
    const token = req.get("Authorization").split("Bearer ")[1];
    const decoded = jwt.verify(token, "shhhhh");
    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return res.sendStatus(403).json("user not found");
    }
    req.user = user;
    next();
  } catch (e) {
    res.sendStatus(401).send({ Error: "Please authenticate with valid user" });
  }
};
