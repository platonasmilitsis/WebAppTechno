import React,{useState,useMemo} from 'react'
import NavBar from '../components/Home/NavBar'
import Categories from '../components/Home/Categories'
import styled from 'styled-components'
import Main from '../components/Home/Main'
import Announcement from '../components/Home/Announcement'
import Footer from '../components/Global/Footer'
import FloatingButtonAdd from '../components/Home/FloatingButtonAdd'
import {Helmet, HelmetProvider} from "react-helmet-async";
import { useNavigate } from 'react-router-dom'
import Recommendations from '../components/Home/Recommendations'

const Container=styled.div`
  background-color:#eaeded; 
  position:absolute;
  width:100%;
`;

const TitlesContainer=styled.div`
  margin-left:15%;
  margin-right:15%;
  width:70%;
  display:flex;
  justify-content:flex-start;
  margin-top:40px;
  position:absolute;
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

const Titles=styled.p`
  font-family: 'Arial', sans-serif;
  font-size:20px;
  font-weight:500;
  cursor:pointer;
`;

const FootCont=styled.div`
    margin-top:100px;
    width:100%;
`;

const Home = () => {
  const [user,set_user]=useState(null);
  const floating_button=()=>{set_user(localStorage.getItem('username'));}
  useMemo(()=>floating_button(),[]);

  let navigate=useNavigate();

  return (
    <Container>
      <HelmetProvider>
        <Helmet>
          <meta charSet="utf-8" />
          <title>
            Σπίτι
          </title>
        </Helmet>
      </HelmetProvider>
      <NavBar/>
      <Main/>
      <Announcement/>
      {user && <FloatingButtonAdd/>}
      <TitlesContainer>
      <Titles onClick={()=>navigate("/home/categories")}>
        Κατηγορίες Προϊόντων
      </Titles>
      </TitlesContainer>
      <Categories/>
      <TitlesContainer>
      <Titles style={{'cursor':"default"}}>
        Προτεινόμενα Προϊόντα
      </Titles>
      </TitlesContainer>
      <Recommendations/>
      <FootCont>
        <Footer/>
      </FootCont>
    </Container>

)
}

export default Home
