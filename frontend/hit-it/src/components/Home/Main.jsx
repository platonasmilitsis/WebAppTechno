import React from 'react'
import styled from 'styled-components'
import SearchBar from '../Global/SearchBar';

const Container=styled.div`
    width:100%;
    height:200px;
    display:flex;
    align-items:center;
    justify-content:center;
    position:relative;
`;

const Logo=styled.h1`
    font-weight:900;
    color:#e67e22; 
    font-size:70px;
    position:absolute;
    margin-bottom:100px;
`;

const SearchContainter=styled.div`
    width:100%;
    margin-top:60px;
`;

const Main = () => {

  return (
    <Container>
        <Logo>
            hit-it
        </Logo>
        <SearchContainter>
            <SearchBar/>
        </SearchContainter>


    </Container>
  )
}

export default Main