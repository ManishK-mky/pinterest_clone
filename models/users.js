const mongoose = require('mongoose');
const plm = require('passport-local-mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/pinterest_final");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref : 'Post', //ref -> matlab posts k type mein jo id store ho rhi hai woh 'Post' model ki hai
  }],
  // followers
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  savedposts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  }],
  dp: {
    type: String,  //DP matlab profile pic . jab profile picture store hota hai tab woh as a img. ka path store hota hai
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullname:{
    type:String,
    required:true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

userSchema.plugin(plm);

module.exports = mongoose.model('User', userSchema);
