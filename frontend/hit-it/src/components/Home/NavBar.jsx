import React from 'react'
import styled from 'styled-components'
import AccountModal from '../Global/AccountModal';

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

const NavBar = () => {

  return (
    <Container>
        <Wrapper>
            <Right>
                <AccountModal/>
            </Right>
        </Wrapper>
    </Container>
  )
}

export default NavBar
