const jwt = require("jsonwebtoken");
const model = require("../model/userSchema");
const User  = model.User
//auth
exports.auth = async (req, res) => {
  const user = new User(req.body);
  const {email,password} = req.body;
  if (email) {
    var token = jwt.sign({ email: email,password:password }, "shhhhh");
    user.token = token;
    user.save();
    res.json(user);
  } else {
    res.json("Users not found");
  }
};

exports.follow = async (req, res) => {
  const user = req.user;
  const userIdToFollow = req.params.id;
  if (!userIdToFollow)
    return res.status(400).json({ msg: "Please send the user id" });

  const UserToFollow = await User.find({ id: userIdToFollow });
  if (!UserToFollow) return res.status(400).send({ msg: "User Not found" });
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
  if (!userIdToUnFollow)
    return res.status(400).json({ msg: "Please send the user id" });

  const UserToUnFollow = await User.find({ id: userIdToUnFollow });
  if (!UserToUnFollow) return res.status(400).send({ msg: "User Not found" });
  if (user.following.includes(userIdToUnFollow._id)) {
    user.following = user.following.filter((id) => id !== unfollowUser._id);
    UserToUnFollow.followers = UserToUnFollow.followers.filter(
      (id) => id !== user._id
    );
    await user.save();
    await UserToUnFollow.save();
  }

  res.sendStatus(200);
};
