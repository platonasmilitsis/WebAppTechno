import React from 'react'
import styled from 'styled-components'
import { ShoppingCartOutlined } from "@material-ui/icons"
import { Badge } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';

const Container=styled.div`
    height:80px;
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
`;

const SearchContainter=styled.div`
    &:hover{
        border:1px;
        border-style:solid;
        border-color:#e67e22;
    }
    margin-top:10px;
    flex:1;
    display:flex;
    align-items:center;
    justify-content:center;
    width:30%;
    border-radius:25px;
    padding:5px;
    background-color:white;
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

const Right=styled.div`
    flex:1;
    display:flex;
    align-items:center;
    justify-content:flex-end;
    margin-top:10px;
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
                <Input placeholder="γράψε τον όρο αναζήτησης"/>
                <Search style={{color:"#e67e22",fontSize:25}} />
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