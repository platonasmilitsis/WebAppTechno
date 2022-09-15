import React, { useState } from 'react'
import styled from 'styled-components'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useCloseModal from '../../hooks/useCloseModal';

const Container=styled.div`
    height:60px;
    -drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
`;

const Wrapper=styled.div`
    padding:10px 20px;
    display:flex;
    align-items:center;
    justify-content:space-between;
`;

const Right=styled.div`
    flex:1;
    display:flex;
    align-items:center;
    justify-content:flex-end;
    margin-top:10px;
    @media (max-width: 1000px) {
        justify-content:flex-end;
    }
`;

const MenuItem=styled.div`
    cursor:pointer;
    margin-left:25px;
    @media (max-width: 1000px) {
        margin:0 auto;
    }
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
    cursor:pointer;
`;

const NavBar = () => {
    const axiosPrivate = useAxiosPrivate();
    let navigate=useNavigate();

    const [user_clicked,set_user_clicked]=useState(false);

    const logout=async()=>{
        localStorage.clear();
        navigate("/");
    }

    const profile=()=>{
        axiosPrivate.get("/users")
        .then((res) => console.log(res.data))
        .catch((error)=>{
            console.error(error);
        })
    }

    let ref=useCloseModal(()=>{
        set_user_clicked(false);
    });

    const display=()=>{
        const username=localStorage.getItem("username");
        return(
            username?
                <AccountContainer ref={ref}>
                    <IconContainer>
                    <AccountBoxIcon fontSize='large' onClick={()=>set_user_clicked(!user_clicked)}/>
                    </IconContainer>
                    {!user_clicked?
                        <UserName>
                            {username}
                        </UserName>:
                        <UserInfoContainer>
                            <UserInfo onClick={profile}>
                                Προφίλ
                            </UserInfo>
                            <UserInfo onClick={logout}>
                                Αποσύνδεση
                            </UserInfo>
                        </UserInfoContainer>}
                </AccountContainer>:
                <>
                <MenuItem onClick={()=>navigate("/register")}>
                    Register
                </MenuItem>
                <MenuItem onClick={()=>navigate("/")}>
                    Sign In
                </MenuItem>
            </>
        )
    }

  return (
    <Container>
        <Wrapper>
            <Right>
                {display()}
            </Right>
        </Wrapper>
    </Container>
  )
}

export default NavBar
