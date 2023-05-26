import './Searchresults.css'

function Searchresults({ data }) {
  console.log(data);
  return (
    <div className="searchresults-container">
      {data}
    </div>
  );
}

export default Searchresults;