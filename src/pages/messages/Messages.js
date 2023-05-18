import '../../App.css';
import './Messages.css'
import Sidebar from '../../components/sidebar/Sidebar.js';
import Searchbar from '../../components/searchbar/Searchbar.js';

function Messages() {
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

export default Messages;