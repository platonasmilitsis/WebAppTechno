import React from 'react'
import styled from 'styled-components'
import SearchBar from '../Global/SearchBar';

const Container=styled.div`
    width:100%;
    height:200px;
    display:flex;
    align-items:center;
    flex-direction:column;
`;

const Logo=styled.h1`
    font-weight:900;
    color:#e67e22; 
    font-size:70px;
    -drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
`;

const SearchContainter=styled.div`
    margin-top:30px;
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