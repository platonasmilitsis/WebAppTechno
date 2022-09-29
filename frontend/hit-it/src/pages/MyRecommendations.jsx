import React,{useEffect, useState, useMemo} from 'react'
import styled from 'styled-components'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import NavBar from '../components/Categories/NavBar';
import Breadcrumb from '../components/Global/Breadcrumb';
import CategoryName from '../components/Categories/CategoryName';
import Footer from '../components/Global/Footer';
import FloatingButtonAdd from '../components/Home/FloatingButtonAdd';
import { useNavigate } from 'react-router-dom';
import useGetUserByUsername from '../hooks/useGetUserByUsername';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

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
    width:50%;
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

const MyRecommendations = () => {

    let navigate=useNavigate();

    const [user,set_user]=useState(null);
    const floating_button=()=>{set_user(localStorage.getItem('username'));}
    useMemo(()=>floating_button(),[]);

    const axiosPrivate=useAxiosPrivate();
    const get_user_by_username=useGetUserByUsername();

    const page_names=["Αρχική"];
    const page_links=["/home"];

    const [user_id,set_user_id]=useState(null);
    const [user_name,set_user_name]=useState(null);
    const [items,set_items]=useState(null);
    const [items_obj,set_items_obj]=useState([]);
    const [products,set_products] = useState([]);

    
    useEffect(()=>{
        const get_user=async()=>{
            const name=await get_user_by_username(user);
            set_user_id(name.id);
            set_user_name(name.username);
        }
        get_user()
        .catch((error)=>console.error(error));
        
    },[user_id,user_name,user,get_user_by_username])

    useEffect(()=>{
      user_name && axiosPrivate.get(`/items/recommendation/${user_name}`)
      .then((response)=>{
        set_items(response.data);
      })
      .catch((error)=>console.error(error));
    },[user_name,axiosPrivate])
    

    useEffect(()=>{
      var arr=[];
      items?.forEach((element)=>{
        var obj=JSON.parse(`{ "id":${element}}`);
        arr.push(obj);
      })
      set_items_obj(arr);
    },[items])

    useEffect(()=>{
      items_obj?.forEach((element)=>{
        fetch(`http://localhost:8080/items/${element.id}/all`)
        .then((response)=>response.json())
        .then((data)=>{
          if(data.item){
            element['product']=data.item;
            element['category']=data.categories[0];
            if(!products.includes(element)){
                set_products([...products,element]);
            }
          }
        })
        .catch((error)=>console.error(error))
      })
    },[items_obj,products])


    return (
        <Container>
            <HelmetProvider>
            <Helmet>
              <meta charSet="utf-8" />
              <title>
                Προτάσεις
              </title>
            </Helmet>
          </HelmetProvider>
          <NavBar/>
          <BreadcrumbContainer>
              {Breadcrumb(page_names,page_links)}
          </BreadcrumbContainer>
          <CategoryNameContainer>
            {CategoryName("Προτάσεις")}
          </CategoryNameContainer>
          <GridContainer>
            {
                products && products.map((value)=>{
                    return(
                        <ProductContainer key={value.product.name+"?"+value.product.id}>
                          <ImageContainer>
                          <Image src={value.product.img_path?value.product.img_path:require("../assets/logoreact.png")} onClick={()=>navigate(`/home/categories/${value.category.category.id}/${value.category.category}/${value.product.id}`)}/>
                          </ImageContainer>
                          <Title onClick={()=>navigate(`/home/categories/${value.category.category.id}/${value.category.category}/${value.product.id}`)}>
                              {value.product.name}
                          </Title>
                          <Description dangerouslySetInnerHTML={{ __html: value.product?.description }}>
                          </Description>
                      </ProductContainer>
                    )
                })
            }
          </GridContainer>
          {user && <FloatingButtonAdd/>}
          <Footer/>
        </Container>
      )
    }

export default MyRecommendations;