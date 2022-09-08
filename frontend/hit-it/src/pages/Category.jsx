import React,{useEffect, useState, useMemo} from 'react'
import styled from "styled-components"
import { Helmet, HelmetProvider } from 'react-helmet-async';
import NavBar from '../components/Categories/NavBar';
import Breadcrumb from '../components/Global/Breadcrumb';
import CategoryName from '../components/Categories/CategoryName';
import Footer from '../components/Global/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import FloatingButtonAdd from '../components/Home/FloatingButtonAdd';

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

const ProductContainer=styled.div`
    background-color:white;
    height:500px;
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

const Description=styled.p`
    font-family: 'Arial', sans-serif;
    font-size:15px;
    margin-bottom:10px;
    margin-left:20px;
    width:90%;
    color:black;
    opacity:0.6;
    overflow-y:scroll;
    height:90px;
`;

const Category = () => {

  let navigate=useNavigate();
  const params=useParams();

  const page_names=["Αρχική"];
  const page_links=["/home"];

  const [products,set_products]=useState([]);

  const [user,set_user]=useState(null);
  const floating_button=()=>{set_user(localStorage.getItem('username'));}
  useMemo(()=>floating_button(),[]);

  useEffect(() => {
    fetch(`http://localhost:8080/categories/${params.id}/items`)
      .then((response)=>response.json())
      .then((data)=>{
        var data_products=[];
        data.forEach((element)=>{
            data_products.push(element);
        })
        set_products(data_products);
      })
      .catch((error)=>{
        console.error(error);
        navigate("/error");
      })
  },[navigate,params.id])

  return (
    <Container>
      <HelmetProvider>
        <Helmet>
          <meta charSet="utf-8" />
          <title>
              {params.name}
          </title>
        </Helmet>
      </HelmetProvider>
      <NavBar/>
      <BreadcrumbContainer>
          {Breadcrumb(page_names,page_links)}
      </BreadcrumbContainer>
      <CategoryNameContainer>
          {CategoryName(params.name)}
      </CategoryNameContainer>
      <GridContainer>
          {products.map((product)=>{
              return(
                  <ProductContainer key={product.name+"?"+product.id}>
                      <ImageContainer>
                          <Image src={require("../assets/logoreact.png")} onClick={()=>navigate(`/home/categories/${params.id}/${params.name}/${product.id}`)}/>
                      </ImageContainer>
                      <Title onClick={()=>navigate(`/home/categories/${params.id}/${params.name}/${product.id}`)}>
                          {product.name}
                      </Title>
                      <Description>
                          {product.description}
                      </Description>
                  </ProductContainer>
              )
          })}
      </GridContainer>
      {user && <FloatingButtonAdd/>}
      <Footer/>
    </Container>
  )
}

export default Category