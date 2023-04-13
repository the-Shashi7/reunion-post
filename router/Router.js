const express = require('express');
const postController = require('../controller/postController');
const userController = require('../controller/userController');
const router = express.Router();
const auth_middleware = require('../middleware/auth_middleware');
const auth = auth_middleware.auth;

router
  .post('/authenticate',userController.auth)
  .post('/posts',auth,postController.createPost)
  .get('/all_posts',auth, postController.getAllPost)
  .get('/posts/:id',auth, postController.getPost)
  .post('/api/comment/:id',auth, postController.comment)
  .post('/api/follow/:id',auth, userController.follow)
  .post('/api/unfollow/:id',auth, userController.unFollow)
  .delete('/posts/:id',auth, postController.deletePost);

exports.router = router;  