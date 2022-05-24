import { ArrowLeftOutlined, ArrowRightOutlined} from "@material-ui/icons";
import { useState } from "react";
import styled from "styled-components"
import { slider_items } from "../data";
import { useNavigate } from 'react-router-dom';

const Container=styled.div`
    height:40vh;
    display:flex;
    position:relative;
    overflow:hidden;
    margin-left:285px;
    margin-right:285px;
    margin-top:100px;
    border-radius:25px;
    max-width:1275px;
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
    margin-top:110px;
`;

const Wrapper=styled.div`
    display:flex;
    transition:all 1.5s ease;
    transform:translateX(${props=>props.slide_index* -422}px);
`;

const Slide=styled.div`
    width:200px;
    height:25vh;
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

    const [slide_index,set_slide_index]=useState(0);

    const handle_click=(direction)=>{
        if(direction==="left"){
            set_slide_index(slide_index-1) 
        }
        else{
            set_slide_index(slide_index+1) 
        }
    }

    const handle_title=(title)=>{
        if(title==="Τεχνολογία"){
            navigate("/home/technology");
        }
    }

  return (
    <Container>
        {(() => {
            if(slide_index===1 || slide_index===2){
                return(
                <Arrow direction="left" onClick={()=>handle_click("left")}>
                    <ArrowLeftOutlined/>
                </Arrow>
                )
            }
            return null;
        })()}
        <Wrapper slide_index={slide_index}>
        
            {slider_items.map((item)=>
                {return(
                    <Slide key={item.id} bg={item.bg}>
                        <InfoContainer>
                            <Title onClick={()=>handle_title(item.title)}>
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
        {(() => {
            if(window.innerWidth<1800){
                if(slide_index===0 || slide_index===1){
                    return(
                    <Arrow direction="right" onClick={()=>handle_click("right")}>
                        <ArrowRightOutlined/>
                    </Arrow>
                    )
                }
                return null;
            }
            else{
                if(slide_index===0){
                    return(
                    <Arrow direction="right" onClick={()=>handle_click("right")}>
                        <ArrowRightOutlined/>
                    </Arrow>
                    )
                }
                return null;
            }
            
        })()}
    </Container>
  )
}

export default Categories
