import React,{useState,useMemo} from 'react'
import NavBar from '../components/Home/NavBar'
import Categories from '../components/Home/Categories'
import styled from 'styled-components'
import Main from '../components/Home/Main'
import Announcement from '../components/Home/Announcement'
import Footer from '../components/Global/Footer'
import FloatingButtonAdd from '../components/Home/FloatingButtonAdd'
import {Helmet, HelmetProvider} from "react-helmet-async";
import { useNavigate } from 'react-router-dom'

const Container=styled.div`
  background-color:#eaeded; 
  position:absolute;
  width:100%;
`;

const AllCategoriesContainer=styled.div`
  margin-left:15%;
  margin-right:15%;
  width:70%;
  display:flex;
  justify-content:flex-start;
  margin-top:40px;
  position:absolute;
  @media (max-width: 1000px) and (min-width:600px){
    width:90%;
    margin-left:5%;
    margin-right:5%;
  }
  @media screen and (max-width: 601px){
    width:100%;
    margin-left:0;
    margin-right:0;
  }
`;

const AllCategories=styled.p`
  font-family: 'Arial', sans-serif;
  font-size:20px;
  font-weight:500;
  cursor:pointer;
`;

const Home = () => {
  const [user,set_user]=useState(null);
  const floating_button=()=>{set_user(localStorage.getItem('username'));}
  useMemo(()=>floating_button(),[]);

  let navigate=useNavigate();

  return (
    <Container>
      <HelmetProvider>
        <Helmet>
          <meta charSet="utf-8" />
          <title>
            Σπίτι
          </title>
        </Helmet>
      </HelmetProvider>
      <NavBar/>
      <Main/>
      <Announcement/>
      {user && <FloatingButtonAdd/>}
      <AllCategoriesContainer>
      <AllCategories onClick={()=>navigate("/home/categories")}>
        Κατηγορίες Προϊόντων
      </AllCategories>
      </AllCategoriesContainer>
      <Categories/>
      <Footer/>
    </Container>

)
}

export default Home
