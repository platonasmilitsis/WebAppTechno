import React from 'react'
import styled from 'styled-components'
import { ShoppingCartOutlined } from "@material-ui/icons"
import { Badge } from '@material-ui/core';

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
        justify-content:center;
    }
`;

const MenuItem=styled.div`
    font-size:14px;
    cursor:pointer;
    margin-left:25px;
    @media (max-width: 1000px) {
        margin:0 auto;
    }
`;

const NavBar = () => {
  return (
    <Container>
        <Wrapper>
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
