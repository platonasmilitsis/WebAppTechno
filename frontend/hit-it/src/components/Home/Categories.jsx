import React, { useState } from "react";
import styled from "styled-components"
import { slider_items } from "../../data";
import { useNavigate } from 'react-router-dom';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

const Container=styled.div`
    margin-top:100px;
    margin-bottom:50px;
    border-radius:10px;
    display:flex;
    flex-direction:row;
    justify-content:center;
    @media (max-width: 1800px) and (min-width:1001px){
        width:70%;
        margin-left:15%;
        margin-right:15%;
    }
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
    transform:scale(0.9);
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
    width:1360px;
   
`;

const Slide=styled.div`
    min-width:210px;
    min-height:233px;
    display:inline-block;
    align-items:center;
    box-sizing:border-box;
    position:relative;
    border-radius:10px;
    background-color:${props=>props.bg};
    margin:8px;
`;

const Title=styled.h1`
    font-size:15px;
    margin-left:20px;
    font-family: 'Arial', sans-serif;
    color:white;
    cursor:pointer;
    margin-bottom:20px;
    margin-top:30px;
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

const ImageContainer=styled.div`
    display:flex;
    justify-content:center;
    bottom:0px;
    position:absolute;
    margin-left:20px;
    &:hover{
        overflow:hidden;
    }
`;

const Image=styled.img`
    &:hover{
        -webkit-transition: .3s ease-in-out;
	    transition: .3s ease-in-out;
        -webkit-transform: scale(1.1);
	    transform: scale(1.1);
    }
    object-fit:cover;
    cursor:pointer;
`;

const Categories = () => {

    let navigate=useNavigate();
    const [next_arrow,set_next_arrow]=useState(true);
    const [slide_index,set_slide_index]=useState(0)

    const find_overflows=()=> {
        const documentWidth = document.documentElement.offsetWidth;
        var slides=[]
        document.querySelectorAll('*').forEach(element => {
            const box = element.getBoundingClientRect();
    
            if (box.left < 0 || box.right > documentWidth) {
                if(element.id!==""){
                    slides.push(element);
                }
            }
        })
        if(slides.length===1){
            if(parseInt(slides[0].id)===slider_items[0].id){
                set_next_arrow(false);
            }
            else if(parseInt(slides[0].id)===slider_items[slider_items.length-1].id){
                set_next_arrow(false);
            }
            else{
                set_next_arrow(true);
            }
        }
        else{
            const first_overflown=slides.find((element=>{
                return parseInt(element.id)===slider_items[0].id;
            }))
            const last_overflown=slides.find((element=>{
                return parseInt(element.id)===slider_items[slider_items.length-1].id;
            }))
            first_overflown && last_overflown?set_next_arrow(false):set_next_arrow(true);
        }
    }


    const click_prev=()=>{
        document.getElementById('wrapper').scrollLeft-=456;
        set_next_arrow(true);
        set_slide_index(slide_index-1);
    }

    const click_next=()=>{
        document.getElementById('wrapper').scrollLeft+=456;
        find_overflows();
        set_slide_index(slide_index+1);
    }

  return (
    <Container>
        {
        slide_index!==0 &&
            <Arrow direction="left" onClick={click_prev}>
                <KeyboardArrowLeftIcon fontSize="large"/>
                </Arrow>
        }
        <Wrapper id="wrapper">
            {slider_items.map((item)=>
                {return(
                    <Slide id={item.id} key={item.id} bg={item.bg}>
                        <InfoContainer>
                            <Title onClick={()=>navigate(`/home/categories/${item.id}/${item.title}`)}>
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
                        <ImageContainer>
                            <Image src={require("../../assets/"+item.img)} onClick={()=>navigate(`/home/categories/${item.id}/${item.title}`)}/>
                        </ImageContainer>
                    </Slide>
                )}
            )}
            
        </Wrapper>
        {
            next_arrow &&
            <Arrow direction="right" onClick={click_next}>
                <KeyboardArrowRightIcon fontSize="large"/>
            </Arrow>
        }
    </Container>
  )
}

export default Categories
