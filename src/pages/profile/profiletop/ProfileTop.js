import './ProfileTop.css'
import { people } from '../../../utilities/data.js'
import { getImageUrl } from '../../../utilities/utils.js'

function ProfileTop() {

  const chemists = people.filter(person =>
    person.profession === 'chemist'
  );

  return (
    <>
      <div className="profiletop">
        <div className="pfp">
          <img
            src={getImageUrl(chemists[0])}
          />
        </div>
        <div className="pfdescription">
          <div className="pfdescriptionflex">
            <div className="name">
              <h1>{chemists[0].name}</h1>
              <h3>Edit profile</h3>
            </div>
            <div className="followerstats">
              <div className="followerstats2">
                <div className="stats">
                  <h4>0 posts</h4>
                  <h4>0 followers</h4>
                  <h4>0 following</h4>
                </div>
              </div>
              <div className="filler">
                <h3>Edit profile</h3>
              </div>
            </div>
            <div className="bio">
              <p>{chemists[0].accomplishment}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileTop;