import './App.css';
import './Profile.css';
import Sidebar from './Sidebar.js';
import Searchbar from './Searchbar.js';
import ProfileTop from './ProfileTop.js';

function Profile() {
  return (
  <div className="App">
    <div className="Body">
      <div className="sidebar">
        <Sidebar/>
      </div>
      <div className="searchbar">
        <Searchbar/>
      </div>
      <div className="topofprofile">
        <ProfileTop/>
      </div>
    </div>
  </div>
  );
}

export default Profile;