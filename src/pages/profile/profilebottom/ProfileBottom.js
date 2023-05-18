import './ProfileBottom.css'
import { people } from '../../../utilities/data.js'
import { getImageUrl } from '../../../utilities/utils.js'

function ProfileBottom() {
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