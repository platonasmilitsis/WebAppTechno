import React from 'react'
import styled from 'styled-components'
import { ShoppingCartOutlined } from "@material-ui/icons"
import { Badge } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../Global/SearchBar';

const Container=styled.div`
    height:80px;
    position:relative;
`;

const Wrapper=styled.div`
    padding:10px 20px;
    display:flex;
    align-items:center;
    justify-content:space-between;
`;

const Left=styled.div`
    flex:1;
    display:flex;
    align-items:center;
    justify-content:flex-start;
    margin-top:10px;
`;

const Logo=styled.h1`
    font-weight:900;
    color:#e67e22; 
    font-size:50px;
    flex:1;
    margin-left:10px;
    cursor:pointer;
    position:absolute;
    margin-top:30px;
`;

const SearchContainter=styled.div`
    width:100%;
    position:absolute;
    margin-top:50px;
`;

const Right=styled.div`
    flex:1;
    display:flex;
    align-items:center;
    justify-content:flex-end;
    margin-top:30px;
    margin-right:30px;
`;

const MenuItem=styled.div`
    font-size:14px;
    cursor:pointer;
    margin-left:25px;
`;

const NavBar = () => {
    
    let navigate=useNavigate();

  return (
    <Container>
        <Wrapper>
            <Left>
                <Logo onClick={()=>navigate("/home")}>
                    hit-it
                </Logo>
            </Left>
            
            <SearchContainter>
                <SearchBar/>
            </SearchContainter>

            <Right>
                <MenuItem>
                    Register
                </MenuItem>
                <MenuItem>
                    Sign In
                </MenuItem>
                <MenuItem>
                    <Badge badgeContent={1} color="primary" overlap="rectangular">
                        <ShoppingCartOutlined/>
                    </Badge>
                </MenuItem>
            </Right>
        </Wrapper>
    </Container>
  )
}

export default NavBar