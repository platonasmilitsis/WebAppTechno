import React from 'react'
import NavBar from '../components/NavBar'
import Slider from '../components/Categories'
import styled from 'styled-components'
import Main from '../components/Main'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'

const Container=styled.div`
  background-color:#eaeded; 
`;

const Home = () => {
  return (
    <Container>
        <NavBar/>
        <Main/>
        <Announcement/>
        <Slider/>
        <Footer/>
    </Container>
  )
}

export default Home
