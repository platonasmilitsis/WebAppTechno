import React,{useState,useMemo} from 'react'
import NavBar from '../components/Home/NavBar'
import Categories from '../components/Home/Categories'
import styled from 'styled-components'
import Main from '../components/Home/Main'
import Announcement from '../components/Home/Announcement'
import Footer from '../components/Global/Footer'
import FloatingButtonAdd from '../components/Home/FloatingButtonAdd'
import {Helmet, HelmetProvider} from "react-helmet-async";
import AdminAnnouncement from '../components/Home/AdminAnnouncement'

const Container=styled.div`
  background-color:#eaeded; 
  position:absolute;
  width:100%;
`;

const Home = () => {
  const [user,set_user]=useState(null);
  const [is_admin,set_is_admin]=useState(false);
  const floating_button=()=>{
    set_user(localStorage.getItem('username'));
    set_is_admin(localStorage.getItem('roles')?.includes("ADMIN"));
  }
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
      {is_admin && <AdminAnnouncement/>}
      {user && <FloatingButtonAdd/>}
      <Categories/>
      <Footer/>
    </Container>

)
}

export default Home
