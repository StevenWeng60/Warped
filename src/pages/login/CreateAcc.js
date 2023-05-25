import './CreateAcc.css'
import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

function CreateAcc() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();

  function createAccount(e) {
    try{
      // Prevent default form action
      e.preventDefault();
      
      console.log(usernameRef.current.value);
      console.log(passwordRef.current.value);
      
      axios.post("http://localhost:3001/create", {
        username: usernameRef.current.value,
        password: passwordRef.current.value
      })
      .then (function (response) {
        console.log(response);
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('Username', usernameRef.current.value);
        const path = "/";
        navigate(path);
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
      </div>
    </div>
  );
}

export default CreateAcc;