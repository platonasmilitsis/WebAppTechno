import React from 'react'
import styled from "styled-components"
import { Helmet } from 'react-helmet';
import NavBar from '../components/Categories/NavBar';
import Breadcrumb from '../components/Global/Breadcrumb';


const Container=styled.div`
  background-color:#eaeded; 

`;

const Technology = () => {


  const page_names=["Καλωσοριστική","Αρχική"];
  const page_links=["/","/home"];

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
    {Breadcrumb(page_names,page_links)}
    <hr></hr>

    </Container>
  )
}

export default Technology