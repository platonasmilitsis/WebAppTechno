import React from 'react'
import styled from "styled-components"
import { Helmet, HelmetProvider } from 'react-helmet-async';
import NavBar from '../../components/Categories/NavBar';
import Breadcrumb from '../../components/Global/Breadcrumb';
import CategoryName from '../../components/Categories/CategoryName';
import Grid from '../../components/Categories/Grid';
import Footer from '../../components/Global/Footer';

const Container=styled.div`
  background-color:#eaeded; 
  position:absolute;
`;

const BreadcrumbContainer=styled.div`
  position:absolute;
  margin-top:40px;
  @media (max-width: 1077px){
    margin-top:0px;
  }
`;

const CategoryNameContainer=styled.div`
  margin-top:140px;
  @media (max-width: 1077px){
    margin-top:80px;
  }
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
      <BreadcrumbContainer>
        {Breadcrumb(page_names,page_links)}
      </BreadcrumbContainer>
      <CategoryNameContainer>
        {CategoryName("Παιδικά - Βρεφικά")}
      </CategoryNameContainer>
      {Grid(images,titles,descriptions)}
      <Footer/>
    </Container>
  )
}

export default Childrenry