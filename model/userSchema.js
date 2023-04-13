const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required:true
  },
  email: {
    type: String,
    required: true,
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
    ref: "User"
  }],
  following: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }]
});

exports.User = mongoose.model('User', userSchema);