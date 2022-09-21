import React, {useState, useEffect, useRef} from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import SearchBar from '../Global/SearchBar';
import AccountModal from '../Global/AccountModal';
import { StopPropagation } from '../Chat/StopPropagation';
import Message from '../Chat/Message';

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

const MessengerContainer=styled.div`
    overflow-x:scroll;
    position:fixed;
    bottom:0;
    z-index:3;
    display:flex;
    flex:1;
    flex-direction:row;
    width:80%;
    margin-left:10%;
    margin-right:10%;
    justify-content:safe flex-end;
    flex-flow:row nowrap;
    @media (max-width: 1000px) {
        width:307px;
    }
`;

const NavBar = () => {

    let navigate=useNavigate();

    const [clicked_name,set_clicked_name]=useState([]);

    const ScrollEnd=()=> {
        const el=useRef();
        useEffect(()=>el.current.scrollIntoView());
        return <div ref={el}/>;
      };


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
        <StopPropagation.Provider value={{clicked_name,set_clicked_name}}>
        <RightContainer>
            <AccountModalContainer>
                <AccountModal/>
            </AccountModalContainer>
        </RightContainer>
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
    </Container>
  )
}

export default NavBar
