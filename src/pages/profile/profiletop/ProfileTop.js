import './ProfileTop.css'
import { people } from '../../../utilities/data.js'
import { getImageUrl } from '../../../utilities/utils.js'
import { useRef, useState, useEffect } from 'react'
import { Buffer } from 'buffer'
import axios from 'axios'

function ProfileTop({userInfo}) {

  const inputFileRef = useRef(null);

  const [postData, setPostData] = useState(userInfo.avatarData);
  // console.log(`avatarData: ${userInfo.avatarData}`)
  // console.log(`avatarData: ${postData}`);

  useEffect(() => {
    setPostData(userInfo.avatarData);
  }, [userInfo.avatarData])

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('avatar', file);
    axios.post("http://localhost:3001/upload/pfp",formData,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params: {
        username: localStorage.getItem("Username")
      }
    }).then(function (response){
      console.log(response);
      console.log("hooray");
      grabImageFromMongoDB();
    }).catch(function (error){
      console.log(error);
    })
    console.log("complete1");
    console.log("nice going");
  }

  const handleImageClick = () => {
    inputFileRef.current.click();
  }

  const chemists = people.filter(person =>
    person.profession === 'chemist'
  );

  const grabImageFromMongoDB = async () => {
    axios.get("http://localhost:3001/postmongodb",
    {
      params: {
        username: localStorage.getItem("Username")
      },
      responseType: 'arraybuffer'
    })
    .then(function (response){
      const dataUrl = `data:${response.headers['content-type']};base64,${Buffer.from(response.data, 'binary').toString('base64')}`;
      console.log(response);

      setPostData(dataUrl);

      // Append the <img> element to the document body or any desired container
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  // used for simluating loading since async operations isnt fast enough
  // const [loading, setLoading] = useState(true);


  // if (loading) {
  //   return <div>Loading</div>;
  // }

  return (
    <>
      <div className="profiletop">
        <div className="pfp">
          <form encType="multipart/form-data" method="post">
            <div className="form-group">
                <img
                src={postData} onClick={handleImageClick} className="avatar"/>
              <input className="imageInput" type="file"  name="uploaded_file" style ={{display: "none"}} ref={inputFileRef} onChange={handleFileUpload}/> 
            </div>
          </form>
        </div>
        <div className="pfdescription">
          <div className="pfdescriptionflex">
            <div className="name">
              <h1>{userInfo.username}</h1>
              <h3>Edit profile</h3>
            </div>
            <div className="followerstats">
              <div className="followerstats2">
                <div className="stats">
                  <h4>{userInfo.numPosts} posts</h4>
                  <h4>{userInfo.numFriends} followers</h4>
                  <h4>{userInfo.numFriends} following</h4>
                </div>
              </div>
              <div className="filler">
                <h3>Edit profile</h3>
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