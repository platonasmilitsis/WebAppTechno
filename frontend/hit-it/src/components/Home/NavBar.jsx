import React,{useState,useEffect,useRef} from 'react'
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

const MessengerContainer=styled.div`
    overflow-x:scroll;
    position:fixed;
    margin-right:100px;
    bottom:0;
    z-index:3;
    display:flex;
    flex:1;
    flex-direction:row;
    width:1530px;
    justify-content:safe flex-end;
    flex-flow:row nowrap;
    @media (max-width: 1000px) {
        width:307px;
    }
`;

const NavBar = () => {

    const [clicked_name,set_clicked_name]=useState([]);

    const ScrollEnd=()=> {
        const el=useRef();
        useEffect(()=>el.current.scrollIntoView());
        return <div ref={el}/>;
      };

  return (
    <Container>
        <Wrapper>
            <Right>
                <StopPropagation.Provider value={{clicked_name,set_clicked_name}}>
                    <AccountModal/>
                    <MessengerContainer>
                        {
                            clicked_name?.map((value)=>{
                                return(
                                    value && clicked_name.includes(value) &&
                                        <div key={value}>
                                        <Message name={value}/>
                                        <ScrollEnd/>
                                        </div>
                                )
                            })
                        }
                    </MessengerContainer>
                </StopPropagation.Provider>
            </Right>
        </Wrapper>
    </Container>
  )
}

export default NavBar
