import React from "react";
import styled from "styled-components"
import { slider_items } from "../../data";
import { useNavigate } from 'react-router-dom';
import Navigate from "../Global/Navigate";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

const Container=styled.div`
    height:250px;
    margin-top:100px;
    margin-bottom:50px;
    border-radius:10px;
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    width:70%;
    margin-left:15%;
    margin-right:15%;
    @media (max-width: 1000px) and (min-width:600px){
        width:90%;
        margin-left:5%;
        margin-right:5%;
    }
    @media screen and (max-width: 601px){
        width:100%;
        margin-left:0;
        margin-right:0;
  }
  overflow:hidden;

`;

const Arrow=styled.div`
    width:50px;
    height:50px;
    background-color:#fff7f7;
    border-radius:50%;
    display:flex;
    align-items:center;
    justify-content:center;
    position:absolute;
    left:${props=>props.direction==="left" && "10px"};
    right:${props=>props.direction==="right" && "10px"};
    margin-right:13%;
    margin-left:13%;
    cursor:pointer;
    opacity:0.6;
    z-index:2;
    margin-top:110px;
    @media only screen and (max-width: 1250px) {
        display:none;
    }
`;

const Wrapper=styled.div`
    display:flex;
    overflow-y:hidden;
    overflow-x:scroll;
    scroll-behavior:smooth;

    @media only screen and (min-width: 1250px) {
        -webkit-scrollbar {
            display: none;
        }
        -ms-overflow-style: none;
        scrollbar-width: none;  
    }
   
`;

const Slide=styled.div`
    min-width:213px;
    min-height:25vh;
    display:flex;
    align-items:center;
    border-radius:10px;
    background-color:${props=>props.bg};
    margin:6px;
`;

const Title=styled.h1`
    font-size:15px;
    margin-left:20px;
    font-family: 'Arial', sans-serif;
    color:white;
    cursor:pointer;
    margin-bottom:20px;
    &:hover{
        text-decoration:underline;
    }
`;

const Description=styled.p`
    font-family: 'Arial', sans-serif;
    font-size:15px;
    margin-bottom:10px;
    margin-left:20px;
    margin-right:20px;
    color:white;
    cursor:pointer;
    width: 160px;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
    &:hover{
        text-decoration:underline;
        white-space:normal;
    }
`;

const InfoContainer=styled.div`
    flex:1;
`;

const Categories = () => {

    let navigate=useNavigate();

    const click_prev=()=>{
        document.getElementById('wrapper').scrollLeft=-456;
    }

    const click_next=()=>{
        document.getElementById('wrapper').scrollLeft+=456;
    }

  return (
    <Container>
        <Arrow direction="left" onClick={click_prev}>
            <KeyboardArrowLeftIcon fontSize="large"/>
            </Arrow>
        <Wrapper id="wrapper">
        
            {slider_items.map((item)=>
                {return(
                    <Slide key={item.id} bg={item.bg}>
                        <InfoContainer>
                            <Title onClick={()=>navigate(Navigate(item.title))}>
                                {item.title}
                            </Title>
                            <Description>
                                {item.desc1}
                            </Description>
                            <Description>
                                {item.desc2}
                            </Description>
                            <Description>
                                {item.desc3}
                            </Description>
                        </InfoContainer>
                    </Slide>
                )}
            )}
            
        </Wrapper>
        <Arrow direction="right" onClick={click_next}>
            <KeyboardArrowRightIcon fontSize="large"/>
            </Arrow>
    </Container>
  )
}

export default Categories

