import '../../App.css';
import './Profile.css';
import Sidebar from '../../components/sidebar/Sidebar.js';
import Searchbar from '../../components/searchbar/Searchbar.js';
import ProfileTop from './profiletop/ProfileTop.js';
import ProfileBottom from './profilebottom/ProfileBottom.js';

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
      <div className="bottomofprofile">
        <ProfileBottom/>
      </div>
    </div>
  </div>
  );
}

export default Profile;