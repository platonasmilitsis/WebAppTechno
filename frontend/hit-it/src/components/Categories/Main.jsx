import React from 'react'
import styled from 'styled-components'
import { Search } from '@material-ui/icons';

const Container=styled.div`
    width:100%;
    display:flex;
    align-items:center;
    justify-content:flex-start;
    position:relative;
`;

const Logo=styled.h1`
    font-weight:900;
    color:#e67e22; 
    font-size:50px;
    position:absolute;
    margin-top:-60px;
    margin-right:1500px;
    margin-left:100px;
    flex:1;
    white-space:nowrap;
`;

const SearchContainter=styled.div`
    &:hover{
        border:1px;
        border-style:solid;
        border-color:#e67e22;
    }
    display:flex;
    align-items:center;
    width:30%;
    border-radius:25px;
    padding:5px;
    position:absolute;
    background-color:white;
    margin-top:-60px;
    margin-left:650px;
`;

const Input=styled.input`
    width:100%;
    border-width:0px;
    outline:none;    
    font-size:16px;
    ::placeholder{
        opacity:0.1;
    }
`;

const Main = () => {
  return (
    <Container>
        <Logo>
            hit-it
        </Logo>
        <SearchContainter>
            <Input placeholder="γράψε τον όρο αναζήτησης"/>
            <Search style={{color:"#e67e22",fontSize:25}} />
        </SearchContainter>
    </Container>
  )
}

export default Main