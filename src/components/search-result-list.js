import Button from "./button";
import MovieListContainer from "./movie-list-container";

const SearchResultsList = ({results,onNominate,searchVal}) => (
    <MovieListContainer>
        {searchVal ?<h4>Results for "{searchVal}"</h4> : <h4>Search Results</h4>}
        {Array.isArray(results) && results.map((el,i) => {
            return (
                (i < 6) && <div className='search-result' key={el.imdbID}>
                    <p>{el.Title} ({el.Year})</p>
                    <Button
                        bgColor={el.added ? '#3B737E' : ''}
                        disable={el.added}
                        value={el.added ? "Nominated" :"Nominate"} 
                        onClick={() => onNominate(el)} />
                </div>
            )
        })}
    </MovieListContainer>
)
export default SearchResultsList;