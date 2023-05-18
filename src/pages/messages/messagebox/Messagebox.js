import './Messagebox.css'
import MSearchbar from './msearchbar/MSearchbar';
import { people } from '../../../utilities/data';
import { getImageUrl } from '../../../utilities/utils';

function Messagebox() {
  const listitems2 = people.map(person =>
    <li key={person.id}>
      <div className="messagefriends">
        <img
          className="messagefpfp"
          src={getImageUrl(person)}
          alt={person.name}
        />
        <h4 className="fusername">{person.name}</h4>
      </div>
    </li>
  );

  return (
    <>
      <div className="messagecontainer">
        <div className="messagesidebar">
          <MSearchbar/>
          <ul className="mfriendslist">
            {listitems2}
          </ul>
        </div>
        <div className="messagechat">
          <div className="mchattop">
            <div className="messagefriends">
              <img
                className="messagefpfp"
                src={getImageUrl(people[0])}
                alt={listitems2[0].name}
              />
              <h4 className="fusername">{people[0].name}</h4>
            </div>
          </div>
          <div className="mchatmid">
              <div className="messagebubble">
                <img
                  className="messagefpfp"
                  src={getImageUrl(people[0])}
                  alt={people[0].name}
                />
                <div className='actualmessage'>asdfkjsad;ljfsadlfas
                  <p>I'm baby stumptown hashtag farm-to-table tbh, mustache cronut enamel pin. Chambray XOXO biodiesel freegan pop-up taxidermy marfa shaman 8-bit direct trade tacos keytar unicorn la croix tumblr. Deep v truffaut cliche, thundercats 3 wolf moon trust fund pop-up squid franzen sriracha shabby chic locavore slow-carb. Skateboard edison bulb sus tousled, af sartorial 8-bit small batch bitters stumptown vibecession.
                  Asymmetrical vexillologist poutine tumeric swag Brooklyn. Migas succulents chia yuccie activated charcoal narwhal church-key hexagon blog listicle big mood. Tousled taxidermy lumbersexual, tofu mustache bruh coloring book palo santo tbh paleo prism etsy art party next level meh. Roof party drinking vinegar irony food truck snackwave.
                  </p>
                </div>
              </div>
          </div>
          <div className="mchatbottom">
            <form className="submitmessagef">
              <input type="text"></input>
              <button type="submit">send</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Messagebox;