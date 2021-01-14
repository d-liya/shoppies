import styled from "styled-components";
import serachImg from '../images/search.png';

const Search = styled.div`
    display:flex;
    justify-content:center;
    width: 400px;
    position:relative;
    height:35px;
    input{
        width:100%;
        outline:none;   
        background-color:#353536;
        padding:8px 20px;
        color:#C4C8CA;
        border:1px solid #353536;
        border-radius:0.25rem;
        text-indent:20px;
    }
    #icon{
        top:10px;
        left:10px;
        position:absolute;
        opacity:0.5;
    }
    @media (max-width:500px) {
        width:70%;
    }
`;

const SearchBar = ({value,onChange}) => {
    return (
        <Search>
            <img id="icon" src={serachImg} alt="search-logo" />
            <input type="text" value={value} onChange={onChange} placeholder="Start typing to search" />
        </Search>
    )
}
export default SearchBar;