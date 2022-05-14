import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import { useState } from "react";
import styled from "styled-components"
import { slider_items } from "../data";

const Container=styled.div`
    ${'' /* width:100%; */}
    height:30vh;
    display:flex;
    // background-color:coral;
    position:relative;
    overflow:hidden;
    margin-left:170px;
    margin-right:170px;
    margin-top:-200px;
    border-radius:25px;
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
    top:0;
    left:${props=>props.direction==="left" && "10px"};
    right:${props=>props.direction==="right" && "10px"};
    bottom:0;
    margin:auto;
    cursor:pointer;
    opacity:0.5;
    z-index:2;
    margin-top:140px;
`;

const Wrapper=styled.div`
    display:flex;
    transition:all 1.5s ease;
    transform:translateX(${props=>props.slide_index* -1512}px);
`;

const Slide=styled.div`
    width:252px;
    height:30vh;
    display:flex;
    align-items:center;
    border-radius:25px;
    background-color:${props=>props.bg};
`;

const ImgContainer=styled.div`
    height:100%;
    flex:1;
`;

const Image=styled.img`
    height:80%;
    padding:50px;
`;

const Title=styled.h1`
    font-size:40px;
`;

const Description=styled.p`
    margin:50px 0px;
    font-size:20px;
    font-weight:500;
    // letter-spacing:3px;
`;

const Button=styled.button`
    padding:10px;
    font-size:20px;
    // background-color:transparent;
    cursor:pointer;
`;

const InfoContainer=styled.div`
    flex:1;
`;

const Slider = () => {

    const [slide_index,set_slide_index]=useState(0);

    const handle_click=(direction)=>{
        if(direction==="left"){
            // Go to last slide
            set_slide_index(slide_index>0 ? slide_index-1 : 7) 
        }
        else{
            // Go to first slide
            set_slide_index(slide_index<7 ? slide_index+1 :0) 
        }
    }

  return (
    <Container>
        <Arrow direction="left" onClick={()=>handle_click("left")}>
            <ArrowLeftOutlined/>
        </Arrow>
        <Wrapper slide_index={slide_index}>
        
            {slider_items.map(item=>
                <Slide bg={item.bg}>
                <InfoContainer>
                    <Title>
                        {item.title}
                    </Title>
                    <Description>
                        {item.desc}
                    </Description>
                    <Button>
                        Αναζήτηση
                    </Button>
                </InfoContainer>
                </Slide>
            )}
            
        </Wrapper>
        <Arrow direction="right" onClick={()=>handle_click("right")}>
            <ArrowRightOutlined/>
        </Arrow>
    </Container>
  )
}

export default Slider
