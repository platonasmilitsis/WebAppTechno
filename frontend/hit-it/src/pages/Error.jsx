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
    align-items:center;
`;

const Logo=styled.h1`
    color:#e67e22; 
    font-weight:900;
    font-size:70px;
    margin-top:200px;
    margin-bottom:50px;
`;

const Description=styled.p`
    font-family: 'Arial', sans-serif;
    font-size:25px;
    font-weight:500;
    @media (max-width: 1000px) {
        width:50%;
        margin-left:50px;
    }
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
    width:30%;
    height:50px;
    color:white;
    font-weight:1000;
    font-size:14px;
    margin-top:40px;
    cursor:pointer;
`;

const FootCont=styled.div`
    width:100%;
    margin-top:240px;
`;

const Error = () => {

    let navigate=useNavigate();

  return (
    <Container>
        <HelmetProvider>
            <Helmet>
                <meta charSet="utf-8" />
                <title>
                    Σελίδα λάθους
                </title>
            </Helmet>
        </HelmetProvider>
        <TextContainer>
            <Logo>
                hit-it
            </Logo>
            <Description>
                Φαίνεται ότι κάτι πήγε στραβά!
            </Description>
            <Description>
                Αυτό ίσως οφείλεται σε πρόβλημα που προσπαθούμε να επιλύσουμε
            </Description>
            <Description>
                Δοκιμάστε ξανά αργότερα
            </Description>
            <Button onClick={()=>navigate("/")}>
                Συνέχεια
            </Button>
        </TextContainer>
        <FootCont>
            <Footer/>
        </FootCont>
    </Container>
  )
}

export default Error