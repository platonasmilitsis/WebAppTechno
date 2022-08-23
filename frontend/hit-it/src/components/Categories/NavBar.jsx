import React, {useState} from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import SearchBar from '../Global/SearchBar';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

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
    margin-top:60px;
    display:flex;
    @media (max-width: 1077px) {
        order:3;
        margin-top:-30px;
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

const ItemContainer=styled.div`
    height:130px;
    display:flex;
    flex-direction:row;
    @media (max-width: 1000px) {
        height:80px;
    }
`;

const Item=styled.div`
    cursor:pointer;
    margin-right:20px;
    white-space:nowrap;
    font-size:16px;
    font-weight:normal;
`;

const AccountContainer=styled.div`
    position:relative;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    height:130px;
    width:150px;
    @media (max-width: 1000px) {
        width:100px;
        margin-top:-20px;
    }
`;

const UserName=styled.h1`
    font-family: 'Arial', sans-serif;
    font-size:18px;
    font-weight:normal;
    top:40px;
    position:absolute;
    @media (max-width: 1000px) {
        font-size:16px;
        top:35px;
    }
`;

const IconContainer=styled.div`
    position:absolute;
    top:0;
    cursor:pointer;
    transform:scale(1.3);
    @media (max-width: 1000px) {
        transform:scale(1);
    }
`;

const UserInfoContainer=styled.div`
    display:flex;
    flex-direction:column;
    border-radius:5px;
    height:70px;
    width:120px;
    position:absolute;
    text-align:center;
    position:relative;
    margin-top:8px;
    background-color:#7f8c8d;
    @media (max-width: 1000px) {
        width:100px;
        margin-top:2px;
    }
`;

const UserInfo=styled.p`
    font-family: 'Arial', sans-serif;
    font-size:16px;
    margin-top:10px;
    @media (max-width: 1000px) {
        font-size:14px;
        margin-bottom:8px;
    }
`;

const NavBar = () => {

    const [user_clicked,set_user_clicked]=useState(false);

    const display_user=()=>{
        set_user_clicked(true);
        if(user_clicked){
            // Close it on second click
            set_user_clicked(false);
        }
    }

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
            {/* <ItemContainer>
            <Item>
                Register
            </Item>
            <Item>
                Sign In
            </Item>
            </ItemContainer> */}

            <AccountContainer>
                <IconContainer>
                <AccountBoxIcon fontSize='large' onClick={display_user}/>
                </IconContainer>
                {!user_clicked &&
                    <UserName>
                        dberos
                    </UserName>}
                {user_clicked &&
                    <UserInfoContainer>
                        <UserInfo>
                            Προφίλ
                        </UserInfo>
                        <UserInfo>
                            Αποσύνδεση
                        </UserInfo>
                    </UserInfoContainer>}
            </AccountContainer>
        </RightContainer>
    </Container>
  )
}

export default NavBar
