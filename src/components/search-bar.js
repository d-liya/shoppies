import { BiSearchAlt } from "react-icons/bi";

const SearchBar = (props) => {
  return (
    <div className="search">
      <BiSearchAlt id="icon" />
      <input type="text" {...props} placeholder="Start typing to search" />
    </div>
  );
};
export default SearchBar;
