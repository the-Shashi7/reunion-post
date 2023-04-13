const jwt = require("jsonwebtoken");
const User = require('../model/userSchema');

//auth
exports.auth = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ msg: "Please enter valid email and password" });
  } else {
    var token = jwt.sign(
      { email: email, password: password },
      "shhhhh"
    );
    res
      .status(200)
      .json({ msg: "Successfully authenticated user", token: token });
  }
};

exports.follow = async (req, res) => {
  const user = req.user;
  const userIdToFollow = req.params.id;
  if(!userIdToFollow) return res.status(400).json({msg:"Please send the user id"});

  const UserToFollow = await User.find({id:userIdToFollow});
  if(!UserToFollow) return res.status(400).send({msg: "User Not found"});
  if (!user.following.includes(UserToFollow._id)) {
    user.following.push(UserToFollow._id);
    UserToFollow.followers.push(user._id);
    await user.save();
    await UserToFollow.save();
  }

  res.sendStatus(200);

};

exports.unFollow = async (req, res) => {
  const user = req.user;
  const userIdToUnFollow = req.params.id;
  if(!userIdToUnFollow) return res.status(400).json({msg:"Please send the user id"});

  const UserToUnFollow = await User.find({id:userIdToUnFollow});
  if(!UserToUnFollow) return res.status(400).send({msg: "User Not found"});
  if (user.following.includes(UserToFollow._id)) {
    user.following = user.following.filter((id) => id !== unfollowUser._id);
    UserToUnFollow.followers = UserToUnFollow.followers.filter((id) => id !== user._id);
    await user.save();
    await UserToUnFollow.save();
  }

  res.sendStatus(200);

};
