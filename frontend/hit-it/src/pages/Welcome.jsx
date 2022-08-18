import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Footer from '../components/Global/Footer';
import Login from '../components/Global/Login';
import CookieConsent from "react-cookie-consent";


const Container=styled.div`
    background-color:#eaeded; 
    width:100%;
    display:flex;
    flex-direction:row;
    justify-content:space-around;
    flex-wrap:wrap;
    overflow:hidden;
    position:absolute;
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
`;

const Logo=styled.h1`
    color:#e67e22; 
    font-weight:900;
    font-size:70px;
    margin-top:200px;
    margin-left:65px;

`;

const Description=styled.p`
    font-family: 'Arial', sans-serif;
    font-size:25px;
    font-weight:500;
`;

const LoginContainer=styled.div`
    margin-top:140px;
    margin-bottom:50px;
    border:2px;
    border-style:solid;
    border-color:#e67e22;
    border-radius:10px;
`;

const Button=styled.button`
    font-family: 'Arial', sans-serif;
    background-color:#e67e22;
    &:hover{
        border:2px;
        border-style:solid;
        border-color:grey;
        box-sizing:border-box;
    }
    border-radius:10px;
    border:none;
    width:100%;
    height:50px;
    color:white;
    font-weight:1000;
    font-size:14px;
    margin-top:40px;
    cursor:pointer;
`;

const FootCont=styled.div`
    margin-top:160px;
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
        <TextContainer>
            <Logo>
                hit-it
            </Logo>
            <Description>
            Ότι θες θα το βρεις στο hit-it
            </Description>
            <Button onClick={()=>navigate("/home")}>
                Συνέχεια σαν επισκέπτης
            </Button>
        </TextContainer>
        <LoginContainer>
            <Login/>
        </LoginContainer>
        <FootCont>
            <CookieConsent debug={true} style={{background:'#eaeded', color:"black", fontFamily:'Arial'}} buttonStyle={{background:"#e67e22"}} buttonText="Συμφωνώ" expires={365}>
                    <p>
                        Η ιστοσελίδα χρησιμοποιεί 
                        <span style={{fontSize:'1.1rem' , fontWeight:'bold'}}> cookies</span>
                        .
                    </p>
            </CookieConsent>
            <Footer/>
        </FootCont>
    </Container>
  )
}

export default Welcome