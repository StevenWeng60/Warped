import './FriendIcons.css'
import { people } from './data.js';
import { getImageUrl } from './utils.js';

function FriendIcons() {
  const listItems = people.map(person =>
    <li key={person.id}>
      <img
        src={getImageUrl(person)}
        alt={person.name}
      />
    </li>
  );
  return <ul className="friendsul">{listItems}</ul>;
}

export default FriendIcons;