import './App.css';
import Sidebar from './Sidebar.js';
import Searchbar from './Searchbar.js';
import FriendIcons from './FriendIcons.js';
import Main from './Main.js';

function App() {
  return (
    <div className="App">
      <div className="Body">
        <div className="searchbar">
          <Searchbar/>
        </div>
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

export default App;
