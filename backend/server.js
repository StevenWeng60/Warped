const express = require('express');
const mongoose = require("mongoose");
require('dotenv').config();
const {User, Chat, Message} = require("./Schemas/User")

const app = express();

app.get('/', (req, res) => {
  res.send('Hellow, world!');
});

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
    const user = await User.findOne().where({username: "Steven"}).populate("friends");
    // const user = await User.find();
    user.friends.push('64679d489fb6cced5e12c756')
    await user.save();
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

