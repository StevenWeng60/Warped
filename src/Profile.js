import './App.css';
import Sidebar from './Sidebar.js';
import Searchbar from './Searchbar.js';
import FriendIcons from './FriendIcons.js';
import Main from './Main.js';

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
    </div>
  </div>
  );
}

export default Profile;