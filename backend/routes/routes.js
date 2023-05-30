const express = require('express');
const router = express.Router();

const { createUser, userLogin, testing, getFriends, getPosts, getUsersPosts, findUsers, addFriend, getMainFeed, getFriendsList } = require('../controllers/controllers.js')

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

// for finding users
router.route('/findusers').get(findUsers)

// get route for getting images from cloud
router.route("/postmongodb").get(getPosts);

// get all of the users posts
router.route("/usersposts").get(getUsersPosts)
module.exports = router

// for adding friends
router.route("/addfriend").post(addFriend)

// get main feed
router.route("/mainfeed").get(getMainFeed);

// get list of friends
router.route("getfriendslist").get(getFriendsList);