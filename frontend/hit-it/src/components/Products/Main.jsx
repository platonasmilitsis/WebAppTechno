import React from 'react'
import styled from 'styled-components'

const Container=styled.div`
  background-color:white;
  margin-top:1%;
  display:flex;
  flex-direction:row;
  justify-content:space-around;
  @media (max-width: 1000px) {
    flex-wrap:wrap;
    overflow:hidden;
  }
`;

const ImageContainer=styled.div`
  width:96%; 
  max-width:960px;
  margin:0 auto; 
  min-width:600px;
  @media (max-width: 1000px) {
    margin-left:50%;
  }
`;

const Image=styled.img`
  width:50%;
  height: auto;
`;

const TextContainer=styled.div`
  display:flex;
  flex-direction:column;
  @media (max-width: 1000px) {
    margin-left:25%;
  }
`;

const Title=styled.h1`
  font-family: 'Arial', sans-serif;
  font-size:25px;
  font-weight:500;
  width:50%;
  margin-top:10%;
`;

const Description=styled.h2`
  font-family: 'Arial', sans-serif;
  font-size:15px;
  font-weight:300;
  width:65%;
  margin-top:5%;
  opacity:0.6;

`;

const Main = (id,image,title,description) => {
  return (
    <Container>
        <ImageContainer>
            <Image src={require("../../assets/"+image)}/>
        </ImageContainer>
        <TextContainer>
          <Title>
            {"Ulefone Power Armor 14 Dual SIM (4GB/64GB) Ανθεκτικό Smartphone Black"}
          </Title>
          <Description>
            {"Αδιάβροχο κι ανθεκτικό σε σκληρή χρήση και χτυπήματα. Ασύρματη φόρτιση 15W "+
             "κι ενσύρματη 18W. FM ραδιόφωνο που λειτουργεί χωρίς τη χρήση ακουστικών."}
          </Description>
        </TextContainer>
    </Container>
  )
}

export default Main