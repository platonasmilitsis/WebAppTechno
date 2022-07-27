// import React from 'react'
// import styled from 'styled-components'
// import { useNavigate } from 'react-router-dom';
// import { Helmet, HelmetProvider } from 'react-helmet-async';
// import Footer from '../components/Global/Footer';


// const Container=styled.div`
//     background-color:#eaeded; 
//     width:100%;
//     height:1000px;
//     display:flex;
//     align-items:center;
//     justify-content:center;
//     position:relative;
//     -drag: none;
//     user-select: none;
//     -moz-user-select: none;
//     -webkit-user-drag: none;
//     -webkit-user-select: none;
//     -ms-user-select: none;
// `;

// const Logo=styled.h1`
//     font-weight:900;
//     color:#e67e22; 
//     font-size:70px;
//     position:absolute;
//     margin-bottom:350px;
//     margin-right:800px;
// `;



// const Description=styled.p`
//     font-size:25px;
//     font-family: 'Arial', sans-serif;
//     margin-top:80px;
//     font-weight:500;
//     margin-right:650px;
//     margin-bottom:200px;
//     position:absolute;
//     width:450px;
// `;

// const Button=styled.button`
//     font-family: 'Arial', sans-serif;
//     position:absolute;
//     height:50px;
//     background-color:#e67e22;
//     border-radius:10px;
//     border:none;
//     &:hover{
//         border:2px;
//         border-style:solid;
//         border-color:grey;
//     }
//     margin-left:900px;
//     margin-top:350px;
//     font-weight:700;
// `;

// const FooterCont=styled.div`
//     position:absolute;
//     bottom:0;
//     width:100%;
// `;

// const Welcome = () => {
//     let navigate=useNavigate();
//   return (
//     <Container>
//         <HelmetProvider>
//             <Helmet>
//                 <meta charSet="utf-8" />
//                 <title>
//                     Καλωσοριστική
//                 </title>
//             </Helmet>
//         </HelmetProvider>

//         <Logo>
//             hit-it
//         </Logo>
//         <Description>
//             Ότι θες θα το βρεις στο hit-it
//         </Description>
//         <Button onClick={()=>navigate("/home")}>
//             Συνέχεια σαν επισκέπτης
//         </Button>
//         <FooterCont>
//             <Footer/>
//         </FooterCont>
//     </Container>
//   )
// }

// export default Welcome

import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const Container=styled.div`
    background-color:#eaeded; 
    width:100%;
    display:flex;
    flex-direction:row;
    justify-content:space-around;
    @media (max-width: 1000px) {
    flex-wrap:wrap;
    overflow:hidden;
  }
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

`;

const Description=styled.p`
    font-family: 'Arial', sans-serif;
    font-size:25px;
    font-weight:500;
`;

const LoginContainer=styled.div`
    display:flex;
    flex-direction:column;
`;

const Login=styled.button`
    background-color:white;
    height:380px;
    width:380px;
    margin-top:120px;
    margin-bottom:50px;
    border-radius:10px;
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
    margin-left:100px;
    margin-bottom:100px;
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
        </TextContainer>
        <LoginContainer>
            <Login>
                LOGIN COMPONENT
            </Login>
            <Button onClick={()=>navigate("/home")}>
                Συνέχεια σαν επισκέπτης
            </Button>
        </LoginContainer>
    </Container>
  )
}

export default Welcome