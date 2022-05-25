import React from 'react'
import styled from "styled-components"
import { Helmet, HelmetProvider } from 'react-helmet-async';
import NavBar from '../components/Categories/NavBar';
import Breadcrumb from '../components/Global/Breadcrumb';
import CategoryName from '../components/Categories/CategoryName';
import Grid from '../components/Categories/Grid';


const Container=styled.div`
  background-color:#eaeded; 
`;

const Technology = () => {

  const page_names=["Καλωσοριστική","Αρχική"];
  const page_links=["/","/home"];

  return (
    <Container>
      <HelmetProvider>
        <Helmet>
          <meta charSet="utf-8" />
          <title>
              Τεχνολογία
          </title>
        </Helmet>
      </HelmetProvider>
      <NavBar/>
      <hr></hr>
      {Breadcrumb(page_names,page_links)}
      <hr></hr>
      {CategoryName("Τεχνολογία")}
      <hr></hr>
      <Grid/>
      <hr></hr>
    </Container>
  )
}

export default Technology