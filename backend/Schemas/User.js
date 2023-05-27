const mongoose = require("mongoose")


const messageSchema = new mongoose.Schema({
  text: String,
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: () => Date.now()
  }
})

const chatSchema = new mongoose.Schema({
  listOfTexts: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: 'Message'
  },
  messageBetween: {
    type: [mongoose.SchemaTypes.ObjectID],
    ref: 'User',
    required: true,
    validate: {
      validator: (arr) => arr.length == 2,
      message: "There can only be a message between 2 users" 
    }
  }
})

const postSchema = new mongoose.Schema({
  // images
  data: Buffer,
  contentType: String,
  user: mongoose.SchemaTypes.ObjectId,
  description: String,
  likes: {
    type: Number,
    default: 0
  },
  comments: {
    type: [messageSchema],
    ref: 'Message'
  },
  createdAt: {
    type: Date,
    default: () => Date.now()
  }
})

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength:1,
    require: true,
  },
  password: {
    type: String,
    minLength: 8,
    require:true,
  },
  avatar: {
    type: Buffer
  },
  avatarContentType: String,
  profileDescription: {
    type: String,
    default: "No profile description yet"
  },
  posts: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: 'Post'
  },
  numPosts: {
    type: Number,
    default: 0,
  },
  numFriends: {
    type: Number,
    default: 0
  },
  friends: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User'
  },
  age: {
    type: Number,
    min: 1,
    max: 200,
    default: 1
  },
  messages: {
    type: [chatSchema],
    ref: 'Chat'
  },
  // posts
  email: {
    type: String,
    minLength: 10,
    lowercase: true,
    default: "noemail@noemail.com"
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
})

const User = mongoose.model("User", userSchema)
const Chat = mongoose.model("Chat", chatSchema)
const Message = mongoose.model("Message", messageSchema)
const Post = mongoose.model("Post", postSchema)


module.exports = {
  User,
  Chat,
  Message,
  Post,
}