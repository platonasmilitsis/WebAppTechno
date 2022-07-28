import React from 'react'
import styled from 'styled-components'
import { ShoppingCartOutlined } from "@material-ui/icons"
import { Badge } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../Global/SearchBar';

const Container=styled.div`
    display:flex;
    flex-direction:column;
    margin-bottom:20px;
`;

const Wrapper=styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-between;

`;

const LogoContainer=styled.div`
    margin-left:30px;
    margin-top:10px;
`;

const Logo=styled.h1`
    font-weight:900;
    color:#e67e22; 
    font-size:50px;
    cursor:pointer;
    white-space:nowrap;
`;

const RightContainer=styled.div`
    justify-content:space-between;
    display:flex;
    flex-direction:row;
    margin-top:20px;
`;

const Item=styled.div`
    font-size:14px;
    cursor:pointer;
    margin-right:20px;
    white-space:nowrap;
`;

const SearchContainter=styled.div`
    width:100%;
    margin-top:-30px;
    @media screen and (max-width:1000px) and (min-width:950px) {
        margin-top:20px;
        margin-left:0px;
    }
    @media screen and (max-width:951px) and (min-width:900px) {
        margin-top:20px;
        margin-left:-20px;
    }
    @media screen and (max-width:901px) and (min-width:850px) {
        margin-top:20px;
        margin-left:-40px;
    }
    @media screen and (max-width:851px) and (min-width:800px) {
        margin-top:20px;
        margin-left:-60px;
    }
    @media screen and (max-width:801px) and (min-width:750px) {
        margin-top:20px;
        margin-left:-80px;
    }
    @media screen and (max-width:751px) and (min-width:700px) {
        margin-top:20px;
        margin-left:-100px;
    }
    @media screen and (max-width:701px) and (min-width:650px) {
        margin-top:20px;
        margin-left:-120px;
    }
    @media screen and (max-width:651px) and (min-width:600px) {
        margin-top:20px;
        margin-left:-140px;
    }
    @media screen and (max-width:601px) and (min-width:550px) {
        margin-top:20px;
        margin-left:-180px;
    }
    @media screen and (max-width:551px) and (min-width:500px) {
        margin-top:20px;
        margin-left:-200px;
    }
    @media screen and (max-width: 501px) {
        margin-top:20px;
        margin-left:-250px;
    }
`;

const NavBar = () => {

    let navigate=useNavigate();

  return (
    <Container>
        <Wrapper>
            <LogoContainer>
                <Logo onClick={()=>navigate("/home")}>
                    hit-it
                </Logo>
            </LogoContainer>
            <RightContainer>
                <Item>
                    Register
                </Item>
                <Item>
                    Sign In
                </Item>
                <Item>
                    <Badge badgeContent={1} color="primary" overlap="rectangular">
                        <ShoppingCartOutlined/>
                    </Badge>
                </Item>
            </RightContainer>
        </Wrapper>
        <SearchContainter>
            <SearchBar/>
        </SearchContainter>
    </Container>
  )
}

export default NavBar
