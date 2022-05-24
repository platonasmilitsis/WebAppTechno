import React from 'react'
import NavBar from '../components/NavBar'
import Categories from '../components/Categories'
import styled from 'styled-components'
import Main from '../components/Main'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import FloatingButtonAdd from '../components/FloatingButtonAdd'
import {Helmet} from "react-helmet";


const Container=styled.div`
  background-color:#eaeded; 
`;


const Home = () => {
  return (

    <Container>

      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Σπίτι
        </title>
      </Helmet>

        <NavBar/>

        <Main/>

        <Announcement/>
        <FloatingButtonAdd/>

        <Categories/>
        <Footer/>
    </Container>

)
}

export default Home
