import React,{useState,useMemo} from 'react'
import NavBar from '../components/Home/NavBar'
import Categories from '../components/Home/Categories'
import styled from 'styled-components'
import Main from '../components/Home/Main'
import Announcement from '../components/Home/Announcement'
import Footer from '../components/Global/Footer'
import FloatingButtonAdd from '../components/Home/FloatingButtonAdd'
import {Helmet, HelmetProvider} from "react-helmet-async";

const Container=styled.div`
  background-color:#eaeded; 
  position:absolute;
  width:100%;
`;

const Home = () => {
  const [user,set_user]=useState(null);
  const floating_button=()=>{set_user(localStorage.getItem('username'));}
  useMemo(()=>floating_button(),[]);

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
      <Categories/>
      <Footer/>
    </Container>

)
}

export default Home
