import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import SearchBar from '../Global/SearchBar';
import AccountModal from '../Global/AccountModal';

const Container=styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    flex-wrap:wrap;
    /* Heights because results from search move the whole screen, 
    to not give absolute positioning that will cause more problems */
    height:60px;
    @media screen and (max-width: 1077px) and (min-width:650px) {
        height:180px;
    }
    @media (max-width:651px){
        height:160px;
    }
`;

const LogoContainer=styled.div`
    margin-left:30px;
    margin-top:30px;
    margin-right:60px;
    @media (max-width: 1000px) {
        margin-top:10px;
    }
`;

const Logo=styled.h1`
    font-weight:900;
    color:#e67e22; 
    font-size:50px;
    cursor:pointer;
    white-space:nowrap;
`;

const SearchContainter=styled.div`
    margin-top:50px;
    display:flex;
    @media (max-width: 1077px) {
        order:3;
        @media screen and (max-width:1077px) and (min-width:1000px){
            margin-left:200px;
        }
        @media screen and (max-width:1000px) and (min-width:950px){
            margin-left:150px;
        }
        @media screen and (max-width:950px) and (min-width:850px){
            margin-left:100px;
        }
        @media screen and (max-width:850px) and (min-width:750px){
            margin-left:70px;
        }
        @media screen and (max-width:750px) and (min-width:700px){
            margin-left:40px;
        }
        @media screen and (max-width:700px) and (min-width:660px){
            margin-left:15px;
        }
        @media screen and (max-width:660px) and (min-width:650px){
            margin-left:10px;
        }
        @media screen and (max-width:650px) and (min-width:600px){ 
            margin-left:100px;
        }
        @media screen and (max-width:600px) and (min-width:550px){
            margin-left:70px;
        }
        @media screen and (max-width:550px) and (min-width:500px){
            margin-left:50px;
        }
        @media (max-width:500px){
            margin-left:20px;
        }
  }
    
`;

const RightContainer=styled.div`
    justify-content:space-between;
    display:flex;
    flex-direction:row;
    margin-top:30px;
    @media (max-width: 1077px) {
        order:2;
    }
    margin-left:60px;
`;

const AccountModalContainer=styled.div`
    position:absolute;
    margin-left:-100px;
    margin-top:-50px;
`;

const NavBar = () => {

    let navigate=useNavigate();

  return (
    <Container>
        <LogoContainer>
            <Logo onClick={()=>navigate("/home")}>
                hit-it
            </Logo>
        </LogoContainer>
        <SearchContainter>
            <SearchBar/>
        </SearchContainter>
        <RightContainer>
            <AccountModalContainer>
                <AccountModal/>
            </AccountModalContainer>
        </RightContainer>
    </Container>
  )
}

export default NavBar
