const { User } = require('../Schemas/User.js');
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
require('dotenv').config()

const createUser = async (req, res) => {
  try{
    // Check to see if username already exists in the database
    const user = await User.findOne().where({username: req.body.username})

    // if not then create an account
    if (user !== null) {
      res.status(200).send("Username taken");
    }
    else {
      try{
        // Create a hashedpassword for encryption generating 10 salts
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        User.create({username: req.body.username, password: hashedPassword});
        res.status(200).send("created user");
      }
      catch (e) {
        console.log(e.message);
        res.status(500).send(e.message);
      }
    }
  } catch (e){
    console.log(e.message);
  }
}

const userLogin = async (req, res) => {
  const user = await User.findOne().where({username: req.body.username})
  // Check to see if we can find the user
  if (user === null) {
    res.status(400).send('Cannot find user')
  }
  // Check to see if user has correct password
  else {
    try{
      console.log(user)
      // If user has corret password generate jwt web token
      if(await bcrypt.compare(req.body.password, user.password)){
        try {
          // convert mongoose document to plain object
          const userObject = user.toObject();
          // generate access token for user
          const accessToken = jwt.sign(userObject, process.env.ACCESS_TOKEN_SECRET);
          // return the access token as the response
          res.json({ accessToken: accessToken });
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal server error');
        }
      }
      else {
        res.send('Not allowed')
      }
    }
    catch {
      res.status(500).send()
    }
  }
}

const getFriends = async (req, res) => {
  try{
    console.log(req.body);
    const user = await User.findOne().where({username: req.body.username}).populate('friends')
    console.log("the user:")
    console.log(user);
    res.send(user);
  }
  catch (error){
    res.status(500).send(error);
  }

}

const testing = (req, res) => {
  const posts = [
    {
      username: "sdfa",
      title: "asdf"
    }
  ]
}

module.exports = {createUser, userLogin, testing, getFriends}