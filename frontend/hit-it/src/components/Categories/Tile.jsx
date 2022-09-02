import React from 'react'
import styled from 'styled-components'

const Container=styled.div`
    background-color:white;
    height:500px;
    width:300px;
    border-radius:10px;
    display:flex;
    margin-right:4%;
    margin-top:2%;
    justify-content:center;
    flex-direction:column;
    overflow-anchor: none;
`;


const ImageContainer=styled.div`
    flex:1;
    height:140px;
    width:100%;
    border-radius:10px;
    margin-top:20px;
    display:flex;
    justify-content:center;
    align-items:center;
`;

const Image=styled.img`
    object-fit:cover;
    width:300px;
`;


const Title=styled.h1`
    font-size:18px;
    margin-left:20px;
    margin-top:20px;
    width:90%;
    font-family: 'Arial', sans-serif;
    color:black;
    cursor:pointer;
    margin-bottom:30px;
    overflow-y:scroll;
    &:hover{
        text-decoration:underline;
    }
    height:60px;
`;

const Description=styled.p`
    font-family: 'Arial', sans-serif;
    font-size:15px;
    margin-bottom:10px;
    margin-left:20px;
    width:90%;
    color:black;
    cursor:pointer;
    opacity:0.6;
    overflow-y:scroll;
    &:hover{
        text-decoration:underline;
    }
    height:90px;
`;

const Tile = (id,image,title,description) => {
  return (
    <Container key={title+"?"+id}>
        <ImageContainer>
            <Image src={require("../../assets/"+image)}/>
        </ImageContainer>
        <Title>
            {title}
        </Title>
        <Description>
            {description}
        </Description>
    </Container>
  )
}

export default Tile