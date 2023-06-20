import '../../App.css';
import './Post.css';
import Sidebar from '../../components/sidebar/Sidebar.js';
import { useState, useRef } from 'react'
import axios from 'axios'
import withAuth from '../../components/authenticate';
import Bottombar from '../../components/bottombar/Bottombar';
import { storage } from '../../config/firebase-config'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import firebaseAuth from '../../components/firebaseauth';

function Post() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [text, setText] = useState('Write a Caption...')
  const [seeSuccess, setSeeSuccess] = useState(false);

  // refs to for the html elements
  const inputFileRef = useRef(null);
  const textAreaRef = useRef(null);

  function handleDrop(e) {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
    console.log("nioce!");
  }

  function handleTextChange(e) {
    setText(e.target.value);
  }

  async function handleFormSubmit(e){
    e.preventDefault();

    const imageURL = `projectFiles/${inputFileRef.current.files[0].name}`;
    const filesFolderRef = ref(storage, imageURL)
    try {
      await uploadBytes(filesFolderRef, inputFileRef.current.files[0]);
      console.log("file upload successful")
      
      
      const fileName = inputFileRef.current.files[0].name;
      const downloadURL = await getDownloadURL(ref(storage, imageURL));
      
      console.log("Image URL:", downloadURL);
      // reset text field, preview field
      
      
      getDownloadURL(ref(storage, imageURL))
      .then((url) => {
        console.log(`image url ${url}`);
        axios.post("http://localhost:3001/singlepostfirebaseimg", {
          imgURL: url,
          imageName: fileName,
          caption: text,
          username: localStorage.getItem("Username")
        })
        .then((response) => {
          console.log(response);
          setSeeSuccess(true);
          showSuccessPopUp();
        })
        .catch((error) => {
          console.log(error);
        })
      })
      .catch((error) => {
        console.error(error);
      })
      inputFileRef.current.value= null;
      setText('Write a Caption...');
      setPreview(null);
    } catch (err) {
      console.error(err);
    }
    
  }

  function showSuccessPopUp() {
    setTimeout(() =>{
      setSeeSuccess(false);
    }, 3000)
  }

  return (
  <div className="App">
    <div className="Body">
      <div className="sidebar">
        <Sidebar currActive="Post"/>
      </div>
      {seeSuccess && <h1 className="postSuccessPopUp"><h3 style={{textAlign:'center', margin:'auto'}}>SUCCESS!</h3></h1>}
      <div className="addpost">
        <form className="addpostform" onSubmit={handleFormSubmit} encType="multipart/form-data">
          <h1 className="CreatePostTag">Create Post</h1>
          <div className="postfile-input-container">
            {preview ? (<img src={preview} style={{width: '100%', height: '100%'}}></img>) : (<label htmlFor="postfile-input" className="file-input-label">
              Choose a file
            </label>)}
            <input type="file" id="postfile-input" className="postfile-input" onChange={handleDrop} ref={inputFileRef}/>
          </div>
          <textarea rows="4" cols="25" type="textarea" id="postcaptions" value={text} onChange={handleTextChange} style={{width: '100%'}}></textarea>
          <div style={{textAlign: 'center'}}>
            <button type="submit" style={{borderRadius: '5px'}}>Create</button>
          </div>
        </form>
      </div>
      <div className="bottombar">
        <Bottombar currActive="Post"/>
      </div>
    </div>
  </div>
  );
}

export default firebaseAuth(Post);