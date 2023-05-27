const express = require('express');
const mongoose = require("mongoose");
const routes = require("./routes/routes.js");
const uploadroutes = require("./routes/uploadroute.js")
require('dotenv').config();
const {User, Chat, Message, Post} = require("./Schemas/User")

const app = express();

// global middleware for processing json objects
app.use(express.json());

// parses the json body

// allow access-control from localhost:3000


// storage middleware for multer

// routes
app.use('/', routes);
app.use('/upload', uploadroutes);

async function connect () {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB")
  } catch (error){
    console.error(error);
  }
}

connect();

async function run() {
  try{
    const user = await User.create({ 
      username: "rixslayer",
      password: "rixslayer"
    }
    )

    // const message = await Message.create({
    //   text: "this is my second message hooray!",
    //   user: "64679e8ec410342a6b763959",
    // })
    // const user = await User.findOne().where({username: 'bobthebuilder'}).populate('posts')
    console.log(user)
  } catch (e){
    console.log(e.message);
  }
}

/*
64679ac91a0f8349dac6a425
64679b805aef7a23069d34fd
64679d489fb6cced5e12c756
*/

async function createChat() {
  try{
    const chatInstance = await Chat.create({
      listOfTexts: ["6467bea15ce8499346bce1b0", "6467bcfda9915f2b08161339"],
      messageBetween: ["64679e8ec410342a6b763959", "64679e8ec410342a6b763958"]
    });

    const messages = await Chat.findOne().populate("listOfTexts").select("listOfTexts");
    console.log(messages);
  } catch (e){
    console.log(e.message);
  }
}

// run();
//createChat();



console.log("hisasdasxzcfdszxddf");

app.listen(3001, () => {
  console.log("hell yeah");
});

