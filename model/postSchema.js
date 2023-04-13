const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  comments: [
    {
      sentBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      sentAt: {
        type: Date,
        default: Date.now,
        required: true,
      },
      msg: {
        type: String,
        required: true
      }
    },
  ],
  likes:{
    type:Number,
    required:true,
    default:0,
  },
});

exports.Post = mongoose.model("Post", postSchema);