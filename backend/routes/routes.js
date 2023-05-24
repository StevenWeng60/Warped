const express = require('express');
const router = express.Router();

const { createUser, userLogin, testing, getFriends, getPosts } = require('../controllers/controllers.js')

// route specific middleware
router.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

router.route('/').get((req, res) => {
  res.send('Hellow, world!');
})

router.route('/create').post(createUser)

router.route('/login').post(userLogin)

router.route('/friendicons').post(getFriends)

router.route('/posts').get(testing)

// get route for getting images from cloud
router.route("/postmongodb").get(getPosts);
module.exports = router

