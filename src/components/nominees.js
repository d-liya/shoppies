import Button from "./button";

const NomineeList = ({ results, onRemove }) => (
  <div className="m-container">
    <h4>Nominations {results ? `${results.length}/5` : ""}</h4>
    {Array.isArray(results) &&
      results.map((el) => {
        return (
          <div className="search-result" key={el.imdbID}>
            <p>
              {el.Title} ({el.Year})
            </p>
            <Button
              bgColor="#252525"
              color="#2CA1C0"
              onClick={() => onRemove(el)}
              value="Remove"
            />
          </div>
        );
      })}
  </div>
);
export default NomineeList;
