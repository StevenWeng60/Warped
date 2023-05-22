const express = require('express');
const router = express.Router();

const { createUser, userLogin } = require('../controllers/controllers.js')

router.route('/').get((req, res) => {
  res.send('Hellow, world!');
})

router.route('/create').post(createUser)

router.route('/login').post(userLogin)

router.route('/friendicons').get((req, res) => {
  
})

router.route('/posts').get((req, res) => {

})

module.exports = router

