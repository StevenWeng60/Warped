import './ProfileTop.css'
import { useRef, useState, useEffect } from 'react'
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { storage } from "../../../config/firebase-config"
import axios from 'axios'

function ProfileTop({userInfo}) {

  console.log(localStorage.getItem("Username"));
  console.log(userInfo.username);
  console.log(userInfo.areFriends)
  console.log(`are friends: ${userInfo.areFriends}`);
  const [isFriend, setIsFriend] = useState(userInfo.areFriends == 'y');
  
  // Check to see if areFriends is y
  // This is because initalizing using an expression isn't working?

  const inputFileRef = useRef(null);

  const [postData, setPostData] = useState(userInfo.avatarData);

  useEffect(() => {
    setPostData(userInfo.avatarData);
  }, [userInfo.avatarData])

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const imageURL = `projectFiles/${file.name}`;
    const filesFolderRef = ref(storage, imageURL)
    try {
      // upload file
      await uploadBytes(filesFolderRef, file)
      // Get url link of the uploaded file
      const downloadURL = await getDownloadURL(ref(storage, imageURL));
      axios.post("http://localhost:3001/uploadfirebase/pfp",{
        username: localStorage.getItem("Username"),
        avatarURL: downloadURL,
        imageName: file.name,
      }).then(function (response){
        console.log(response);
        const deleteRef = ref(storage, `projectFiles/${response.data}`);
        deleteObject(deleteRef)
        .then(() => {
          localStorage.setItem('avatarURL', downloadURL);
          setPostData(downloadURL);
        })
        .catch(() => {
          console.error();
        })
      }).catch(function (error){
        console.log(error);
      })
    }
    catch (err) {
      console.error(err);
    }
    console.log("complete1");
    console.log("nice going");
  }

  const handleImageClick = () => {
    inputFileRef.current.click();
  }

  // Add a friend 

  const handleAddFriend = async () => {
    const requestBody = {
      username1: localStorage.getItem("Username"),
      username2: userInfo.username 
    }
    axios.post("http://localhost:3001/addfriend", requestBody)
    .then((response) => {
      setIsFriend(true);
      console.log("route works!");

    })
    .catch((error) => {
      console.log(error);
    })
  }

  console.log(isFriend);

  return (
    <>
      <div className="profiletop">
        <div className="pfp">
          <form encType="multipart/form-data" method="post">
            <div className="form-group">
                { userInfo.areFriends === 'me'
                  ? <img
                    src={postData} onClick={handleImageClick} className="avatar hoverable"/>
                  : <img
                    src={postData} className="avatar hoverable"/>
                }
              <input className="imageInput" type="file"  name="uploaded_file" style ={{display: "none"}} ref={inputFileRef} onChange={handleFileUpload}/> 
            </div>
          </form>
        </div>
        <div className="pfdescription">
          <div className="pfdescriptionflex">
            <div className="name">
              <h1 style={{color: '#F4EEE0'}}>{userInfo.username}</h1>
                { localStorage.getItem("Username") === userInfo.username 
                ? <h3></h3>
                : isFriend 
                  ? <h3 className="friends">friends</h3>
                  : <h3 className="addfriend" onClick={handleAddFriend}>Add friend</h3>
                }
            </div>
            <div className="followerstats">
              <div className="followerstats2">
                <div className="stats">
                  <h4>{userInfo.numPosts} posts</h4>
                  <h4>{userInfo.numFriends} followers</h4>
                  <h4>{userInfo.numFriends} following</h4>
                </div>
              </div>
            </div>
            <div className="bio">
              <p>{userInfo.profileDescription}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileTop;