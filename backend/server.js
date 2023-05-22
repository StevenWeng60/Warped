const express = require('express');
const mongoose = require("mongoose");
const routes = require("./routes/routes.js");
require('dotenv').config();
const {User, Chat, Message} = require("./Schemas/User")

const app = express();

//middleware

// parses the json body
app.use(express.json());

// allow access-control from localhost:3000
app.use((req, res, next) => {
  console.log(req.body);
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// routes
app.use('/', routes);

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
    // const user = await User.create({ 
    //   username: "Steven",
    //   age: 21,
    //   email: "test@test.com",
    //   hobbies: ["Weight Lifting", "Bowling"],
    //   address: {
    //     street: "Main street",
    //     city: "houston"
    //   },
    // }
    // )

    // const message = await Message.create({
    //   text: "this is my second message hooray!",
    //   user: "64679e8ec410342a6b763959",
    // })
    const user = await User.findOne().where({username: "Steven"})
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

run();
//createChat();



console.log("hisasdasxzcfdszxddf");

app.listen(3001, () => {
  console.log("hell yeah");
});

