import React,{useEffect, useState, useMemo} from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import useGetUserByUsername from '../../hooks/useGetUserByUsername';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const Container=styled.div`
    margin-top:100px;
    margin-bottom:50px;
    border-radius:10px;
    display:flex;
    flex-direction:row;
    justify-content:center;
    @media (max-width: 1800px) and (min-width:1001px){
        width:70%;
        margin-left:15%;
        margin-right:15%;
    }
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
  overflow:hidden;
`;

const GridContainer=styled.div`
    display:flex;
    overflow-y:hidden;
    overflow-x:scroll;
    scroll-behavior:smooth;
    width:1360px;
`;

const ProductContainer=styled.div`
    background-color:white;
    min-height:300px;
    min-width:210px;
    border-radius:10px;
    display:flex;
    margin:8px;
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
    width:${props=>props.has_link?"40%":"70%"};
    cursor:pointer;
`;


const Title=styled.h1`
    font-size:14px;
    margin-left:20px;
    margin-top:10px;
    width:80%;
    font-family: 'Arial', sans-serif;
    color:black;
    cursor:pointer;
    margin-bottom:10px;
    overflow-y:scroll;
    &:hover{
        text-decoration:underline;
    }
    height:60px;
`;

const Description=styled.p`
    font-family: 'Arial', sans-serif;
    font-size:14px;
    margin-top:20px;
    margin-bottom:10px;
    margin-left:20px;
    width:90%;
    color:black;
    opacity:0.6;
    overflow-y:scroll;
    cursor:pointer;
    &:hover{
        text-decoration:underline;
    }
`;

const Recommendations = () => {
    let navigate=useNavigate();

    const [user,set_user]=useState(null);
    const floating_button=()=>{set_user(localStorage.getItem('username'));}
    useMemo(()=>floating_button(),[]);
  
    const axiosPrivate=useAxiosPrivate();
    const get_user_by_username=useGetUserByUsername();
  
    const [user_id,set_user_id]=useState(null);
    const [products,set_products] = useState([]);
        
    useEffect(()=>{
        const get_user=async()=>{
            if(user){
                const name=await get_user_by_username(user);
                set_user_id(name.id);
            }
            else{
                set_user_id(-1);
            }
        }
        get_user()
        .catch(()=>{});        
    },[user,get_user_by_username])
  
    useEffect(()=>{
        const my_visited=JSON.parse(localStorage.getItem("visited") || "[]");
        const visit={
            "visited":my_visited,
        }
    if(user_id===-1){
        user_id && fetch(`http://localhost:8080/items/recommendation`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(visit),
            })
        .then((response)=>response.json())
        .then((data)=>{
            set_products(data);
        })
          .catch((error)=>console.error(error));
    }
    else{
        user_id && fetch(`http://localhost:8080/items/recommendation/${user_id}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(visit),
            })
        .then((response)=>response.json())
        .then((data)=>{
            set_products(data);
        })
          .catch((error)=>console.error(error));
    }
    // Will run again with no visited dependency after user is back at home page
    },[user_id,axiosPrivate])
  
      return (
          <Container>
            <GridContainer id='grid-container'>
              {
                  products && products.map((value)=>{
                      return(
                          <ProductContainer key={value.item.name+"?"+value.item.id}>
                            <ImageContainer>
                            <Image has_link={value.item.img_path} src={value.item.img_path?value.item.img_path:require("../../assets/logoreact.png")} onClick={()=>navigate(`/home/categories/${value.categories[0].id}/${value.categories[0].category}/${value.item.id}`)}/>
                            </ImageContainer>
  
                            <Description onClick={()=>navigate(`/home/categories/${value.categories[0].id}/${value.categories[0].category}`)}>
                            {value.categories[0].category}
                            </Description>
  
                            <Title onClick={()=>navigate(`/home/categories/${value.categories[0].id}/${value.categories[0].category}/${value.item.id}`)}>
                                {value.item.name}
                            </Title>
                        </ProductContainer>
                      )
                  })
              }
            </GridContainer>
          </Container>
        )
}

export default Recommendations