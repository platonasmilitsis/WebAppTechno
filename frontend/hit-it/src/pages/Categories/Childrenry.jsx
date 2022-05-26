import React from 'react'
import styled from "styled-components"
import { Helmet, HelmetProvider } from 'react-helmet-async';
import NavBar from '../../components/Categories/NavBar';
import Breadcrumb from '../../components/Global/Breadcrumb';
import CategoryName from '../../components/Categories/CategoryName';
import Grid from '../../components/Categories/Grid';

const Container=styled.div`
  background-color:#eaeded; 
`;

const Childrenry = () => {

    const page_names=["Καλωσοριστική","Αρχική"];
    const page_links=["/","/home"];
    const images=["logoreact.png","logoreact.png","logoreact.png","logoreact.png","logoreact.png","logoreact.png",
                  "logoreact.png","logoreact.png","logoreact.png","logoreact.png","logoreact.png","logoreact.png"];
    const titles=["titlos","titlos","titlos","titlos","titlos","titlos",
                    "titlos","titlos","titlos","titlos","titlos","titlos"];
    const descriptions=["perigrafi","perigrafi","perigrafi","perigrafi","perigrafi","perigrafi",
                          "perigrafi","perigrafi","perigrafi","perigrafi","perigrafi","perigrafi"];

  return (
    <Container>
      <HelmetProvider>
        <Helmet>
          <meta charSet="utf-8" />
          <title>
              Παιδικά - Βρεφικά
          </title>
        </Helmet>
      </HelmetProvider>
      <NavBar/>
      {Breadcrumb(page_names,page_links)}
      {CategoryName("Παιδικά - Βρεφικά")}
      {Grid(images,titles,descriptions)}
    </Container>
  )
}

export default Childrenry