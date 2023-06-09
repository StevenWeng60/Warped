import './ProfileBottom.css'
import { people } from '../../../utilities/data.js'
import { getImageUrl } from '../../../utilities/utils.js'
import { useEffect, useState, useRef } from 'react'
import { Buffer } from 'buffer'
import axios from 'axios'

function ProfileBottom({ posts }) {
  const [usersPosts, setUsersPosts] = useState([]);

  //postPopUp
  const [postPopUp, setPostPopUp] = useState(false);

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
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    })
    
    const commentSent =             
              (<li>
              <div className="posttop">
                <img
                  className="postuserpfpb"
                  src={""}
                  alt={localStorage.getItem("Username")}
                  />        
                <h4 className="commentsh4">{localStorage.getItem("Username")}</h4>
              </div>
              <p className="commentsp">{commentRef.current.value}</p>
            </li>);
    
    setLatestComments(prev => [...prev, commentSent])
    commentRef.current.value = "";
  }

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
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    })
    
    setPostPopUp(true);
    setCurrIndividualPost(post);
  }


  return (
  <div className="postflexcontainer">
    { posts.map((post) => {
      return (
      <div className="post" key={post._id}>
        <img src={post.postImage} className="pfpPostImage" onClick={() => handlePostPopUp(post.postid)}></img>
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
              className="postuserpfpb"
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
                    className="postuserpfpb"
                    src={currIndividualPost.avatarImage}
                    alt={currIndividualPost.username}
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