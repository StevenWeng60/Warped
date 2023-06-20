import './CreateAcc.css'
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { auth, googleProvider, storage} from '../../config/firebase-config' 
import { ref, getDownloadURL } from 'firebase/storage'
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import axios from 'axios';

function CreateAcc() {
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [success, setSuccess] = useState(false);
  const [resultValue, setResultValue] = useState(null);

  const navigate = useNavigate();

  async function createAccount(e) {
    // Prevent default form action
    e.preventDefault();

    // Make sure there are no empty fields
    if (usernameRef.current.value == '' || passwordRef.current.value == '' || emailRef.current.value == '') {
      return
    }
    try{
      const imageURL = `projectFiles/default.jpg`;
      const downloadURL = await getDownloadURL(ref(storage, imageURL));
      axios.post("http://localhost:3001/create", {
        defaultURL: downloadURL,
        username: usernameRef.current.value,
        password: passwordRef.current.value,
        email: emailRef.current.value,
      })
      .then (async function (response) {
        console.log(response);
        if(response.data !== "Username taken"){
          await createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value);
          localStorage.setItem('accessToken', response.data.accessToken);
          localStorage.setItem('Username', usernameRef.current.value);
          setResultValue(<h2 style={{color: 'green'}}>Success! Redirecting you to login page</h2>);
          setSuccess(true);
          setTimeout(() =>{
            const path = "/login";
            navigate(path);
          }, 2000)
        }
        else {
          setSuccess(true);
          setResultValue(<h2 style={{color: 'red'}}>Username taken</h2>)
        } 
      })
      .catch (function (error) {
        console.log(error);
      })
    }
    catch {
      console.log("error", e);
    }
  }

  return(
    <div className="createpage">
      <div className="createcontainer">
        <div className="warped">
          <h1>Warped</h1>
        </div>
        <form className="createaccount" onSubmit={createAccount}>
          <div className="create-form">
            <input type="text" id="email" name="email" placeholder="Enter your email" ref={emailRef}/>
          </div>
          <div className="create-form">
            <input type="text" id="username" name="username" placeholder="Enter your username" ref={usernameRef}/>
          </div>
          <div className="create-form">
            <input type="password" id="password" name="password" placeholder="Enter your password" ref={passwordRef}/>
          </div>
          <button type="submit" id="createbtn">Create Account</button>
        </form>
        <h2>Forgot password?</h2>
        <Link to="/login" className="link">
          <h2>Log in</h2>
        </Link>
        { success && resultValue}
      </div>
    </div>
  );
}

export default CreateAcc;