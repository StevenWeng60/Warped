import './CreateAcc.css'
import { useRef } from 'react';
import axios from 'axios';

function CreateAcc() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

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
      </div>
    </div>
  );
}

export default CreateAcc;