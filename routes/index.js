var express = require('express');
var router = express.Router();

const userModel = require('../models/users');
const postModel = require('../models/posts');

const passport = require('passport');
const upload = require("./multer")

const localStrategy = require('passport-local'); // 8th and 9th line se user login hota hai
passport.use(new localStrategy(userModel.authenticate()))

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});

// router.get('/home' , function(req,res){
//   res.render('home')
// })

router.get('/index' , function(req,res){
  res.render('index')
})

router.get('/login' , function(req,res){
  // console.log(req.flash("error"))
  res.render('login' , {error : req.flash('error')})
})

router.get('/feed' , async function(req,res ,next){
  const allpost = await postModel.find().populate('user')
  // console.log(user)

  res.render('feed' , {allpost})
})

//-----------------------saving the post----------------
router.post('/feed/save', isLoggedIn, async function(req, res) {
  try {
    const img = req.body.user;
    console.log("Image ID:", img);

    // Find the user and populate the necessary fields
    const user = await userModel.findOne({ username: req.session.passport.user })
      // .populate("posts")
      // .populate('following')
      // .populate('followers')
      // .populate('savedposts');

    console.log("User before saving:", user);

    // Check if the image ID is already in the savedposts array
    if (!user.savedposts.includes(img)) {
      // If not, add the new saved post
      user.savedposts.push(img);

      // Save the changes
      await user.save();

      console.log("Image added to savedposts.");
    } else {
      console.log("Image already present in savedposts.");
    }

    // Retrieve the user again to get the updated data
    const updatedUser = await userModel.findOne({ username: req.session.passport.user })
      .populate("posts")
      .populate('following')
      .populate('followers')
      .populate('savedposts');

    console.log("User after saving:", updatedUser);

    res.render('profile', { user: updatedUser });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});








// ---------------------------------------------------
 
//Add New Post Section--------------------------------->
//isLoggedIn use karne se humko bahut aaram se user ka unique username mil jata hai
router.post('/upload' , isLoggedIn , upload.single("file") , async function(req,res,next){  //ismein ----- upload("file") ---jo file likha hai uske liye jha se file ko upload kar rhe hai usme { name="file" } hona jaruri hai 
  if(!req.file){                    //upload.single mein jo upload hai woh bas ek function hai multer.js ka jisko export karke iss file mein(matlab jis mein sue karna hai) usmein import karna hai
    res.status(404).send("no files were given")
  }
  // res.send("files uploaded successfully")

  //ab jo file upload hui hai usse save karo as a post and uska postid user ko do and 
  // post ko userid do

  const user = await userModel.findOne({username : req.session.passport.user })  //user ko dhundh rhe hai taki uske posts mein hum post ki id store kar sake
  
  //post bana rhe hai -> post banana matlab jo model mein post hai uss hisab se data insert karna
  const post = await postModel.create({  //postModel.create({}) liknhe se naya post create hota hai
    image : req.file.filename, //image to hamari ---- req.file---- mein hai isiye
    imageText : req.body.filecaption,
    user : user._id
  })

  //abb kyuki user ne upar post create kiya hai tab bas ab user k post mein yeh postdata dalna hai
  user.posts.push(post._id); //user.posts  -> means user jo data hai usse mein ek posts name ka column ya field bhi hai usmein post ki id dal do  
  await user.save()

  res.redirect("/profile")

})

//Profile page
//agr mein direct profile pe jaunga tab yeh check karega ki yeh loggedIn hai ki nhi agar hai tabhi '/profile' display hoga nhi toh ussi page pe rahega
//yha ['isLoggedIn liknhe se yeh page tab tak nhi khulega jab tak aap login nhi honge']
router.get('/profile' , isLoggedIn , async function(req , res , next){
  // console.log(req.session.passport)
  const user = await userModel.findOne({ //userModel matlab user k database main se find kar rha hai
    username : req.session.passport.user //kyuki passposrt ka use kar rhe hai toh humko yeh dhyan rakhna hai jab tak hum loggedin rahte hai tab tak user
    // ka usernae aa jata hai
  })
  .populate("posts")
  // console.log(user.posts.length)
  .populate('following')
  .populate('followers')
  .populate('savedposts')//jab bhi kisi ke id se uska data nikalana ho tab html/webpage pe use karne se phle usko hamesha 
  // populate kar do
  // console.log(user)
  res.render("profile" ,{user} ) //user mein jo data store hai woh saara data bhej rhe hai profile page pe
})

router.post('/fol-profile' ,isLoggedIn, async function(req,res){
  
  const loggeduser = await userModel.findOne({username : req.session.passport.user})
  console.log(loggeduser._id);
  const uname = req.body.username;
  console.log(uname)
  //check karna hai ki jis user ki req open karane ko aayi hai woh mere following mein hai ki nhi
  const user = await userModel.findOne({ username: uname })
  .populate("posts")
  // console.log(user.posts.length)
  .populate('following')
  .populate('followers');

  //--------------------chekcing hai----------------------
  // console.log(user)
  // const isFollowing = loggeduser.following.includes(user._id)

  // if(isFollowing){
  //     console.log("True")
  // }else{
  //   console.log("False")
  // }

  
  res.render('profile' , {user})
})

//Register
router.post('/register' , function(req,res){
  const userData = new userModel({
    username : req.body.username,
    email : req.body.email,
    fullname : req.body.fullname,
  })

  userModel.register(userData , req.body.password)
  .then(function(){
    passport.authenticate("local")(req , res , function(){
      res.redirect("/profile"); //jaisi hi register hua woh direct profile pe jayega
    })
  })
})

//Login
router.post('/login' , passport.authenticate("local" , {
  successRedirect : "/profile", //agar login successful ho toh woh redirect kar de /profile pe
  failureRedirect: "/login",          // agar login fail ho jaye tab , yeh redirct kare '/' route pe
  failureFlash : true, //matlab login karte time agar koi error ayega tab yeh msg dikh payega
}) , function(req,res){
  res.json(req)
})

router.get("/logout" , function(req,res){
  req.logout(function(err){
    if(err){ return next(err);}
    res.redirect('/'); //logout karke '/' route pe bhej denge
  })
})

//agar koi user loggedIn hai tab 
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()) return next(); //if(true) then --> res.redirect('/profile)
  res.redirect('/login')                  // if(false) the return next()
}

module.exports = router;
