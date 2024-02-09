const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  imageText: {
    type: String,
    required: true,
  },
  image:{
    type : String
  },
  user:{
    // yeh store kareg woh userid jisne isko create kiya hai
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User', //ref , isliye kiye hai kyuki humko pta hai ki yeh userid hai lekin post ko nhi pta hai
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Array, //likes k array mein jo jo user post ko like karega uska userId save karenge
    default: [],
  },
});

module.exports = mongoose.model('Post', postSchema);


