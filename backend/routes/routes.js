const express = require('express');
const router = express.Router();


router.route('/').get((req, res) => {
  res.status(200).send("asdfkldjsaf");
})
router.route('/friendicons').get().post()
router.route('/posts').get().post()

module.exports = router;

