var express = require('express');
var router = express.Router();
const userModel = require('../models/users')


/* GET users listing. */
router.get('/', isLoggedIn ,async function(req, res, next) {
  // Get the ID of the currently logged-in user from your authentication middleware
  const currentUsername = req.session.passport.user; // Replace with your actual way of getting the user ID

  console.log(currentUsername)
  // Find users that the current user is already following
  // const currentUserId = currentUsername._id
  const currentUser = await userModel.findOne({username : currentUsername});
  console.log(currentUser)
  const followingUserIds = currentUser.following;

  // Exclude the users that the current user is already following
  const alluser = await userModel.find({ _id: { $nin: [...followingUserIds, currentUser._id] } });
  

  res.render('follow', { alluser });
});


//Counting the number of followers and following
router.post('/fol' ,isLoggedIn, async function(req,res){
    // console.log(req.session.passport.user)
  let user = await userModel.findOne({ username: req.session.passport.user });  //koi user kisi ko tabhi follow kar payega jab woh khud loggedIn hoga
  console.log(user);

  const uname = req.body.username;  //taking the username of the followed one--> jisko follow kiya gya hai
  console.log(uname);

  const req_aanewlekpass = await userModel.findOne({ username: uname });
  console.log(req_aanewlekpass);

  // Check if the current user is already following the specified user
  const isFollowing = user.following.includes(req_aanewlekpass._id);

  if (isFollowing) {
  // If already following, display a message or handle accordingly
  console.log("You are already following this user.");
  } 
  else {
  // If not following, follow the user
  user.following.push(req_aanewlekpass._id);
  await user.save();

  req_aanewlekpass.followers.push(user._id);
    await req_aanewlekpass.save();

  console.log("You are now following the user.");
  }


  //similarly for Followers-----------------
  const isFollower = req_aanewlekpass.followers.includes(user._id);
  if (isFollower) {
    // If already following, display a message or handle accordingly
    console.log("You are already following this user.");
    } 
    else {
    // If not following, follow the user
    req_aanewlekpass.followers.push(user._id);
    await req_aanewlekpass.save();
  
    console.log("You are now following the user.");
    }

    console.log(user)
    console.log(req_aanewlekpass)
   res.send("kaam ho gya bhai")
})


  
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()) return next(); //if(true) then --> res.redirect('/profile)
  res.redirect('/')                  // if(false) the return next()
}


module.exports = router;
