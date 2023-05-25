const { User, Post } = require('../Schemas/User.js');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
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
        // Add default image to user
        const destinationPath = path.join(__dirname, '../images/default.jpg');
        const buffer = fs.readFileSync(destinationPath);
        User.create({
          username: req.body.username,
          password: hashedPassword,
          avatar: buffer,
          avatarContentType: "image/jpeg"
          });
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
    const user = await User.findOne().where({username: req.body.username}).populate('friends')
    console.log("the user:")
    console.log(user.username);
    res.send(user);
  }
  catch (error){
    res.status(500).send(error);
  }
}

const avatarUpload = (req, res) => {
  res.send("upload successful");
}

const pfpUpload = async (req, res) => {
  try{
    const { buffer, mimetype} = req.file;
    const user = await User.findOne().where({username : req.query.username});
    user.avatar = buffer;
    user.contentType = mimetype;
    await user.save();
    res.status(200).send("successful!")
  } catch (e) {
    res.status(500).send("error occurred")
  }

}

const postUpload = async (req, res) => {
  const { originalname, buffer, mimetype } = req.file;
  console.log(originalname);
  try {
    const post = new Post({
      name: originalname,
      data: buffer,
      contentType:mimetype,
      description: "first post created"
    })

    await post.save();
    res.send("Post upload successful");
  }
  catch (error) {
    console.log(error);
    res.status(500).send("error uploading picture");
  }
}


const singlePostUpload = async (req, res) => {
  try{
    const user = await User.findOne().where({username: req.body.username});
    if(!user){
      res.status(404).send('User not found');
    }
    // Create post here
    else {
      const {buffer, mimetype} = req.file;
      try {
        // Create the post and save it to the database
        const post = new Post({
          name: user.username,
          data: buffer,
          contentType: mimetype,
          description: req.body.caption,
        })
        
        await post.save();
        
        // Add the post to the users post list
        user.posts.push(post._id);
        await user.save();
      }
      catch (e) {
        return res.status(500).send("error in creating and saving post")
      }
    }
    res.status(200).send("request sent successfully");
  }
  catch (e) {
    res.status(500).send(e.message);
  }
}

const getPosts = async (req, res) => {
  const requsername = req.query.username;
  console.log(req.query);

  try {
    const user = await User.findOne().where({username: requsername});
    if (!user) {
      res.status(404).send('User not found');
    } else {
      // console.log(user);
      res.set('Content-Type', user.avatarContentType);
      res.send(user.avatar);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Error retrieving image or user');
  }
}

const getUsersPosts = async (req, res) => {
  try {
    const user = await User.findOne().where({username: req.query.username}).populate('posts')
    if (!user) {
      res.status(404).send('User not found');
    } else {
      console.log(user.posts);
      res.status(200).send(user.posts);
    }
  }
  catch (e){
    res.status(500).send(e)
  }
}
/**const postUpload = async (req, res) => {
  const { originalname, buffer, mimetype } = req.file;
  console.log(originalname);
  try {
    const post = new Post({
      name: originalname,
      data: buffer,
      contentType:mimetype,
      description: "first post created"
    })

    await post.save();
    res.send("Post upload successful");
  }
  catch (error) {
    console.log(error);
    res.status(500).send("error uploading picture");
  }
} */

const testing = (req, res) => {
  const posts = [
    {
      username: "sdfa",
      title: "asdf"
    }
  ]
}

module.exports = {createUser, userLogin, testing, getFriends, avatarUpload, postUpload, getPosts, pfpUpload, singlePostUpload, getUsersPosts}