const express = require('express')
const router = express.Router();
const multer = require("multer")
const path = require("path")
const { avatarUpload, postUpload, getPosts, pfpUpload, singlePostUpload} = require('../controllers/controllers.js')
const fs = require("fs");



// extra functions
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destinationPath = path.join(__dirname, '../images');
    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });
// route specific middleware
// allows middleware to extract a file before allowing cors access, it has to be in this specific order because of the content-type
router.use(upload.single('avatar'));

// allows cors access
router.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  if (req.file) {
    const buffer = fs.readFileSync(req.file.path);
    req.file.buffer = buffer;
  }
  next();
});

// pfp used for adding profile pictures
// addpost used for adding post to a users collection


// router.route("/avatar").post(avatarUpload)
// router.route("/post").post(postUpload)
// router.route("/pfp").post(pfpUpload)
// router.route("/singlepost").post(singlePostUpload)


module.exports = router