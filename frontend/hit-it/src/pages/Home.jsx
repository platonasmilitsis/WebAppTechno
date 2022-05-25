import React from 'react'
import NavBar from '../components/Home/NavBar'
import Categories from '../components/Home/Categories'
import styled from 'styled-components'
import Main from '../components/Home/Main'
import Announcement from '../components/Home/Announcement'
import Footer from '../components/Global/Footer'
import FloatingButtonAdd from '../components/Home/FloatingButtonAdd'
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
