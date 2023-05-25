import './ProfileBottom.css'
import { people } from '../../../utilities/data.js'
import { getImageUrl } from '../../../utilities/utils.js'

function ProfileBottom() {
  // let posts = []

  //   function getPosts() {
  //   axios.post("http://localhost:3001/friendicons",{
  //     username: localStorage.getItem("Username")
  //   })
  //   .then(function (response) {
  //     console.log(response);
  //     friends = response.data.friends;
  //     console.log(friends);
  //   })
  //   .catch((error) =>{
  //     console.log(error);
  //   })
  // }
  // getPosts();

  const chemists = people.filter(person =>
    person.profession === 'chemist'
  );



  return (
  <div className="postflexcontainer">
    <div className="post">
      <img
        src={getImageUrl(chemists[0])}
      />
    </div>
    <div className="post">
      <img
        src={getImageUrl(chemists[0])}
      />
    </div>
    <div className="post">
      <img
        src={getImageUrl(chemists[0])}
      />
    </div>
    <div className="post">
      <img
        src={getImageUrl(chemists[0])}
      />
    </div>
    <div className="post">
      <img
        src={getImageUrl(chemists[0])}
      />
    </div>
    <div className="post">
      <img
        src={getImageUrl(chemists[0])}
      />
    </div>
  </div>
  );
}

export default ProfileBottom;