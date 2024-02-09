const multer = require("multer")
const {v4 : uuidv4} = require('uuid')

//for finding extension of the image
const path = require("path")

const storage = multer.diskStorage({
    destination: function (req, file, cb) { //destination means kis folder mein file save hogi
      cb(null, './public/images/uploads') //Destination folder for uploads
    },
    filename: function (req, file, cb) {
      const uniquename = uuidv4(); //generating a unique filename using uuid
      cb(null, uniquename+path.extname(file.originalname)) //use the unique filename for the uploaded file
    }  //path.extname(file.originalname)  ---> it is used to add extension to the image name i.e uniquename
  })
  
  const upload = multer({ storage: storage })

  module.exports = upload