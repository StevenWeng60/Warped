import './Messagebox.css'
import { useState, useEffect } from 'react'
import { FaPenSquare, FaRegWindowClose } from "react-icons/fa";
import { io } from "socket.io-client"
import axios from 'axios'

function Messagebox({friends}) {
  const [currPerson, setCurrPerson] = useState({});
  // New message popup
  const [mCreatePoppedUp, setMCreatePoppedUp] = useState(false);
  const [toUser, setToUser] = useState('');
  const [toValue, setToValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  // to search popup
  const [mToPopUp, setMToPopUp] = useState(false);
  // an array of objects that contain outgoing users and the messages
  // in the chat room
  const [chatList, setChatList] = useState([]);
  // the current chat messages
  const [currChatMessages, setCurrChatMessages] = useState([]);

  // connect to socket.io server
  const socket = io("http://localhost:3001", {
    cors: {
      origin: "*",
    },
  })

  socket.on('receive-message', message => {
    console.log('hi');
    console.log(message);
  })

  // Load the previous messages with the clicked user
  const loadCurrPerson = (friend) => {
    // set the header of the messages room
    setCurrPerson(friend);

    // set the body of the messages room
    // friend[0].listOfTexts.forEach((f) => {
    //   console.log(f.text);
    // })
    // set list of texts equal to the users list of texts
    setCurrChatMessages(friend.listOfTexts)

    // test to see if we connect to server
    socket.on('connect', () => {
      console.log(`you connected with id: ${socket.id}`)
    })

    // create algorithm for creating a room
    const username1 = localStorage.getItem("Username");
    const username2 = friend.username;

    // join room based on adding both usernames together
    // the usernames will be added in sorted order for consistency
    const room = getRoomName(username1, username2);

    socket.emit("join-room", "leafsroom")
    console.log(`in room ${room}`)

  }

  const getRoomName = (username1, username2) => {
    if (username1 > username2){
      return `${username2}${username1}`
    }
    else {
      return`${username1}${username2}`
    }
  }

  const createMessage = () => {
    setMCreatePoppedUp(true);
  }

  const exitCreateMessage = () => {
    // Clear all set fields after we exit the create message box
    setMCreatePoppedUp(false);
    setToUser('');
    setToValue('');
  }

  const handleTextChange = (e) => {
    let updatedToValue = e.target.value;
    if(e.target.value !== ''){
      setMToPopUp(true);
      // Specifies the max number of search results
      const limit = 8;

      let count = 0;

      // Filters friends until the limit is reached
      const filteredSearch = friends.filter((friend) => {
        if (friend.username.includes(updatedToValue) && limit > count){
          count++;
          return friend.username.includes(updatedToValue);
        }
        return false
      })
      
      const list = filteredSearch.map((friend) => {
        return( 
        <li key={friend.id} className="toUserLi" onClick={() => toUserClicked(friend.username)}>
          <p>{friend.username}</p>
        </li>
        );
      })

      setSearchResults(list);
    }
    else {
      setSearchResults([]);
    }
    setToValue(e.target.value);
  }

  const sendingMessage = (e) => {
    e.preventDefault();
    console.log('sending message...')
    // joing a room and sending a message
    const message = "hello world"
    const room = "leafsroom"
    socket.emit("send-message", message, room)
  }

  const toUserClicked = (user) => {
    // Set user label to user clicked 
    setToUser(user);

    // Set mToPopUp to false, getting rid of the pop up search
    setMToPopUp(false);

    // Set to value to '' resetting the search value
    setToValue('');

    setSearchResults([]);
  }

  const getChatRoom = async (username1, username2) => {
    const room = getRoomName(username1, username2);
    return axios.post("http://localhost:3001/connectChat", {
      chatRoom: room,
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    })
  }

  // Add use to chatList on sidebar
  const chatBtnClicked = async (e) => {
    e.preventDefault();
    console.log('chat button clicked')
    setMCreatePoppedUp(false);
    
    // see if the chat instance with the user is already popped up
    // if not, add user and chat messages to side bar
    const instanceFound = chatList.find(obj => obj.username === toUser)
    if (!instanceFound) {
      const user = friends.find(obj => obj.username === toUser)
      const chatRoom = await getChatRoom(localStorage.getItem("Username"), toUser);
      const chatListInstance = Object.assign({}, user, chatRoom);
      setChatList(prevArr => [...chatList, chatListInstance]);
    }
    exitCreateMessage();
  }

  const listitems2 = friends.map(friend =>
    <li key={friend.id} onClick={() => loadCurrPerson(friend)}>
      <div className="messagefriends">
        <img
          className="messagefpfp"
          src={friend.imageUrl}
          alt={friend.username}
        />
        <h4 className="fusername">{friend.username}</h4>
      </div>
    </li>
  );

  return (
    <>
      <div className="messagecontainer">
        <div className="messagesidebar">
          <div className="Searchbar">
            <div className="search-container">
            <form className="mSearchForm">
              <input type="text" placeholder="Search..."/>
              <button type="submit">Search</button>
              <FaPenSquare className="messageBtn" onClick={createMessage}/>
            </form>
            </div>
            {mCreatePoppedUp && <div className="popupContainer">
              {mCreatePoppedUp && <form className="mCreatePopUp" onSubmit={e => chatBtnClicked(e)}>
                <div className="popuptitle">
                  <h1>New Message</h1>
                  <FaRegWindowClose id="createMExitBtn"onClick={exitCreateMessage} style={{fontSize: '2em', color: 'red'}}/>
                </div>
                <div className="toMessage">
                  <label htmlFor="messageUser">To: </label>
                  <input type="text" className="messageUser" value={toValue} onChange={handleTextChange}/>
                  <ul className="toSearchResults">
                    {mToPopUp && searchResults}
                  </ul>
                </div>
                <div className="toMessage" >
                  <label htmlFor="messageUserName">User: {toUser}</label>
                </div>
                <button className="chatBtn" type="submit">Chat</button>
              </form>}
            </div>}
          </div>
          <ul className="mfriendslist">
            {chatList.map(instance =>
            <li key={instance.id} onClick={() => loadCurrPerson(instance)}>
              <div className="messagefriends">
                <img
                  className="messagefpfp"
                  src={instance.imageUrl}
                  alt={instance.username}
                />
                <h4 className="fusername">{instance.username}</h4>
              </div>
            </li>)
            }
          </ul>
        </div>
        { Object.keys(currPerson).length !== 0 && <div className="messagechat">
          <div className="mchattop">
            <div className="messagefriends">
              <img
                className="messagefpfp"
                src={currPerson.imageUrl}
                alt={currPerson.username}
              />
              <h4 className="fusername">{currPerson.username}</h4>
            </div>
          </div>
          <div className="mchatmid">
            {currChatMessages.map((message) => {
              return <h1>{message.text}</h1>;
            })}
          </div>
          <div className="mchatbottom">
            <form className="submitmessagef" onClick={e => sendingMessage(e)}>
              <input type="text"></input>
              <button type="submit">send</button>
            </form>
          </div>
        </div> }
      </div>
    </>
  )
}

export default Messagebox;