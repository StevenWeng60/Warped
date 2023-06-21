const express = require('express');
const mongoose = require("mongoose");
const routes = require("./routes/routes.js");
const uploadroutes = require("./routes/uploadroute.js")
require('dotenv').config();
const { instrument } = require("@socket.io/admin-ui")
const {User, Chat, Message} = require("./Schemas/User")

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
  socket.on("send-message", (message, room, usersending, userid) => {

    // io.emit('receive-message', message, usersending);
    if (room === ""){
      socket.broadcast.emit('receive-message', message, usersending);
    } else {
      io.in(room).emit('receive-message', message, usersending, userid);
    }
    saveMessage(message, room, userid);
  })

  socket.on('join-room', room => {
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

  } catch (e){
    console.error(e.message);
  }
}


const port = 3001;

http.listen(port, () => {
  // console.log(`Server listening on port ${port}`)
})



// save message from chat room to database
const saveMessage = async(cmessage, room, userid) => {
  try{
    const chatRoom = await Chat.findOne({room: room})
  
    if (!chatRoom) {
      console.error(`error, chat room is not found`)
    }
    else{
      const message = await Message.create({
        text: cmessage,
        user: userid,
      })
      chatRoom.listOfTexts.push(message._id)
      await chatRoom.save();
    }
  }
  catch (e) {
    console.error(e.message);
  }
}
// const updateMany = async () => {
  //   await User.updateMany(
    //   { chatActive: { $exists: false } }, // Select documents without the new property
//   { $set: { chatActive: [] } }
//   )// Set the default value for the new property
// }

// createChat();
// create messages and add them to bobthebuilderleaf
// async function createChat() {
//   try{
//     const chatRoom = await Chat.findOne({room: 'bobthebuilderleaf'})
//     if(chatRoom){
//       const newMessage = await Message.create({
//         text: 'should be on the bottom',
//       })
//       chatRoom.listOfTexts.push(newMessage._id);
//       await chatRoom.save();
//     }
//   } catch (e){
//     console.error(e.message);
//   }
// }
