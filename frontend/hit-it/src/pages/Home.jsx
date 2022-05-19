import React from 'react'
import NavBar from '../components/NavBar'
import Categories from '../components/Categories'
import styled from 'styled-components'
import Main from '../components/Main'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import FloatingButtonAdd from '../components/FloatingButtonAdd'
const Container=styled.div`
  background-color:#eaeded; 
`;


const Home = () => {
  return (

    <Container>
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
