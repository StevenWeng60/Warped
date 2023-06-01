const express = require('express');
const mongoose = require("mongoose");
const routes = require("./routes/routes.js");
const uploadroutes = require("./routes/uploadroute.js")
require('dotenv').config();
const { instrument } = require("@socket.io/admin-ui")
const {User, Chat, Message, Post} = require("./Schemas/User")
const { createServer } = require("http");

const app = express();
const http=require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: ['http://localhost:3000','https://admin.socket.io'],
    methods: ['GET', 'POST'],
    credentials:true
  },
});

// server for socket.io admin ui
instrument(io, {
  auth: false,
  mode: "development"
});



// global middleware for processing json objects
app.use(express.json());

// parses the json body

// allow access-control from localhost:3000


// storage middleware for multer

// for io connections
io.on('connection', socket => {
  console.log(socket.id);
  socket.on("send-message", (message, room, usersending, userid) => {
    console.log(message)
    console.log(room)
    console.log(`sent by ${userid}`)

    // io.emit('receive-message', message, usersending);
    if (room === ""){
      socket.broadcast.emit('receive-message', message, usersending);
    } else {
      io.in(room).emit('receive-message', message, usersending, userid);
    }
    saveMessage(message, room, userid);
  })

  socket.on('join-room', room => {
    console.log(`Joined room ${room}`);
    socket.join(room)
  })
})

io.on('error', (error) => {
  console.error('Socket.IO Error:', error);
});

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

// async function createChat() {
//   try{
//     const chatInstance = await Chat.create({
//       listOfTexts: ["6467bea15ce8499346bce1b0", "6467bcfda9915f2b08161339"],
//       messageBetween: ["64679e8ec410342a6b763959", "64679e8ec410342a6b763958"]
//     });

//     const messages = await Chat.findOne().populate("listOfTexts").select("listOfTexts");
//     console.log(messages);
//   } catch (e){
//     console.log(e.message);
//   }
// }

// run();
//createChat();

console.log("hisasdasxzcfdszxddf");

const port = 3001;

http.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

// app.listen(3001, () => {
//   console.log("hell yeah");
// });

// createChat();
// create messages and add them to bobthebuilderleaf
async function createChat() {
  try{
    const chatRoom = await Chat.findOne({room: 'bobthebuilderleaf'})
    if(chatRoom){
      const newMessage = await Message.create({
        text: 'should be on the bottom',
      })
      console.log("found");
      chatRoom.listOfTexts.push(newMessage._id);
      await chatRoom.save();
    }
    console.log("success")
  } catch (e){
    console.log(e.message);
  }
}

// save message from chat room to database
const saveMessage = async(cmessage, room, userid) => {
  try{
    const chatRoom = await Chat.findOne({room: room})
  
    if (!chatRoom) {
      console.log(`error, chat room is not found`)
    }
    else{
      const message = await Message.create({
        text: cmessage,
        user: userid,
      })
      chatRoom.listOfTexts.push(message._id)
      await chatRoom.save();
    }
    console.log("message saved");
  }
  catch (e) {
    console.log(e.message);
  }
}