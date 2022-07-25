import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Footer from '../components/Global/Footer';


const Container=styled.div`
    background-color:#eaeded; 
    width:100%;
    height:1000px;
    display:flex;
    align-items:center;
    justify-content:center;
    position:relative;
    -drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
`;

const Logo=styled.h1`
    font-weight:900;
    color:#e67e22; 
    font-size:70px;
    position:absolute;
    margin-bottom:350px;
    margin-right:800px;
`;



const Description=styled.p`
    font-size:25px;
    font-family: 'Arial', sans-serif;
    margin-top:80px;
    font-weight:500;
    margin-right:650px;
    margin-bottom:200px;
    position:absolute;
    width:450px;
`;

const Button=styled.button`
    font-family: 'Arial', sans-serif;
    position:absolute;
    height:50px;
    background-color:#e67e22;
    border-radius:10px;
    border:none;
    &:hover{
        border:2px;
        border-style:solid;
        border-color:grey;
    }
    margin-left:900px;
    margin-top:350px;
    font-weight:700;
`;

const FooterCont=styled.div`
    position:absolute;
    bottom:0;
    width:100%;
`;

const Welcome = () => {
    let navigate=useNavigate();
  return (
    <Container>
        <HelmetProvider>
            <Helmet>
                <meta charSet="utf-8" />
                <title>
                    Καλωσοριστική
                </title>
            </Helmet>
        </HelmetProvider>

        <Logo>
            hit-it
        </Logo>
        <Description>
            Ότι θες θα το βρεις στο hit-it
        </Description>
        <Button onClick={()=>navigate("/home")}>
            Συνέχεια σαν επισκέπτης
        </Button>
        <FooterCont>
            <Footer/>
        </FooterCont>
    </Container>
  )
}

export default Welcome