const { User, Post, Chat, Message } = require('../Schemas/User.js');
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
        const defaultURL = req.body.defaultURL;
        User.create({
          username: req.body.username,
          password: hashedPassword,
          email: req.body.email,
          avatarURL: defaultURL,
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
          const userObject = user.username;
          // generate access token for user
          const accessToken = jwt.sign(userObject, process.env.ACCESS_TOKEN_SECRET);
          // generate refresh token for user
          // const refreshToken = jwt.sign(userObject, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d'})
          // return the access token as the response
          res.json({ accessToken: accessToken, id: user._id });
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
          user: user._id,
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
const singlePostUploadFirebase = async (req, res) => {
  try{
    const user = await User.findOne().where({username: req.body.username});
    if(!user){
      res.status(404).send('User not found');
    }
    // Create post here
    else {
      try {
        // Create the post and save it to the database
        const post = new Post({
          user: user._id,
          url: req.body.imgURL,
          description: req.body.caption,
          imageName: req.body.imageName,
          hashtags: req.body.hashtags,
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
      res.status(200).send(user);
    }
  }
  catch (e){
    res.status(500).send(e)
  }
}

const getUsersPostsFirebase = async (req, res) => {
  try {
    const user = await User.findOne().where({username: req.query.username}).populate('posts')
    if (!user) {
      res.status(404).send('User not found');
    } else {
      console.log(user.posts);
      res.status(200).send(user);
    }
  }
  catch (e){
    res.status(500).send(e)
  }
}

const findUsers = async (req, res) => {
  try{
    // Find users
    if (req.query.queryItem === "User") {
      console.log("asdf")
      // Find the request user
      const requestUser = await User.findOne({username: req.query.requser}).select("friends")
      .populate("friends");
      
      const friends = requestUser.friends.map((friend) => {
        console.log("mapped")
        return friend.username;
      })

      // Find the list of users that contain the the search parameter
      const regex = new RegExp(req.query.username, 'i')
      const user = await User.find({username: {$regex:regex}}).limit(40);

      const response = [friends, user]
      res.status(200).send(response)
    }
    // Find posts
    else {

    }
  }
  catch (error) {
    res.status(500).send(error)
  }
}

const addFriend = async (req, res) => {
  try {
    const user1 = await User.findOne({username: req.body.username1});
    const user2 = await User.findOne({username: req.body.username2});
    User.updateOne({username:user1.username}, {
      $push : {friends: user2._id},
      $inc : {numFriends: 1}})
    .then(() => {
      console.log("success1")
    })
    .catch(() => {
      console.log("success2")
    })

    User.updateOne({username:user2.username}, {
      $push : {friends: user1._id},
      $inc : {numFriends: 1}})
    .then(() => {
      console.log("success1")
    })
    .catch(() => {
      console.log("success2")
    })

    res.status(200).send("success");
  }
  catch (error){
    res.status(500).send(error);
  }
}

const getMainFeed = async (req, res) => {
  try{
    const user = await User.findOne({username: req.query.username}).populate({
      path: 'friends',
      populate: {
        path: 'posts',
        options: { limit: 5, sort: {createdAt: -1}, populate: {
          path: 'user'
        }}
      }
    });
    const posts = user.friends.reduce((allPosts, friend) => {
      return allPosts.concat(friend.posts);
    }, []);

    posts.sort((a, b) => b.createdAt - a.createdAt);

    posts.forEach((post) => {
      console.log(post);
      console.log(post.description);
      console.log(post.user.username);
    });
    res.status(200).send(posts);
  }
  catch (error) {

  }
  console.log(req.query.username);

  // first get the users list of friends with the data being populated
  // Then get up to 10 post from each friend with the posts being populated
  // This is stored in a 2d array using the map function
  // Then use the flat function so that the array is 1d
  // Then sort the array by when the posts were created (with the newest posts being at the top)
  // Then return the sorted array
}

const getFriendsList = async (req, res) => {
  res.status(200).send("getFrindsList route works");
}

const connectChat = async (req, res) => {
  const roomName = req.body.chatRoom;
  console.log(`\n\n${req.body.chatRoom}\n\n`);
  try{
    console.log("a")
    const chatFound = await Chat.findOne({room: roomName});
    if (chatFound){
      const chat = await Chat.aggregate([
        {$match: {room: roomName}},
        {
          $lookup: {
            from: "messages",
            localField: "listOfTexts",
            foreignField: "_id",
            as: "listOfTexts",
          },
        },
        {
          $unwind: "$listOfTexts"
        },
        {
          $sort: {"listOfTexts.createdAt": 1}
        },
        {
          $group: {
            _id: "$_id",
            room: {$first: "$room"},
            listOfTexts: {$push: "$listOfTexts"},
          },
        },
        {$project: {_id: 0}},
        { $limit: 50},
      ]);
      console.log(chat[0]);
      res.status(200).send(chat[0]);
    } else {
      const chatInstance = new Chat({
        room: roomName,
      })
  
      chatInstance.save();
  
      console.log(`chat instance = ${chatInstance}`);
  
      res.status(200).send(chatInstance);
    }
  }
  catch (error) {
    console.log(error.message);
    res.status(500).send(error);
  }
}

const allowAccess = async (req, res) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(200).send("not allowed")
      res.status(200).send("yes")
  })
}

const changeBio = async (req, res) => {
  User.findOneAndUpdate(
    { username: req.body.username },
    { profileDescription: req.body.biodescription } 
  )
  .then(updatedUser => {
    res.status(200).send("completed");
  })
  .catch((error) => {
    res.status(201).send(error.message);
  })
}

const grabPostComments = async (req, res) => {
  try{
    const post = await Post.findOne({_id: req.body.postid}).populate({
      path: "comments",
      options: {
        limit: 10
      },
      populate: {
        path: 'user',
        model: 'User'
      }
    })
    // console.log(req.body.postid);
    // const post = await Post.aggregate([
    //   { $match: { _id: req.body.postid } },
    //   { $limit: 1 },
    //   {
    //     $lookup: {
    //       from: 'Message', 
    //       localField: 'comments',
    //       foreignField: '_id',
    //       as: 'comments'
    //     }
    //   },
    //   { $unwind: '$comments' },
    //   { $limit: 10 },
    //   {
    //     $lookup: {
    //       from: 'User', // Assuming the user collection is named 'users'
    //       localField: 'comments.user',
    //       foreignField: '_id',
    //       as: 'comments.user'
    //     }
    //   },
    //   {
    //     $group: {
    //       _id: '$_id',
    //       data: { $first: '$data' },
    //       contentType: { $first: '$contentType' },
    //       user: { $first: '$user' },
    //       description: { $first: '$description' },
    //       likes: { $first: '$likes' },
    //       comments: { $push: '$comments' }
    //     }
    //   }
    // ]);
    console.log(post);
    res.status(200).send(post);
  }
  catch (e){
    res.status(500).send(e.message);
  }
}

const addMessageToComment = async (req, res) => {
  // Need req.body.userid, req.body.commentText, req.body.postid
  try {
    // Create message
    const message = new Message({
      text: req.body.commentText,
      user: req.body.userid,
    })

    await message.save();

    // Add message to post
    const post = await Post.findOne({_id: req.body.postid})

    post.comments.push(message._id)
    await post.save();

    res.status(200).send("Success")
  }
  catch (error) {
    console.error(error);
  }
}

const likeorUnlike = async (req, res) => {
  // Need action, userid, postid
  const action = req.body.action;
  console.log(req.body.userid);
  console.log(req.body.postid);
  console.log(req.body.action);

  
  try {
    const post = await Post.findOne({_id: req.body.postid})

    if (action === 'like'){
      post.usersWhoLiked.push(req.body.userid)
      post.save();
    }
    else if (action === 'unlike'){      
      const index = post.usersWhoLiked.indexOf(req.body.userid);
      if (index > -1){
        post.usersWhoLiked.splice(index, 1);
      }
      post.save();
    }
    res.status(200).send(`successfully ${action}d post`)
  }
  catch (e) {
    res.status(500).send(e.message)
  }
}

const changeChatActive = async (req, res) => {
  //User, friend, action
  try {
    const action = req.body.action;
    const user = await User.findOne({username: req.body.username})
    if (action === 'add'){
      user.chatActive.push(req.body.friendid)
      user.save();
    }
    else if (action === 'remove'){
      user.chatActive.pull(req.body.friendid)
      user.save();
    }
    else {
      res.status(500).send("Incorrect action type")
    }
    res.status(200).send("successfully changed chat active")
  }
  catch (e) {
    res.status(500).send(e.message);
  }
}

const getUser = async (req, res) => {
  try {
    const userwithemail = await User.findOne({email: req.query.email})
    if(!userwithemail) {
      const userwithusername = await User.findOne({username: req.query.email})
      if(userwithusername){
        res.status(200).send(userwithusername);
      }
      else {
        res.status(500).send("Couldn't find user")
      }
    }
    else {
      res.status(200).send(userwithemail);
    }
  }
  catch (e) {
    res.status(500).send(e.message);
  }
}

const uploadAvatarFirebase = async (req, res) => {
  try {
    const user = await User.findOne({username:req.body.username})
    if (user) {
      const oldImageName = user.imageName;
      user.avatarURL = req.body.avatarURL;
      user.imageName = req.body.imageName;
      await user.save();
      res.status(200).send(oldImageName);
    }
    else {
      res.status(500).send("Could not find user")
    }
  }
  catch (e) {

  }
}

const deletePost = async (req, res) => {
  try {
    const post = await Post.findOne({_id: req.query.id});
    await Post.deleteOne({_id: req.query.id})
    .then(response => {
      console.log(`Post id: ${req.query.id}`);
      res.status(200).send(post.imageName);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send("deletion failed");
    })
  }
  catch (error) {
    res.status(500).send(error.message);
  }
}

const findAllPosts = async (req, res) => {
  try {
    console.log(`query keyword = ${req.query.keyword}`)
    const regex = new RegExp(req.query.keyword, 'i')
    const post = await Post.find({hashtags: {$regex:regex}}).populate("user").limit(30);
    res.status(200).send(post);
  }
  catch (error) {
    res.status(500).send(error.message);
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

module.exports = {createUser, userLogin, testing, getFriends, avatarUpload, postUpload, getPosts, pfpUpload, singlePostUpload, getUsersPosts, findUsers, addFriend, getMainFeed, getFriendsList,
connectChat, allowAccess, changeBio, grabPostComments, addMessageToComment, likeorUnlike, changeChatActive, getUser, singlePostUploadFirebase, getUsersPostsFirebase, uploadAvatarFirebase, deletePost, findAllPosts}