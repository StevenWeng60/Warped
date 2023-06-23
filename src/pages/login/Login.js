import './Login.css';
import { Link, Route, Routes, useNavigate } from "react-router-dom"
import { useRef, useState} from 'react'
import axios from 'axios'
import { auth, googleProvider} from '../../config/firebase-config'
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth'

function Login() {
  const [errorPopup, setErrorPopup] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();
  const routeChange = () => {
    const path = "/";
    navigate(path);
  }

  async function userLogin(e) {
    // Prevent default form action
    e.preventDefault();
    setErrorPopup(false);
    

    let authenticated = false;

    try {
      await signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)

      axios.get("http://localhost:3001/getUser", {
        params: {
          email: emailRef.current.value,
        }
      })
      .then ((response) => {
        const user = response.data;
        localStorage.setItem('Username', user.username);
        localStorage.setItem('Id', user._id);
        localStorage.setItem('avatarURL', user.avatarURL);
        // navigate to home page after successful authentication
        routeChange();
      })
    }
    catch (error) {
      setErrorPopup(true);
      console.error(error);
    }
  }

  const signInWithGoogle = async (e) => {
    e.preventDefault();
    setErrorPopup(false);
    let authenticated = false;
    try {
      await signInWithPopup(auth, googleProvider);
      
    }
    catch (e) {
      console.error(e);
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
            <input type="text" id="email" name="email" placeholder="Enter your email" ref= {emailRef}/>
          </div>
          <div className="login-form">
            <input type="password" id="password" name="password" placeholder="Enter your password" ref = {passwordRef}/>
          </div>
          <button type="submit" id="loginbtn">Login</button>
          {/* <button type="submit" id="googleloginbtn" onClick={signInWithGoogle}>Sign In With Google</button> */}
        </form>
        <Link to="/create" className="link">
          <h2>Create account</h2>
        </Link>
        {errorPopup && (<h2 style={{color: "red"}}>Incorrect email or password!</h2>)}
      </div>
    </div>
  );
}

export default Login;