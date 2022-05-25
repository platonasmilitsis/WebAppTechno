import React from 'react'
import styled from "styled-components"
import { Helmet } from 'react-helmet';
import NavBar from '../components/Categories/NavBar';
import { Breadcrumbs, Link} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';


const Container=styled.div`
  background-color:#eaeded; 

`;

const Breadcrumb=styled.h1`
  flex:1;
  display:flex;
  align-items:center;
  justify-content:flex-start;
  margin-top:30px;
  margin-left:30px;
  opacity:0.6;
  cursor:pointer;
`;

const Technology = () => {

  let navigate=useNavigate();

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

    <Breadcrumb>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
      <Link underline="hover" color="inherit" onClick={()=>navigate("/")}>
          Καλωσοριστική
      </Link>
      <Link underline="hover" color="inherit" onClick={()=>navigate("/home")}>
          Αρχική
      </Link>
      </Breadcrumbs>
    </Breadcrumb>
    
  
    <hr></hr>

    </Container>
  )
}

export default Technology