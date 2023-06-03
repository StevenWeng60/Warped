import '../../App.css';
import './Post.css';
import Sidebar from '../../components/sidebar/Sidebar.js';
import { useState, useRef } from 'react'
import axios from 'axios'
import withAuth from '../../components/authenticate';

function Post() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [text, setText] = useState('Write a Caption...')

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

  function handleFormSubmit(e){
    e.preventDefault();
    const data = new FormData();

    // Add data to form data to be submitted to server
    data.append("avatar", inputFileRef.current.files[0]);
    data.append("caption", text);
    data.append("username", localStorage.getItem("Username"))
    console.log(text)
    axios.post("http://localhost:3001/upload/singlepost", data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    })
    console.log("ok cool im handling form submit");
  }

  return (
  <div className="App">
    <div className="Body">
      <div className="sidebar">
        <Sidebar/>
      </div>
      <div className="addpost">
        <form className="addpostform" onSubmit={handleFormSubmit} encType="multipart/form-data">
          <div className="postfile-input-container">
            {preview ? (<img src={preview} style={{width: '100%', height: '100%'}}></img>) : (<label htmlFor="postfile-input" className="file-input-label">
              Choose a file
            </label>)}
            <input type="file" id="postfile-input" className="postfile-input" onChange={handleDrop} ref={inputFileRef}/>
          </div>
          <textarea rows="4" cols="50" type="textarea" id="postcaptions" value={text} onChange={handleTextChange}></textarea>
          <button type="submit" >Submit</button>
        </form>
      </div>
    </div>
  </div>
  );
}

export default withAuth(Post);