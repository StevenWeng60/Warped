import { posts } from '../../../utilities/posts.js'
import { people } from '../../../utilities/data.js'
import { getImageUrl } from '../../../utilities/utils.js'
import { useEffect, useState, useRef } from 'react'
import { Buffer } from 'buffer'
import axios from 'axios'
import './Main.css'

function Main({listofposts}) {

  const [posts, setPosts] = useState(listofposts);


  // Pop up the individual post
  const [postPopUp, setPostPopUp] = useState(false);

  // Individual post picture
  const [currIndividualPost, setCurrIndividualPost] = useState({});

  // List of comments of the current individual post
  const [currPostComments, setCurrPostComments] = useState([]);

  //Comment ref
  const commentRef = useRef(null);


  const listitems = posts.map((post) => {
    return <li>{post.name}</li>
  })

  const chemists = people.filter(person =>
    person.profession === 'chemist'
  );

  async function handlePostPopUp(postId) {
    const post = posts.find((post) => {
      console.log(`postId = ${postId} || post.id = ${post.postid}`);
      return post.postid === postId;
    })
    
    const getPosts = await axios.post("http://localhost:3001/grabpostcomments", {
      postid: post.postid,
    })
    .then((response) => {
      const comments = response.data.comments;
      // A comment will have a username, the comment, and maybe the profile picture
      console.log(response);
      if (comments) {
        const mappedComments = comments.map((comment) => {
          const avatarData = `data:${comment.user['avatarContentType']};base64,${Buffer.from(comment.user.avatar, 'binary').toString('base64')}`;
          return (
          <li>
            <div className="posttop">
              <img
                className="postuserpfp"
                src={avatarData}
                alt={comment.user.username}
              />        
              <h4 className="commentsh4">{comment.user.username}</h4>
            </div>
            <p className="commentsp">{comment.text}</p>
          </li>
          );
        })
  
        setCurrPostComments(mappedComments);
      }
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    })
    
    setPostPopUp(true);
    setCurrIndividualPost(post);
  }

  function handleClickOutOfPost(){
    setPostPopUp(false);
  }

  function handleStayInPost(event) {
    event.stopPropagation();
  }

  async function grabCommentsOnPost(post) {
    const getposts = await axios.post("http://localhost:3001/grabpostcomments", {
      postid: post.postid,
    })
    .then((response) => {
      return (response.data);
    })
    .catch((error) => {
      console.error(error);
    })

    return getposts;
  }

  function addComment(e) {
    e.preventDefault();
      // Need req.body.userid, req.body.commentText, req.body.postid
    axios.post("http://localhost:3001/addcomment", {
      userid: localStorage.getItem("Id"),
      commentText: commentRef.current.value,
      postid: currIndividualPost.postid,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    })
    commentRef.current.value = "";
  }

  return <ul className="mainfeedul">{ 
    posts.map(post =>
    <li className="mainfeedpostli"key={post.id}>
      <div className="posttop">
        <img
          className="postuserpfp"
          src={post.avatarImage}
          alt={post.username}
        />
        <h4 className="postusername">{post.username}</h4>
      </div>
      <img
        src={post.postImage}
        alt={post.username}
        className="feedimg"
        style= {{height:'70%', width: '100%'}}
        onClick={() => handlePostPopUp(post.postid)}
      />
      <div className="postbottom">
        <h4>{post.username}</h4>
        <p>{post.description}</p>
      </div>
    </li>
  )
  }
  {postPopUp && <div className="popupContainer" onClick={handleClickOutOfPost}>
    {postPopUp && <div className="poppedUpPost" onClick={(event) => handleStayInPost(event)}>
      <div className="postImage" >
        <img
          src={currIndividualPost.postImage}
          alt={currIndividualPost.username}
          className="popupimg"
          style= {{height: '100%', width: '100%'}}
        />
      </div>
      <div className="imageInformation">
        <div className="posttop" style={{boxSizing: "border-box", borderBottom: "1px solid black", height: "10%"}}>
          <img
            className="postuserpfp"
            src={currIndividualPost.avatarImage}
            alt={currIndividualPost.username}
          />
          <h4 className="postusername">{currIndividualPost.username}</h4>
        </div>
        <div className="commentsdiv">
          <ul className="commentsul">
            <li>
              <div className="posttop">
                <img
                  className="postuserpfp"
                  src={currIndividualPost.avatarImage}
                  alt={currIndividualPost.username}
                />        
                <h4 className="commentsh4">{currIndividualPost.username}</h4>
              </div>
              <p className="commentsp">{currIndividualPost.description}</p>
            </li>
            {
              currPostComments
            }
          </ul>
        </div>
        <div className="mchatbottom">
          <form className="submitmessagef" onSubmit={e => addComment(e)}>
            <input type="text" ref={commentRef}></input>
            <button type="submit">send</button>
          </form>
        </div>
      </div>
    </div>
    }
    </div>}
  </ul>
}

export default Main;

/**
 * {mCreatePoppedUp && <div className="popupContainer">
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
 * 
 */