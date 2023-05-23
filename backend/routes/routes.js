const express = require('express');
const router = express.Router();

const { createUser, userLogin, testing, getFriends } = require('../controllers/controllers.js')

router.route('/').get((req, res) => {
  res.send('Hellow, world!');
})

router.route('/create').post(createUser)

router.route('/login').post(userLogin)

router.route('/friendicons').post(getFriends)

router.route('/posts').get(testing)

module.exports = router

