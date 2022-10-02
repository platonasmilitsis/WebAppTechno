import React,{useEffect, useState, useMemo} from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import useGetUserByUsername from '../../hooks/useGetUserByUsername';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

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

const Arrow=styled.div`
    width:50px;
    height:50px;
    background-color:#fff7f7;
    border-radius:50%;
    display:flex;
    align-items:center;
    justify-content:center;
    position:absolute;
    left:${props=>props.direction==="left" && "10px"};
    right:${props=>props.direction==="right" && "10px"};
    margin-right:13%;
    margin-left:13%;
    cursor:pointer;
    opacity:0.8;
    z-index:2;
    transform:scale(0.9);
    margin-top:130px;
    @media only screen and (max-width: 1250px) {
        display:none;
    }
    @media (max-width: 1880px) and (min-width:1800px){
        margin-right:12%;
        margin-left:12%;
    }
`;

const GridContainer=styled.div`
    display:flex;
    overflow-y:hidden;
    overflow-x:scroll;
    scroll-behavior:smooth;
    width:1360px;
    @media only screen and (min-width: 1250px) {
        -webkit-scrollbar {
            display: none;
        }
        -ms-overflow-style: none;
        scrollbar-width: none;  
    }
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
    if(user_id===-1){
        user_id && fetch(`http://localhost:8080/items/recommendation/${user_id}`)
        .then((response)=>response.json())
        .then((data)=>{
            set_products(data);
        })
        .catch((error)=>{console.error(error)});
    }
    else{
        const headers={
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
        const visited=JSON.parse(localStorage.getItem("visited") || "[]");
        user_id && axiosPrivate.get(`/items/recommendation/${user_id}`,visited,{headers})
        .then((response)=>{
            set_products(response.data);
        })
        .catch((error)=>console.error(error));
    }
    // Will run again with no visited dependency after user is back at home page
    },[user_id,axiosPrivate])

    const [next_arrow,set_next_arrow]=useState(true);
    const [slide_index,set_slide_index]=useState(0)

    // Hardcode
    const find_overflows=()=> {
        const documentWidth = document.documentElement.offsetWidth;
        var slides=[]
        document.querySelectorAll('*').forEach(element => {
            const box = element.getBoundingClientRect();
    
            if (box.left < 0 || box.right > documentWidth) {
                if(element.id!==""){
                    slides.push(element);
                }
            }
        })
        if(slides.length===1){
            if(parseInt(slides[0].id)===8 && slide_index>=1){
                set_next_arrow(false);
            }
            else{
                set_next_arrow(true);
            }
        }
        else if(slides.length===2){
            if(parseInt(slides[0].id)===7  && parseInt(slides[1].id)===8 && slide_index>=2){
                set_next_arrow(false);
            }
        }
        else if(slides.length===3){
            if(parseInt(slides[0].id)===6  && parseInt(slides[1].id)===7 &&
            parseInt(slides[2].id)===8 && slide_index>=2){
                set_next_arrow(false);
            }
        }
        else if(slides.length===4){
            if(parseInt(slides[0].id)===5 && parseInt(slides[1].id)===6  &&
            parseInt(slides[2].id)===7 && parseInt(slides[3].id)===8 && slide_index>=2){
                set_next_arrow(false);
            }
        }
    }


    const click_prev=()=>{
        document.getElementById('grid-container').scrollLeft-=456;
        set_next_arrow(true);
        set_slide_index(slide_index-1);
    }

    const click_next=()=>{
        document.getElementById('grid-container').scrollLeft+=456;
        find_overflows();
        set_slide_index(slide_index+1);
    }
    
  
      return (
          <Container>
            <GridContainer id='grid-container'>
            {
                slide_index!==0 &&
                    <Arrow direction="left" onClick={click_prev}>
                        <KeyboardArrowLeftIcon fontSize="large"/>
                    </Arrow>
            }
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
                {
                next_arrow &&
                    <Arrow direction="right" onClick={click_next}>
                        <KeyboardArrowRightIcon fontSize="large"/>
                    </Arrow>
                }
            </GridContainer>
          </Container>
        )
}

export default Recommendations