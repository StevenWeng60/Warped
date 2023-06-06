import './Searchresults.css'

function Searchresults({ data, searchClicked }) {
  console.log(data);
  console.log(searchClicked);
  return (
    <div className="searchresults-container">
      {data.length !== 0
      ? data
      : (searchClicked 
        ? (<h1 style={{textAlign: 'center'}}>No results</h1>)
        : (<h1 style={{textAlign: 'center'}}>Began searching</h1>)
        )
      }
    </div>
  );
}

export default Searchresults;