import './Messagebox.css'
import { useState } from 'react'
import { FaPenSquare, FaRegWindowClose } from "react-icons/fa";

function Messagebox({friends}) {
  const [currPerson, setCurrPerson] = useState({});
  // New message popup
  const [mCreatePoppedUp, setMCreatePoppedUp] = useState(false);
  const [toUser, setToUser] = useState('');
  const [toValue, setToValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  // to search popup
  const [mToPopUp, setMToPopUp] = useState(false);
  const [chatList, setChatList] = useState([]);

  const loadCurrPerson = (friend) => {
    setCurrPerson(friend);
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

  const toUserClicked = (user) => {
    // Set user label to user clicked 
    setToUser(user);

    // Set mToPopUp to false, getting rid of the pop up search
    setMToPopUp(false);

    // Set to value to '' resetting the search value
    setToValue('');

    setSearchResults([]);
  }

  // Add use to chatList on sidebar
  const chatBtnClicked = (e) => {
    e.preventDefault();
    console.log('chat button clicked')
    setMCreatePoppedUp(false);
    
    // see if the chat instance with the user is already popped up
    const instanceFound = chatList.find(obj => obj.username === toUser)
    if (!instanceFound) {
      const user = friends.find(obj => obj.username === toUser)
      setChatList(prevArr => [...chatList, user]);
      console.log(chatList);
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
          </div>
          <div className="mchatbottom">
            <form className="submitmessagef">
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