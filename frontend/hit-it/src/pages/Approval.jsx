import React from 'react'
import styled from 'styled-components'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Footer from '../components/Global/Footer';
import { useNavigate } from 'react-router-dom';


const Container=styled.div`
    background-color:#eaeded; 
    width:100%;
    display:flex;
    flex-direction:row;
    justify-content:space-around;
    position:absolute;
    flex-wrap:wrap;
    overflow:hidden;
    -drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
`;

const TextContainer=styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
`;

const Logo=styled.h1`
    color:#e67e22; 
    font-weight:900;
    font-size:70px;
    margin-top:200px;

`;

const Description=styled.p`
    font-family: 'Arial', sans-serif;
    font-size:25px;
    font-weight:500;
    margin-top:30px;
`;

const Button=styled.button`
    font-family: 'Arial', sans-serif;
    background-color:#e67e22;
    &:hover{
        border:2px;
        border-style:solid;
        border-color:grey;
    }
    height:50px;
    border-radius:10px;
    border:none;
    font-weight:700;
    width:50%;
    margin-top:50px;
    cursor:pointer;
`;

const FootCont=styled.div`
    width:100%;
    margin-top:311px;
`;

const Approval = () => {
    
    let navigate=useNavigate();

  return (
    <Container>
        <HelmetProvider>
            <Helmet>
                <meta charSet="utf-8" />
                <title>
                    Αναμονή έγκρισης
                </title>
            </Helmet>
        </HelmetProvider>
        <TextContainer>
            <Logo>
                hit-it
            </Logo>
            <Description>
                Αναμένεται έγκριση από τον διαχειριστή!
            </Description>
            <Button onClick={()=>navigate("/home")}>
                Συνέχεια σαν επισκέπτης
            </Button>
        </TextContainer>
        <FootCont>
            <Footer/>
        </FootCont>
    </Container>
  )
}

export default Approval