import '../../App.css';
import './Messages.css'
import Sidebar from '../../components/sidebar/Sidebar.js';
import Searchbar from '../../components/searchbar/Searchbar.js';
import Messagebox from './messagebox/Messagebox.js'

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
      <div className="messagesbox">
        <Messagebox/>
      </div>
    </div>
  </div>
  );
}

export default Messages;