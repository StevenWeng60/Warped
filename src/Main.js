import { posts } from './posts.js'
import { people } from './data.js'
import { getImageUrl } from './utils.js'
import './Main.css'

function Main() {
  const listitems = posts.map((post) => {
    return <li>{post.name}</li>
  })

  const chemists = people.filter(person =>
    person.profession === 'chemist'
  );

  const listitems2 = people.map(person =>
    <li key={person.id}>
      <div className="posttop">
        <img
          className="postuserpfp"
          src={getImageUrl(person)}
          alt={person.name}
        />
        <h4 className="postusername">{person.name}</h4>
      </div>
      <img
        src={getImageUrl(person)}
        alt={person.name}
        className="feedimg"
        style= {{height:'70%', width: '100%'}}
      />
      <div classname="postbottom">
        <h4>{person.name}</h4>
        <p>{person.accomplishment}</p>
      </div>
    </li>
  );

  return <ul className="mainfeedul">{listitems2}</ul>
}

export default Main;