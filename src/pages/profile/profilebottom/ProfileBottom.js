import './ProfileBottom.css'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { FaTrash } from "react-icons/fa";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { storage } from "../../../config/firebase-config"


function ProfileBottom({ posts, userInfo, friendList }) {
  const navigate = useNavigate();
  //postPopUp
  const [postPopUp, setPostPopUp] = useState(false);

  // profile posts
  const [profilePosts, setProfilePosts] = useState(posts);

  // Individual post picture
  const [currIndividualPost, setCurrIndividualPost] = useState({});

  // List of comments of the current individual post
  const [currPostComments, setCurrPostComments] = useState([]);

  // Add comments to feed without having to make another api request
  const [latestComments, setLatestComments] = useState([]);

  //Comment ref
  const commentRef = useRef(null);

  function handleClickOutOfPost(){
    setPostPopUp(false);
    setLatestComments([]);
  }
  function handleClickOutOfPostAndDelete(postId){
    const postsWithoutDeletedOne = profilePosts.filter((post) => {
      return post.postid !== postId;
    })
    setProfilePosts(postsWithoutDeletedOne);
    setPostPopUp(false);
    setLatestComments([]);
  }

  function handleStayInPost(event) {
    event.stopPropagation();
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
    })
    .catch((error) => {
      console.error(error);
    })
    
    const commentSent =             
              (<li>
              <div className="posttop">
                <img
                  className="postuserpfpb"
                  src={localStorage.getItem("avatarURL")}
                  alt={localStorage.getItem("Username")}
                  />        
                <h4 className="commentsh4">{localStorage.getItem("Username")}</h4>
              </div>
              <p className="commentsp">{commentRef.current.value}</p>
            </li>);
    
    setLatestComments(prev => [...prev, commentSent])
    commentRef.current.value = "";
  }

  function deletePost(postId) {
    axios.delete("http://localhost:3001/deletesinglepost", {
      params: {
        id: postId
      }
    })
    .then(function (response) {
      const deleteRef = ref(storage, `projectFiles/${response.data}`);
      deleteObject(deleteRef)
      .then(() => {
        handleClickOutOfPostAndDelete(postId);
      })
      .catch(() => {
        console.error("error");
      })
    })
    .catch((error) => {
      console.error(error);
    })
  }

  async function handlePostPopUp(postId) {
    const post = profilePosts.find((post) => {
      return post.postid === postId;
    })
    
    const getPosts = await axios.post("http://localhost:3001/grabpostcomments", {
      postid: post.postid,
    })
    .then((response) => {
      const comments = response.data.comments;
      // A comment will have a username, the comment, and maybe the profile picture
      if (comments) {
        const mappedComments = comments.map((comment) => {
          const avatarData = comment.user.avatarURL;
          return (
          <li key={comment._id}>
            <div className="posttop">
              <img
                className="postuserpfpb"
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
    })
    .catch((error) => {
      console.error(error);
    })
    
    setPostPopUp(true);
    setCurrIndividualPost(post);
  }

  const userclicked = (username) => {
    let userroute;
    if(friendList.includes(username)){
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


  return (
  <div className="postflexcontainer">
    { profilePosts.map((post) => {
      return (
      <div className="post" key={post.postid}>
        <img src={post.postImage} className="pfpPostImage hoverable" onClick={() => handlePostPopUp(post.postid)}></img>
      </div>
      );
    }) }
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
              className="postuserpfpb hoverable"
              src={currIndividualPost.avatarImage}
              alt={currIndividualPost.username}
              onClick={() => userclicked(currIndividualPost.username)}
            />
            <h4 className="postusername">{currIndividualPost.username}</h4>
            {userInfo.areFriends === 'me' ? <FaTrash className="trashicon" onClick={() => deletePost(currIndividualPost.postid)}/> : <></>}
          </div>
          <div className="commentsdiv">
            <ul className="commentsul">
              <li>
                <div className="posttop">
                  <img
                    className="postuserpfpb hoverable"
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
  </div>
  );
}

export default ProfileBottom;