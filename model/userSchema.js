const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  mobile: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  token:{
    type:String,
    required:true
  },
  followers: [{
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }],
  following: [{
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }]
});

exports.User = mongoose.model('User', userSchema);