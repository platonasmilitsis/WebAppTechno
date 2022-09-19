import React,{useState} from 'react'
import styled from 'styled-components'
import Message from '../Chat/Message';
import AccountModal from '../Global/AccountModal';
import { StopPropagation } from '../Chat/StopPropagation';

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

    const [open,set_open]=useState(false);
    const [name,set_name]=useState(null);

  return (
    <Container>
        <Wrapper>
            <Right>
                <StopPropagation.Provider value={{open,set_open,name,set_name}}>
                    <AccountModal/>
                    {open && <Message/>}
                </StopPropagation.Provider>
            </Right>
        </Wrapper>
    </Container>
  )
}

export default NavBar
