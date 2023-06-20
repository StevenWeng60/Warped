import { useNavigate } from 'react-router-dom' 
import { useEffect, useState, useRef} from 'react'
import React from 'react'
import { FaHeart, FaComment } from "react-icons/fa";
import axios from 'axios'
import './Main.css'

// Custom hook for keeping track of a posts likes/unlike
const useBooleanArray = (length) => {
  const initialArray = useRef(Array(length).fill(false));
  const [array, setArray] = useState(initialArray.current);

  useEffect(() => {
    initialArray.current = Array(length).fill(false);
  }, [length]);

  return [array, setArray];
}

function Main({listofposts, listOfFriends}) {
  const navigate = useNavigate();

  const [posts, setPosts] = useState(listofposts);


  // Pop up the individual post
  const [postPopUp, setPostPopUp] = useState(false);

  // Individual post picture
  const [currIndividualPost, setCurrIndividualPost] = useState({});

  // List of comments of the current individual post
  const [currPostComments, setCurrPostComments] = useState([]);

  //Comment ref
  const commentRef = useRef(null);

  // Add comments to feed without having to make another api request
  const [latestComments, setLatestComments] = useState([]);

  // Keep track of users liking/unliking posts
  const [hasLikedPost, setHasLikedPost] = useState(false);

  // refs
  const [likesBooleanArray, setLikesBooleanArray] = useBooleanArray(listofposts.length);

  const listitems = posts.map((post) => {
    return <li>{post.name}</li>
  })


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
          const avatarData = comment.avatarURL;
          return (
          <li>
            <div className="posttop">
              <img
                className="postuserpfp hoverable"
                src={avatarData}
                alt={comment.user.username}
                onClick={() => userclicked(comment.user.username)}
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
    setLatestComments([]);
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
    
    const commentSent =             
              (<li>
              <div className="posttop">
                <img
                  className="postuserpfp hoverable"
                  src={localStorage.getItem("avatarURL")}
                  alt={localStorage.getItem("Username")}
                  onClick={() => userclicked(localStorage.getItem("Username"))}
                  />        
                <h4 className="commentsh4">{localStorage.getItem("Username")}</h4>
              </div>
              <p className="commentsp">{commentRef.current.value}</p>
            </li>);
    
    setLatestComments(prev => [...prev, commentSent])
    commentRef.current.value = "";
  }

  function handlePostLiked(event, index, postId) {
    const likeAction = !likesBooleanArray[index] ? 'like' : 'unlike';
    console.log(`Post id: ${postId}`);
    console.log(`Index: ${index}`);


    axios.post("http://localhost:3001/likeorunlike", {
      action: likeAction,
      postid: postId,
      userid: localStorage.getItem("Id"),
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    })

    setLikesBooleanArray(prev => {
      const newArray = [...prev];
      newArray[index] = !likesBooleanArray[index];
      return newArray;
    });
  }

  function handlePostAlreadyLiked(event, index, postId){
    const likeAction = likesBooleanArray[index] ? 'like' : 'unlike';
    console.log(`Post id: ${postId}`);
    console.log(`Index: ${index}`);

    axios.post("http://localhost:3001/likeorunlike", {
      action: likeAction,
      postid: postId,
      userid: localStorage.getItem("Id"),
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    })

    setLikesBooleanArray(prev => {
      const newArray = [...prev];
      newArray[index] = !likesBooleanArray[index];
      return newArray;
    });
  }

  const userclicked = (username) => {
    let userroute;
    console.log(listOfFriends);
    if(listOfFriends.includes(username)){
      userroute = '/profile/' + username + '/y';
    }
    else if (username === localStorage.getItem("Username")){
      userroute = '/profile/' + username + '/me';
    }
    else {
      userroute = '/profile/' + username + "/n";
    }
    navigate(userroute);
  }

  return <ul className="mainfeedul">{ 
    posts.map((post, index) =>
    <li className="mainfeedpostli"key={post.id}>
      <div className="posttop">
        <img
          className="postuserpfp hoverable"
          src={post.avatarImage}
          alt={post.username}
          onClick={() => userclicked(post.username)}
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
        {
          post.alreadyLikedPost
          ? 
          <div style={{width: "100%", fontSize: "1.5em"}}>
            <FaHeart className="faheart"onClick={(event) => handlePostAlreadyLiked(event, index, post.postid)} style={{color: likesBooleanArray[index] ? '#F4EEE0' : 'red', paddingRight: "0.75em"}}/>
            <FaComment className="facomment" style={{paddingRight: "0.75em"}} onClick={() => handlePostPopUp(post.postid)}/>
            <h6 style={{fontSize: ".75em", display: "inline-block", padding: '0', margin: '0'}}>{likesBooleanArray[index] ? post.numlikes - 1: post.numlikes} likes</h6>
          </div>
          :
          <div style={{width: "100%", fontSize: "1.5em"}}>
            <FaHeart className="faheart"onClick={(event) => handlePostLiked(event, index, post.postid)} style={{color: likesBooleanArray[index] ? 'red' : '#F4EEE0', paddingRight: "0.75em"}}/>
            <FaComment className="facomment" style={{paddingRight: "0.75em"}} onClick={() => handlePostPopUp(post.postid)}/>
            <h6 style={{fontSize: ".75em", display: "inline-block", padding: '0', margin: '0'}}>{likesBooleanArray[index] ? post.numlikes + 1 : post.numlikes} likes</h6>
          </div>
        }
        <h4>{post.username}</h4>
        <p>{post.description}</p>
        <p style={{opacity: "0.7", paddingTop: "0.5em"}} className='hoverable' onClick={() => handlePostPopUp(post.postid)}>View all comments</p>
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
            className="postuserpfp hoverable"
            src={currIndividualPost.avatarImage}
            alt={currIndividualPost.username}
            onClick={() => userclicked(currIndividualPost.username)}
          />
          <h4 className="postusername">{currIndividualPost.username}</h4>
        </div>
        <div className="commentsdiv">
          <ul className="commentsul">
            <li>
              <div className="posttop">
                <img
                  className="postuserpfp hoverable"
                  src={currIndividualPost.avatarImage}
                  alt={currIndividualPost.username}
                  onClick={() => userclicked(currIndividualPost.username)}
                />        
                <h4 className="commentsh4">{currIndividualPost.username}</h4>
              </div>
              <p className="commentsp">{currIndividualPost.description}</p>
            </li>
            {
              latestComments
            }
            {
              currPostComments
            }
          </ul>
        </div>
        <div className="postcommentbottom">
          <form className="submitmessagef" onSubmit={e => addComment(e)}>
            <input type="text" ref={commentRef}></input>
            <button type="submit">send</button>
          </form>
        </div>
      </div>
    </div>
    }
    <div className="exitPostBtn">X</div>
    </div>}
  </ul>
}

export default Main;
