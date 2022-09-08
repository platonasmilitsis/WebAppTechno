import React from 'react'
import {useState} from 'react';
import styled from 'styled-components'
import { useLocation, Navigate } from "react-router-dom";

import { Container } from '@mui/system';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import NavBar from '../components/Categories/NavBar';
import Breadcrumb from '../components/Global/Breadcrumb';
import Main from '../components/Products/Main';
import Footer from '../components/Global/Footer';
import { useNavigate, useParams } from "react-router-dom";
import BasicMap from '../pages/Map';
import { Breadcrumbs, Link, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles} from '@material-ui/core';
import Paper from '@mui/material/Paper';


import "./Product.css";
import { axiosPrivate } from '../api/axios';
import { arSD } from '@mui/material/locale';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useAsync } from "react-async"
import { Typography } from '@material-ui/core';
import MapIcon from '@mui/icons-material/Map';
import EuroIcon from '@mui/icons-material/Euro';
import GavelIcon from '@mui/icons-material/Gavel';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import { ClickAwayListener } from '@mui/base';

import Modal from '@mui/material/Modal';




// const Logo=styled.h3`
//     color:#e67e22; 
//     font-weight:700;
//     font-size:70px;
//     margin-top:90px;
// `;

// const MapInfoContainer=styled.div`
//     display: flex;
//     flex-direction:row;
//     flex-wrap:wrap;
//     margin-bottom:50px;
//     margin-top:50px;

// `;

// const MapContainer=styled.div`
//     background-color:#ffffff;
//     width:50%;
// `;

// const InfoContainer=styled.div`
//     background-color:#ffffff;
//     width:50%;
//     text-align:center;
// `;

// const Info=styled.div`
//     margin-top:50px;
// `;

// const FootCont=styled.div`
//     width:100%;
//     height:20px;
// `;





  export const StyledTableHead = styled(TableHead)`
  & .MuiTableCell-root {
    background-color: #e67e22;
    color:white;
    font-weight: bold;
}
`;


const Product = () => {





    // const [newitemTitle,newsetItemTitle] = useState('');
    // const [newitemDescription,newsetItemDescription] = useState('');
    // const [newitemFirstBid,newsetItemFirstBid] = useState('');
    // const [newitemBuyPrice,newsetItemBuyPrice] = useState('');
    // const [newitemLocation,newsetItemLocation] = useState('');
    // const [newitemCountry,newsetItemCountry] = useState('');
    // const [newitemLat,newsetItemLat] = useState('');
    // const [newitemLong,newsetItemLong] = useState('');
    // const [newitemImagePath,newsetItemImagePath] = useState('');





    const page_names=["Καλωσοριστική","Αρχική"];
    const page_links=["/","/home"];

    const [mylocation, setmyLocation] = useState({});


    
    const [bidsList,setBidsList] = useState([]);
    const [loadImage, setLoadImage] = useState(false);
    const [imgPath,setPath] = useState();
    const [item,setItem] = useState({});

    const params = useParams();
    
    const [reload, setReload]  = useState(true);


    const [callEdit, setCallEdit] = useState(false);

    const getItem = async(id) =>{
        const response = await axiosPrivate.get(`items/${id}/all`);

        console.log(response?.data);
        return response?.data;
    }

    const [itemNotFound, setItemNotFound] = useState(false);

    

    
    const handleEditModal = () => {
        setCallEdit(true);
    }


    const handleClose = () => {
        setCallEdit(false);
    }

    useEffect(() => {
        getItem(params.id).then((myItem) => {
            setItem(myItem.item);
            setBidsList(myItem.bids.bids);
            return myItem;
        }).then((myItem)=>{

            console.log(myItem.item);
            console.log("BIDS ",myItem.bids);
            myItem.item
            ?  setLoadImage(true)
            :  setItemNotFound(true);
        });       
    },[])



    const BidsTable = ( {rows} ) => {
        return(
            <TableContainer sx={{ maxHeight:"250px",height:"250px"}} component={Paper}>
                <Table style={{ backgroundColor:"#eaeded" }} stickyHeader='true' sx={{ maxHeight:"250px", height:"250px", width:"20%" }} aria-label="simple table">
                    <StyledTableHead >
                        <TableRow >
                            <TableCell>Όνομα Χρήστη</TableCell>
                            <TableCell align="right">Χτυπητέο Ποσό</TableCell>
                            <TableCell align="right">Ώρα Κρούσης</TableCell>

                        </TableRow>
                    </StyledTableHead>
                    <TableBody sx={{backgroundColor:"#eaeded"}}>
                        {rows.map((row) => (
                            <TableRow key={row.id}
                                sx={{   '&:last-child td, &:last-child th': {border:0}}}
                            >
                                <TableCell component="th" scope="row">{row.bidder.username}</TableCell>
                                <TableCell align='right'>{row.amount}€</TableCell>
                                <TableCell align='right'>{row.time}</TableCell>

                            </TableRow>
                        ))}

                    </TableBody>


                </Table>

            


            </TableContainer>
        );
    }










    const Form = () => {

        const [itemTitle,setItemTitle] = useState('');
        const [itemDescription,setItemDescription] = useState('');
        const [itemFirstBid,setItemFirstBid] = useState('');
        const [itemBuyPrice,setItemBuyPrice] = useState('');
        const [itemLocation,setItemLocation] = useState('');
        const [itemCountry,setItemCountry] = useState('');
        const [itemLat,setItemLat] = useState('');
        const [itemLong,setItemLong] = useState('');
        const [itemImagePath,setItemImagePath] = useState('');



        const handleSubmit = event => {
            console.log('handleSubmit ran');
            event.preventDefault(); // 👈️ prevent page refresh
        
            console.log('title 👉️', itemTitle);
            console.log('Description 👉️', itemDescription);
        
            setItemTitle('');
            setItemDescription('');
        }

        return (
            <form onSubmit={handleSubmit} className='edit-form'>
                <p className='edit-field'>
                    Όνομα Προϊόντος
                </p>
                <div className='edit-div'>
                    <input onChange={event => setItemTitle(event.target.value)} value={itemTitle} className='edit-input' type="text" placeholder="Εισάγετε το όνομά του προϊόντος"/>
                </div>
                <p className ='edit-field'>
                    Περιγραφή Προϊόντος
                </p>
                <div className='edit-div'>
                    <input onChange={event => setItemDescription(event.target.value)}
                    value={itemDescription} className='edit-input' type="text" placeholder="Εισάγετε την περιγραφή του προϊόντος"/>
                </div>
                <p className ='edit-field'>
                    Έναρξη Δημοπρασίας
                </p>
                <div className='edit-div'>
                    <input onChange={event => setItemFirstBid(event.target.value)}
                    value={itemFirstBid} className='edit-input' type="text" placeholder="Εισάγετε την τιμή έναρξης της δημοπρασίας"/>
                </div>
                <p className ='edit-field'>
                    Λήξη Δημοπρασίας
                </p>
                <div className='edit-div'>
                    <input 
                    onChange={event => setItemBuyPrice(event.target.value)}
                    value={itemBuyPrice} className='edit-input' type="text" placeholder="Εισάγετε την τιμή λήξης της δημοπρασίας"/>
                </div>
                <p className ='edit-field'>
                    Περιοχή Κατοικίας
                </p>
                <div className='edit-div'>
                    <input onChange={event => setItemLocation(event.target.value)}
                    value={itemLocation} className='edit-input' type="text" placeholder="Εισάγετε την περιοχή κατοικίας σας"/>
                </div>
                <p className ='edit-field'>
                    Χώρα Διαμονής
                </p>
                <div className='edit-div'>
                    <input onChange={event => setItemCountry(event.target.value)}
                    value={itemCountry} className='edit-input' type="text" placeholder="Εισάγετε την χώρα διαμονής σας"/>
                </div>
                <p className ='edit-field'>
                    Γεωγραφικό Πλάτος
                </p>
                <div className='edit-div'>
                    <input onChange={event => setItemLat(event.target.value)}
                    value={itemLat} className='edit-input' type="text" placeholder="Εισάγετε το γεωγραφίκο πλάτος της κατοικίας σας"/>
                </div>
                <p className ='edit-field'>
                    Γεωγραφικό Μήκος
                </p>
                <div className='edit-div'>
                    <input onChange={event => setItemLong(event.target.value)}
                    value={itemLong} className='edit-input' type="text" placeholder="Εισάγετε το γεωγραφίκο μήκος της κατοικίας σας"/>
                </div>
                <p className ='edit-field'>
                    Εικόνα Προϊόντος
                </p>
                <div className='edit-div'>
                    <input onChange={event => setItemImagePath(event.target.value)}
                    value={itemImagePath} className='edit-input' type="text" placeholder="Εισάγετε το link της εικόνας του προϊόντος σας"/>
                </div>
            <Button type="submit" variant="contained" sx={{ marginTop:"2%", backgroundColor:"#e67e22",
            '&:hover': {
                backgroundColor:"#000000"
            } }} className='ypovoli-button'>ΑΝΑΝΕΩΣΗ</Button>
            </form>

        );   
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

                <Form/>
            </Box>

            
            </>

            {/* <Box className="edit-modal-container">
                <Typography  id="modal-modal-title" variant="h6" component="h2">
                    Text in a modal
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </Typography>
            </Box> */}
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
                        className='image-container'/>
                        :   <img 
                        src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png' 
                        className='image-container'/>
                    : <div className='image-container'>Image is loading...</div>
                
                }
                
                <Box className="description-container">
                    <h1>{item?.name}</h1>
                    <br/>
                    <Typography dangerouslySetInnerHTML={{ __html: item?.description }}></Typography>
                    <br/>
                    <Typography>
                            <p> <MapIcon/> <span style={{color:"#e67e22"}}>Τοποθεσία</span>: {item?.location}, {item?.country}</p>
                    </Typography>

                    {

                        item?.item_start_biding_sold === 0
                        ? 

                        <Typography>
                            <p> <EuroIcon/> <span style={{color:"#e67e22"}}>Εναρκτήριο Ποσό</span>: {item?.first_bid}€</p>
                            <p> <GavelIcon/> <span style={{color:"#e67e22"}}>Ποσό Πώλησης</span>: {item?.buy_price}€</p>
                        </Typography>


                        : console.log("oxi",item)
                    }

                </Box>

                <Button variant="contained" sx={{ marginTop:"2%", backgroundColor:"#e67e22",
                    '&:hover': {
                        backgroundColor:"#000000"
                    } }} className='edit-button-container'
                    onClick={handleEditModal}
                    >
                    <EditIcon/>
                </Button>
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
                        {bidsList?
                            <BidsTable rows={bidsList} />
                            :<></>
                        }
                    </Box>
                    <Box className='form-button-container'>
                        <form className="form-bid">
                            <input className='edit-input' type="text" placeholder="Χτύπα το ρε μάγκα!"/>
                        </form>
                        <Button sx={{color:"black"}}className='button-bid'><GavelIcon ></GavelIcon></Button>
                    </Box>
                </Box>
            </Box>


       </Box>
       
    )
    
}

export default Product


{
    // <Container>
    //    
    //     <MapInfoContainer>
    //         <MapContainer>
    //             <Map/>
    //         </MapContainer>
    //         <InfoContainer>
    //             <Info>
    //                 <ul>
    //                     <h3>Πληροφορίες Καταστήματος</h3>
    //                     <br></br>
    //                     <li>Διεύθυνση: Βάλβη 27, ΤΚ:43100</li>
    //                     <li>Τηλέφωνο: 24410 11111</li>
    //                 </ul> 
    //                 <Logo>
    //                     hit-it
    //                 </Logo>
    //             </Info>
    //         </InfoContainer>
    //     </MapInfoContainer>
    //     <FootCont>
    //         <Footer/>
    //     </FootCont>
    // </Container>
   }