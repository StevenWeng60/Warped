import '../../App.css';
import Sidebar from '../../components/sidebar/Sidebar.js';
import Searchbar from '../../components/searchbar/Searchbar.js';
import FriendIcons from './friendicons/FriendIcons.js';
import Main from './mainfeed/Main.js';

function Home() {
  return (
  <div className="App">
    <div className="Body">
      <div className="sidebar">
        <Sidebar/>
      </div>
      <div className="searchbar">
        <Searchbar/>
      </div>
      <div className="friendicons">
        <FriendIcons/>
      </div>
      <div className="mainfeed">
        <Main/>
      </div>
    </div>
  </div>
  );
}

export default Home;
