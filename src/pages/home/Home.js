import '../../App.css';
import './Home.css';
import Sidebar from '../../components/sidebar/Sidebar.js';
import FriendIcons from './friendicons/FriendIcons.js';
import Main from './mainfeed/Main.js';
import withAuth from '../../components/authenticate';

function Home() {
  return (
  <div className="App">
    <div className="Body">
      <div className="sidebar">
        <Sidebar/>
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

export default withAuth(Home);
