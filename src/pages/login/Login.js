import './Login.css';
import { Link, Route, Routes, useNavigate } from "react-router-dom"
import { useRef, useState} from 'react'
import axios from 'axios'

function Login() {
  const [errorPopup, setErrorPopup] = useState(false);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();
  const routeChange = () => {
    const path = "/";
    navigate(path);
  }

  function userLogin(e) {
    try{
      // Prevent default form action
      e.preventDefault();
      setErrorPopup(false);
      
      console.log(usernameRef.current.value);
      console.log(passwordRef.current.value);

      let authenticated = false;

      axios.post("http://localhost:3001/login", {
        username: usernameRef.current.value,
        password: passwordRef.current.value
      })
      .then (function (response) {
        if (response.data !== "Not allowed"){
          localStorage.setItem('accessToken', response.data.accessToken);
          localStorage.setItem('Username', usernameRef.current.value);
          localStorage.setItem('Id', response.data.id);
          // navigate to home page after successful authentication
          routeChange();
        }
        else {
          setErrorPopup(true);
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
    <div className="loginpage">
      <div className="logincontainer">
        <div className="warped">
          <h1>Warped</h1>
        </div>
        <form onSubmit={userLogin}>
          <div className="login-form">
            <input type="text" id="username" name="username" placeholder="Enter your username" ref= {usernameRef}/>
          </div>
          <div className="login-form">
            <input type="password" id="password" name="password" placeholder="Enter your password" ref = {passwordRef}/>
          </div>
          <button type="submit" id="loginbtn">Login</button>
        </form>
        <h2>Forgot password?</h2>
        <Link to="/create" className="link">
          <h2>Create account</h2>
        </Link>
        {errorPopup && (<h2 style={{color: "red"}}>Incorrect username or password!</h2>)}
      </div>
    </div>
  );
}

export default Login;