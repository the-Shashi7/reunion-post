const model = require("../model/postSchema");
const Post = model.Post;

// CREATE operation
exports.createPost = async (req, res) => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.status(201).send(post);
  } catch (err) {
    res.status(400).send(err);
  }
};

// READ operations
exports.getAllPost = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.send(posts);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send();
    }
    res.send(post);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.comment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send('Post Not Found');
    }
    post.comments.push({
      sentBy: req.user.id,
      sentAt: post.createdBy,
      msg: req.body.msg
    })

    await post.save();
    return res.status(200).json({msg: "Comment added successfully."})
  } catch (err) {
    res.status(500).send(err);
  }
};

// DELETE operation
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).send();
    }
    res.send(post);
  } catch (err) {
    res.status(500).send(err);
  }
};
