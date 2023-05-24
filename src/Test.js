import axios from 'axios'
import { useState } from 'react'
import { Buffer } from 'buffer'

function Test() {
  const [postData, setPostData] = useState(null);

  const grabImageFromMongoDB = async () => {
    axios.get("http://localhost:3001/postmongodb",
    {
      params: {
        id: "646d46d1b7a3f7017aba152b"
      },
      responseType: 'arraybuffer'
    })
    .then(function (response){
      const dataUrl = `data:${response.headers['content-type']};base64,${Buffer.from(response.data, 'binary').toString('base64')}`;
      console.log(response);

      setPostData(dataUrl);

      // Append the <img> element to the document body or any desired container
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return(
    <div>
      <h1>Test</h1>
      <button type="submit" onClick = {grabImageFromMongoDB}>Submit</button>
      {postData && <img src={postData} alt='fudge'/>}
    </div>
  );
}

export default Test;