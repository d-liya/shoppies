import styled from "styled-components";

const Container = styled.div`
    margin:10px 20px;
    padding:30px;
    height:350px;
    width:350px;
    background-color:#353536;
    border:1px solid #353536;
    border-radius:0.2rem;
    overflow-y:auto;

    ::-webkit-scrollbar-track {
        background-color: #353536;
    }
    ::-webkit-scrollbar {
        width: 10px;
        background-color: #353536;
    }
    ::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background-color: #252525;
    }
    .search-result{
        display:flex;
        font-size:0.8rem;
        align-items:center;
        justify-content:space-between;
    }
    @media (max-width:500px) {
        width:70%;
    }
`;

const MovieListContainer = (props) => (
    <Container>
        {props.children}
    </Container>
)
export default MovieListContainer;