import React,{useEffect, useState, useMemo} from 'react'
import styled from "styled-components"
import { Helmet, HelmetProvider } from 'react-helmet-async';
// import NavBar from '../../components/Categories/NavBar';
// import Breadcrumb from '../../components/Global/Breadcrumb';
// import CategoryName from '../../components/Categories/CategoryName';
import NavBar from '../components/Categories/NavBar';
import Breadcrumb from '../components/Global/Breadcrumb';
import CategoryName from '../components/Categories/CategoryName';
// import Grid from '../../components/Categories/Grid';
// import Footer from '../../components/Global/Footer';
import Footer from '../components/Global/Footer';
import { useNavigate, useParams } from 'react-router-dom';

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
    cursor:pointer;
    opacity:0.6;
    overflow-y:scroll;
    &:hover{
        text-decoration:underline;
    }
    height:90px;
`;

const Category = () => {

  let navigate=useNavigate();
  const params=useParams();

  const page_names=["Καλωσοριστική","Αρχική"];
  const page_links=["/","/home"];

  const [products,set_products]=useState([]);
  const [page_name,set_page_name]=useState(null);

  const find_page_name=()=>{
    switch(parseInt(params.id)){
      case 1:
        set_page_name("Τεχνολογία");
        break;
      case 2:
        set_page_name("Σπίτι - Κήπος");
        break;
      case 3:
        set_page_name("Μόδα");
        break;
      case 4:
        set_page_name("Hobby - Αθλητισμός");
        break;
      case 5:
        set_page_name("Υγεία - Ομορφιά");
        break;
      case 6:
        set_page_name("Παιδικά - Βρεφικά");
        break;
      case 7:
        set_page_name("Auto - Moto");
        break;
      case 8:
        set_page_name("Επαγγελματικά - B2B");
        break;
      default:
        set_page_name("error")
    }
  }
  useMemo(()=>find_page_name(),[page_name]);

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
  },[])

  return (
    <Container>
      <HelmetProvider>
        <Helmet>
          <meta charSet="utf-8" />
          <title>
              {page_name}
          </title>
        </Helmet>
      </HelmetProvider>
      <NavBar/>
      <BreadcrumbContainer>
          {Breadcrumb(page_names,page_links)}
      </BreadcrumbContainer>
      <CategoryNameContainer>
          {CategoryName(page_name)}
      </CategoryNameContainer>
      <GridContainer>
          {products.map((product)=>{
              return(
                  <ProductContainer key={product.name+"?"+product.id}>
                      <ImageContainer>
                          <Image src={require("../assets/logoreact.png")}/>
                      </ImageContainer>
                      <Title>
                          {product.name}
                      </Title>
                      <Description>
                          {product.description}
                      </Description>
                  </ProductContainer>
              )
          })}
      </GridContainer>
      <Footer/>
    </Container>
  )
}

export default Category