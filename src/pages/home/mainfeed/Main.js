import { posts } from '../../../utilities/posts.js'
import { people } from '../../../utilities/data.js'
import { getImageUrl } from '../../../utilities/utils.js'
import { useEffect, useState } from 'react'
import { Buffer } from 'buffer'
import axios from 'axios'
import './Main.css'

function Main() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getMainFeed();
  }, [])

  const getMainFeed = async () => {
    axios.get("http://localhost:3001/mainfeed",
    {
      params: {
        username: localStorage.getItem("Username"),
      }
    }
    )
    .then((response) => {
      console.log(response);

      const postObjects = response.data.map((post) => {
        const postUrl = `data:${post['contentType']};base64,${Buffer.from(post.data, 'binary').toString('base64')}`;

        const avatarUrl = `data:${post.user['avatarContentType']};base64,${Buffer.from(post.user.avatar, 'binary').toString('base64')}`;

        return {
          id: post.user._id,
          username: post.user.username,
          description: post.description,
          postImage: postUrl,
          avatarImage: avatarUrl,
        }
      })

      setPosts(postObjects);

      console.log("route works");
    })
    .catch((error) => {
      console.log(error);
    })
  }


  const listitems = posts.map((post) => {
    return <li>{post.name}</li>
  })

  const chemists = people.filter(person =>
    person.profession === 'chemist'
  );

  return <ul className="mainfeedul">{ 
    posts.map(post =>
    <li key={post.id}>
      <div className="posttop">
        <img
          className="postuserpfp"
          src={post.avatarImage}
          alt={post.username}
        />
        <h4 className="postusername">{post.username}</h4>
      </div>
      <img
        src={post.postImage}
        alt={post.username}
        className="feedimg"
        style= {{height:'70%', width: '100%'}}
      />
      <div className="postbottom">
        <h4>{post.username}</h4>
        <p>{post.description}</p>
      </div>
    </li>
  )
  }
  </ul>
}

export default Main;