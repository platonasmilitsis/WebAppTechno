import React from 'react'
import styled from 'styled-components'

const Container=styled.div`
    background-color:white;
    height:300px;
    width:200px;
    border-radius:10px;
    margin-left:10px;
`;


const ImageContainer=styled.div`
    flex:1;
    height:200px;
    width:200px;
    background-color:red;
    border-radius:10px;
    margin-top:20px;
`;

const Image=styled.img`
    object-fit:cover;
    height:200px;
    width:200px;
`;


const Title=styled.h1`
    font-size:15px;
    margin-left:20px;
    font-family: 'Arial', sans-serif;
    color:black;
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
    color:black;
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

const Tile = () => {
  return (
    <Container>
    <hr></hr>
        <ImageContainer>
            <Image src={require("../../assets/logoreact.png")}/>
        </ImageContainer>
        <hr></hr>
        <Title>
            titlos
        </Title>
        <Description>
            perigrafi
        </Description>
    </Container>
  )
}

export default Tile