import "./Sidebar.css"

function Sidebar() {
  return (
    <div className="Sidebar">
      <div className="websiteTitle">
        <h1>Warped</h1>
      </div>
      <ul className="sidebarOptions">
        <li>
          <h2>Profile</h2>
        </li>
        <li>
          <h2>Home</h2>
        </li>
        <li>
          <h2>Messages</h2>
        </li>
        <li>
          <h2>Post</h2>
        </li>
        <li>
          <h2>Warp</h2>
        </li>
      </ul>
      <h1>Sidebar here bro</h1>
    </div>
  );
}

export default Sidebar;