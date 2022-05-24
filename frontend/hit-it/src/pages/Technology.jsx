import React from 'react'
import styled from "styled-components"
import { Helmet } from 'react-helmet';
import Main from '../components/Categories/Main';
import NavBar from '../components/Global/NavBar';

const Container=styled.div`
  background-color:#eaeded; 

`;

const Technology = () => {
  return (
    <Container>

      <Helmet>
        <meta charSet="utf-8" />
        <title>
            Τεχνολογία
        </title>
    </Helmet>

    <NavBar>

    </NavBar>
    <hr></hr>
    <Main>
    </Main>
    <hr></hr>

    </Container>
  )
}

export default Technology