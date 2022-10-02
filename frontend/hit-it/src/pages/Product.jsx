import React from 'react'
import { useState } from 'react';
import styled from 'styled-components'
import { Navigate } from "react-router-dom";
import { Form } from '../components/Products/Form';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import NavBar from '../components/Categories/NavBar';
import Breadcrumb from '../components/Global/Breadcrumb';
import Footer from '../components/Global/Footer';
import { useNavigate, useParams } from "react-router-dom";
import BasicMap from '../pages/Map';
import BidForm from '../components/Products/BidForm'
import { ValueBidForm } from '../components/Products/ValueBidForm';
import BidsTable from '../components/Products/BidsTable';
import "./Product.css";
import { Box } from '@mui/material';
import { useEffect } from 'react';
import { Typography } from '@material-ui/core';
import MapIcon from '@mui/icons-material/Map';
import EuroIcon from '@mui/icons-material/Euro';
import GavelIcon from '@mui/icons-material/Gavel';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FloatingButtonAdd from '../components/Home/FloatingButtonAdd';
import { axiosPrivate } from '../api/axios';
import PersonIcon from '@mui/icons-material/Person';
import DownloadIcon from '@mui/icons-material/Download';
import MessageIcon from '@mui/icons-material/Message';
import FavoriteIcon from '@mui/icons-material/Favorite';


const FootCont=styled.div`
    ${'' /* margin-top:150px; */}
    width:100%;
`;


const Product = () => {

    //Parameters
    let navigate=useNavigate();
    const params = useParams();
    const [user,set_user]=useState(null);
    const [myUser,setMyUser] = useState({});
    const [isBidder,setBidder] = useState(null);
    const [seller,set_seller]=useState(null);
    const [maxBidder,setMaxBidder] = useState(null);
    const [maxValue,setMaxValue] = useState(null);
    const page_names=["Αρχική",`${params.name}`];
    const page_links=["/home",`/home/categories/${params.id}/${params.name}`];
    const [refresh, setRefresh]  = useState(false);
    const [bidsList,setBidsList] = useState([]);
    const [loadImage, setLoadImage] = useState(false);
    const [item,setItem] = useState({});
    const [callEdit, setCallEdit] = useState(false);
    const [itemNotFound, setItemNotFound] = useState(false);
    const[callBidder,setCallBidder] = useState(false);
    const [currentBid, setCurrentBid] = useState();
    const [soldToUsername, setSoldToUsername] = useState();
    const [categories,setCategory] = useState([]);
    const [admin, setAdmin] = useState(false);

    const [now, setNow] = useState();

    useEffect(()=>{
        const visited=JSON.parse(localStorage.getItem("visited") || "[]");
        const int_id=parseInt(params.product_id);
        if(!visited.includes(int_id)){
            visited.push(int_id);
        }
        localStorage.setItem("visited",JSON.stringify(visited));
    },[])
     

    /* Async Functions */
   
    const user_function=()=>{
        set_user(localStorage.getItem('username'));
        user && fetch(`http://localhost:8080/users/username=${user}`)
        .then((response)=>response.json())
        .then((data)=>{
            setMyUser(data);
            data?.admin?setAdmin(true):setAdmin(false)
            fetch(`http://localhost:8080/bidders/${data.id}`)
                .then((response) => response.json())
                .then((data) => {
                    data 
                        ?setBidder(data)
                        : <></>
                })
        })
        .catch((error)=>{
            console.error(error);
        })
    }

    
    const soldTo = async() => {
        maxBidder && fetch(`http://localhost:8080/users/${maxBidder}`)
            .then((response) => response.json())
            .then((data) => {
                setSoldToUsername(data.username);
            })

    }

    const bids_function=()=>{
        fetch(`http://localhost:8080/items/${params.product_id}/all`)
            .then((response)=>response.json())
            .then((data)=>{
                console.log("Simantiko:",data);
                setCategory(data?.categories);
                setItem(data?.item);
                console.log(data?.item);
                setBidsList(data?.bids?.bids);
                setMaxBidder(data?.bids?.bids[0]?.bidder.id);
                setMaxValue(data?.bids?.bids[0]?.amount);
                data.item?setLoadImage(true):setItemNotFound(true);
                data?.item?.user?.username===user?set_seller(true):set_seller(false);
                
            })
            .catch((error)=>{
                console.error(error);
                navigate("/error");
            })
    }

    // Handlers
    
    const handleEditModal = () => {
        setCallEdit(true);
    }

    const handleClose = () => {
        setCallEdit(false);
        setCallBidder(false);
    }


    const handleRating = async() => {
        const id = maxBidder === myUser.id ? item.user.id : maxBidder;
        const res = await axiosPrivate.put(`/bidders/rating/${id}`)
        
    }

    const handleStart = async() => {
        const res = await axiosPrivate.put(`/items/start/${item?.id}`)
            .then((data) => {
                setRefresh(true);
            })
    }

    const handleDownload = () => {
        window.open(`http://localhost:8080/download/${item?.id}`, '_blank', 'noopener,noreferrer');  
    }

    const handleMessage = async() => {
        const res = await axiosPrivate.post(`messagesList`,
            {
                "seller_id" : item.user.id, 
                "buyer_id" : maxBidder
            }
        ).then((data)=>{console.log(data.data)})
    }


    //UseEffect

    useEffect(()=> {
        var today = new Date();

        const date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate() + ' '
            + today.getHours() + ":" + today.getMinutes() ; 

        setNow(date); 
        setRefresh(false);
        user_function();
        bids_function();
    },[navigate,user,refresh])

    {item?.item_start_biding_sold == 0 && soldTo()}
    
    const isSellerOrBidder = () => {
        return seller
            ? true
            : (maxBidder === myUser.id)
            ? true : false 

    } 

    const ButtonComponent = () => {

        useEffect(() => {},[seller,maxBidder])
        return isSellerOrBidder() && 
            <Box sx={{display:"flex", gap:".9rem",}}>
                 <Button variant="contained" sx={{ marginTop:"2%", backgroundColor:"#e67e22",
                        '&:hover': {
                        backgroundColor:"#000000"
                        } }} className='edit-button-container'
                        onClick={handleMessage}
                        style={{position:"absolute,marginRight:2%"}}
                        >
                    <MessageIcon/>
                    </Button>
                    <Button variant="contained" sx={{ marginTop:"2%", backgroundColor:"#e67e22",
                        '&:hover': {
                        backgroundColor:"#000000"
                        } }} className='edit-button-container'
                        onClick={handleRating}
                        style={{position:"absolute,marginRight:2%"}}
                        >
                    <FavoriteIcon/>
                    </Button>
        </Box>
    }

    const SoldComponent = () => {
        return soldToUsername ? 
                <Box>
                    <Typography component={"span"} variant={"body1"}>
                        <p> <GavelIcon/> <span style={{color:"#e67e22"}}>Πουλήθηκε</span>: 
                        <PersonIcon style={{marginLeft:"2rem"}}/> <span style={{fontWeight:"700"}}>   {soldToUsername} </span> : {maxValue}€</p>
                    </Typography>


                    <ButtonComponent/>
                    
                </Box>
                : <Typography component={"span"} variant={"body1"}>
                    <p> <GavelIcon/> <span style={{color:"#e67e22"}}>Η Δημοπρασία έληξε</span> </p>
                </Typography>
    }

    const NotStartedComponent = () => {
        return <Typography component={"span"} variant={"body2"}>
            <p> <MapIcon/> <span style={{color:"#e67e22"}}>Τοποθεσία</span>: {item?.location}, {item?.country}</p>
            <p> <AccessTimeIcon/> <span style={{color:"#e67e22"}}>Έναρξη Δημοπρασίας</span>: {item?.start_time} </p>
            <p> <EuroIcon/> <span style={{color:"#e67e22"}}>Εναρκτήριο Ποσό</span>: {item?.first_bid}€</p>
            <p> <GavelIcon/> <span style={{color:"#e67e22"}}>Ποσό Πώλησης</span>: {item?.buy_price}€</p>
        </Typography>
    }

    const StartedComponent = () => {
        return <Typography component={"span"} variant={"body2"}>
                    <p> <MapIcon/> <span style={{color:"#e67e22"}}>Τοποθεσία</span>: {item?.location}, {item?.country}</p>
                    <p> <AccessTimeIcon/> <span style={{color:"#e67e22"}}>Λήξη Δημοπρασίας</span>: {item?.end_time} </p>
                    <p> <EuroIcon/> <span style={{color:"#e67e22"}}>Τρέχουσα Δημοπρασία</span>: {maxValue?maxValue + '€':'-'}</p>
                    <p> <GavelIcon/> <span style={{color:"#e67e22"}}>Ποσό Πώλησης</span>: {item?.buy_price}€</p>
                </Typography>
    }

    const MyMap = () => {
        return <BasicMap mylat = {JSON.parse(item.latitude)} mylong = {JSON.parse(item.longitude)} />
    }
   
    
    return (
        
       <Box className="main-product-container" >
        

        <Modal open={callEdit} onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{flexDirection:'column',display:'flex',alignItems:'center',justifyContent:'center'}}
        >
            <>
            <div className='logo-container'>
                <h1>HIT IT</h1>
            </div>
            
            <Box className='edit-form-container' >

                <Form setCallEdit={setCallEdit} setRefresh={setRefresh} itemId ={item?.id} />
            </Box>

            
            </>

        </Modal>

        <Modal open={callBidder} onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    style={{flexDirection:'column',display:'flex',alignItems:'center',justifyContent:'center'}}
        >
            
            <>
            <div className='logo-container'>
                <h1>HIT IT</h1>
            </div>
        
            <Box className='edit-form-container' >
                <BidForm setRefresh = {setRefresh} userId = {myUser.id} userUsername={myUser.username} itemId ={item?.id} setBidder={setBidder} setCallBidder={setCallBidder} currentBid={currentBid} />
            </Box>
            </>
        </Modal>



        {itemNotFound && <Navigate to="/"/>}

            <HelmetProvider>
                    <Helmet>
                        <meta charSet="utf-8" />
                        <title>
                            Προϊόντα
                        </title>
                    </Helmet>
                </HelmetProvider>
            <Box className='nav-container'>
                <NavBar/>
                 <Box className='brea-crumb'>
                    {Breadcrumb(page_names,page_links)}
                </Box>
            </Box>
            <Box className ='product-container'>


                { loadImage  
                    ? item?.img_path 
                        ? <img 
                        src={item.img_path}
                        alt = 'Image not Found'
                        className='image-container'/>
                        :   <img 
                        src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png' 
                        className='image-container'/>
                    : <div className='image-container'>Image is loading...</div>
                
                }
                
                <Box className="description-container">
                    <h1>{item?.name}</h1>


                    <br/>
                    <Typography component={"span"} variant={"body2"} dangerouslySetInnerHTML={{ __html: item?.description }}></Typography>
                    <br/>
                    {
                        new Date(item?.start_time) > new Date() && item?.item_start_biding_sold===0
                        ? <NotStartedComponent/>
                        : item?.item_start_biding_sold === 1 
                            ? new Date(item?.end_time) > new Date()
                                ? <StartedComponent/>
                                : <SoldComponent/> 
                            : new Date(item?.end_time) > new Date()
                                ? item?.item_start_biding_sold === 2
                                    ? <SoldComponent/>
                                    : <StartedComponent/>
                                : <SoldComponent /> 
                    }

                </Box>
                {
                    seller &&
                    <Box sx={{display:"flex", gap:".9rem",}}>
                    <Button variant="contained" sx={{ marginTop:"2%", backgroundColor:"#e67e22",
                        '&:hover': {
                            backgroundColor:"#000000"
                        } }} className='edit-button-container'
                        onClick={handleEditModal}
                        style={{position:"absolute,marginRight:2%"}}
                        >
                        <EditIcon/>
                    </Button>
                    <Button variant="contained" sx={{ marginTop:"2%", backgroundColor:"#e67e22",
                        '&:hover': {
                        backgroundColor:"#000000"
                        } }} className='edit-button-container'
                        onClick={handleStart}
                        style={{position:"absolute,marginRight:2%"}}
                        >
                    <EuroIcon/>
                    </Button>
                    </Box>

                }
                {   admin && 
                    <Box sx={{display:"flex", gap:".9rem",}}>
                    <Button variant="contained" sx={{ marginTop:"2%", backgroundColor:"#e67e22",
                        '&:hover': {
                        backgroundColor:"#000000"
                        } }} className='edit-button-container'
                        onClick={handleDownload}
                        style={{position:"absolute,marginRight:2%"}}
                        >
                    <DownloadIcon/>
                    </Button>
                
                    </Box>
                
                }
            </Box>
          
            <Box className='bids-map-container'>
                <Box className = 'my-map-container'>
                {loadImage ?
                    item?.latitude 
                    ?<MyMap/>
                    : <></>
                :<></>
                }
                </Box>
                <Box className='bids-form-container'>
                    <Box className='bids-container'>
                        {item?.item_start_biding_sold === 1?
                                bidsList
                                ? <BidsTable start_time={item?.start_time} end_time={item?.end_time}    rows={bidsList} />
                                : <></>
                            : new Date(item?.start_time) < new Date() 
                                ? <BidsTable rows={bidsList} start_time={item?.start_time} end_time={item?.end_time}/>
                                : <></>                            
                        }
                    </Box>
                    {
                        user && !seller && <ValueBidForm 
                        maxValue = {maxValue} isBidder = {isBidder} setCallBidder = {setCallBidder}
                        setCurrentBid = {setCurrentBid}  myUser = {myUser} maxBidder={maxBidder} refresh={refresh}
                        item={item} setRefresh={setRefresh}/>
                    
                    }
                    
                </Box>
            </Box>

            {user && <FloatingButtonAdd/>}
            <FootCont>
                <Footer/>
            </FootCont>
       </Box>
       
    )
    
}

export default Product

