import React from 'react'
import styled from 'styled-components'

import { ShoppingCartOutlined } from "@material-ui/icons"
import { Badge } from '@material-ui/core';

const Container=styled.div`
    height:60px;
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
    position:absolute;
    flex:1;
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
  return (
    <Container>
        <Wrapper>
            <Left>
                <Logo>
                    hit-it
                </Logo>
            </Left>
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