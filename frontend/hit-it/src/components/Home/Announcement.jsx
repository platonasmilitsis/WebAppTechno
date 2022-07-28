import React from 'react'
import styled from 'styled-components'

const Container=styled.div`
  background-color:#e67e22;
  height:300px;
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
`;

const TextContainer=styled.div`
  display:flex;
  flex-direction:column;
  row-gap:20px;
  margin-top:90px;
  margin-left:30px;
  @media screen and (max-width: 1000px) and (min-width:600px){
    margin-top:80px;
  }
  @media screen and (max-width: 601px){
    margin-top:35px;
  }
`;

const Title=styled.h1`
  font-family: 'Arial', sans-serif;
  font-size:33px;
  @media (max-width: 1000px) {
    font-size:28px;
  }
`;

const Description=styled.h2`
  font-family: 'Arial', sans-serif;
  font-size:17px;
  width:80%;
  @media (max-width: 1000px) {
    font-size:15px;
  }
`;

const ImageContainer=styled.div`
  height:300px;
  width:300px;
`;

const Image=styled.img`
  height:300px;
  width:300px;
`;

const Announcement = () => {
  return (
    <Container>
      <TextContainer>
        <Title>
        Ήρθαν τα hit-it Point
        </Title>
        <Description>
        Τώρα μπορείς να παραλάβεις την παραγγελία σου, όποτε σε βολεύει!
        </Description>
      </TextContainer>
      <ImageContainer>
        <Image src={require("../../assets/logoreact.png")}/>
      </ImageContainer>
    </Container>
  )
}

export default Announcement
