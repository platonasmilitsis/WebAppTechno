import React,{useEffect, useState, useMemo} from 'react'
import styled from 'styled-components'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import NavBar from '../components/Categories/NavBar';
import Breadcrumb from '../components/Global/Breadcrumb';
import CategoryName from '../components/Categories/CategoryName';
import Footer from '../components/Global/Footer';
import FloatingButtonAdd from '../components/Home/FloatingButtonAdd';
import { useNavigate } from 'react-router-dom';


const Container=styled.div`
  background-color:#eaeded; 
  position:absolute;
  width:100%;
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

const GridContainer=styled.div`
    font-family: 'Arial', sans-serif;
    display:flex;
    flex-wrap:wrap;
    justify-content:flex-start;
    width:80%;
    margin-left:15%;
    margin-right:auto;
    margin-bottom:3%;
`;

const CategoryContainer=styled.div`
    background-color:white;
    height:400px;
    width:300px;
    border-radius:10px;
    display:flex;
    margin-right:4%;
    margin-top:2%;
    justify-content:center;
    flex-direction:column;
    overflow-anchor: none;
`;


const ImageContainer=styled.div`
    flex:1;
    height:140px;
    width:100%;
    border-radius:10px;
    margin-top:20px;
    display:flex;
    justify-content:center;
    align-items:center;
`;

const Image=styled.img`
    object-fit:cover;
    width:300px;
    cursor:pointer;
`;

const Title=styled.h1`
    font-size:18px;
    margin-left:20px;
    margin-top:20px;
    width:90%;
    font-family: 'Arial', sans-serif;
    color:black;
    cursor:pointer;
    margin-bottom:30px;
    overflow-y:scroll;
    &:hover{
        text-decoration:underline;
    }
    height:60px;
`;

const Categories = () => {

    let navigate=useNavigate();

    const [user,set_user]=useState(null);
    const floating_button=()=>{set_user(localStorage.getItem('username'));}
    useMemo(()=>floating_button(),[]);

    const page_names=["Αρχική"];
    const page_links=["/home"];

    const [categories,set_categories]=useState(null);

    useEffect(()=>{
        fetch(`http://localhost:8080/categories`)
        .then((response)=>response.json())
        .then((data)=>{
            set_categories(data);
        })
        .catch((error)=>console.error(error));
    },[])

  
  return (
    <Container>
        <HelmetProvider>
        <Helmet>
          <meta charSet="utf-8" />
          <title>
            Κατηγορίες Προϊόντων
          </title>
        </Helmet>
      </HelmetProvider>
      <NavBar/>
      <BreadcrumbContainer>
          {Breadcrumb(page_names,page_links)}
      </BreadcrumbContainer>
      <CategoryNameContainer>
        {CategoryName("Κατηγορίες")}
      </CategoryNameContainer>
      <GridContainer>
          {categories?.map((category)=>{
              return(
                  <CategoryContainer key={category.category+"?"+category.id}>
                      <ImageContainer>
                          <Image src={require("../assets/logoreact.png")} onClick={()=>navigate(`/home/categories/${category.id}/${category.category}`)}/>
                      </ImageContainer>
                      <Title onClick={()=>navigate(`/home/categories/${category.id}/${category.category}`)}>
                          {category.category}
                      </Title>
                      
                  </CategoryContainer>
              )
          })}
      </GridContainer>
      {user && <FloatingButtonAdd/>}
      <Footer/>
    </Container>
  )
}

export default Categories