import React from 'react'
import NavBar from '../components/NavBar'
// import Announcement from '../components/Announcement'
import Slider from '../components/Slider'
// import Categories from '../components/Categories'
import styled from 'styled-components'
import Main from '../components/Main'

const Container=styled.div`
  background-color:#eaeded; 
`;

const Home = () => {
  return (
    <Container>
        {/* <Announcement/> */}
        <NavBar/>
        <Main/>
        <Slider/>
        {/* <Categories/> */}
    </Container>
  )
}

export default Home
