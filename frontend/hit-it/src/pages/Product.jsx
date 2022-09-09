import React from 'react'
import {useState, useMemo} from 'react';
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
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TextField} from '@material-ui/core';
import Paper from '@mui/material/Paper';


import "./Product.css";
import { axiosPrivate } from '../api/axios';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import { Typography } from '@material-ui/core';
import MapIcon from '@mui/icons-material/Map';
import EuroIcon from '@mui/icons-material/Euro';
import GavelIcon from '@mui/icons-material/Gavel';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';

import Modal from '@mui/material/Modal';
import FloatingButtonAdd from '../components/Home/FloatingButtonAdd';







  export const StyledTableHead = styled(TableHead)`
  & .MuiTableCell-root {
    background-color: #e67e22;
    color:white;
    font-weight: bold;
}
`;

const FootCont=styled.div`
    ${'' /* margin-top:150px; */}
    width:100%;
`;


const Product = () => {



   
    let navigate=useNavigate();
    
    
    const [user,set_user]=useState(null);
    

    const [myUser,setMyUser] = useState({});

    const floating_button=()=>{set_user(localStorage.getItem('username'));}
    useMemo(()=>floating_button(),[]);
    
    
    const [seller,set_seller]=useState(null);

    const [isBidder,setBidder] = useState(null);
    const [maxBidder,setMaxBidder] = useState(null);
    const [maxValue,setMaxValue] = useState(null);

    const page_names=["Καλωσοριστική","Αρχική"];
    const page_links=["/","/home"];

    const [mylocation, setmyLocation] = useState({});

    const [refresh, setRefresh]  = useState(false);


    
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


    const[callBidder,setCallBidder] = useState(false);
    
    const [currentBid, setCurrentBid] = useState();


    const fetchmyUser = async() => {
        const resUser = await axiosPrivate.get(`http://localhost:8080/users/username=${user}`)
        .then((res) => {
            console.log(res.data);
            setMyUser(res.data);
            return res.data;
        })
        return resUser;
    }


    
    const handleEditModal = () => {
        setCallEdit(true);
    }


    const handleClose = () => {
        setCallEdit(false);
        setCallBidder(false);
    }

    useEffect(() => {
        setRefresh(false);
                
        fetchmyUser()
        .then((resUser) => {
            console.log("undefine?",resUser);
            axiosPrivate.get(`http://localhost:8080/bidders/${resUser?.id}`)
            .then((res) => 
                {
                    res.data
                        ?setBidder(true)
                        :setBidder(false)

                }
            )
        });


        axiosPrivate(`http://localhost:8080/items/${params.product_id}/all`)
        .then((data)=>{
            console.log("EDWW",data?.data.bids);
            setItem(data?.data.item);
            setBidsList(data?.data.bids?.bids);
            setMaxBidder(data?.data.bids?.bids[0].bidder.id);
            setMaxValue(data?.data.bids?.bids[0].amount);
            data.data.item?setLoadImage(true):setItemNotFound(true);
            const is_seller=data.data.item.user;
            is_seller.username===user?set_seller(true):set_seller(false);
        })
        .catch((error)=>{
            console.error(error);
            navigate("/error");
            
        })
    },[navigate,isBidder,refresh])



    const BidsTable = ( {rows} ) => {
        return(
            <TableContainer sx={{ maxHeight:"250px",height:"250px"}} component={Paper}>
                <Table style={{ backgroundColor:"#eaeded" }} stickyHeader={true} sx={{ maxHeight:"250px", height:"250px", width:"20%" }} aria-label="simple table">
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



    const BidForm = () => {
        const [bidderLocation, setBidderLocation]  = useState('');
        const [bidderCountry, setBidderCountry]  = useState('');

        const  handleSubmit = async() => {
            const res = await axiosPrivate.post(`/bidders/${myUser.id}`,
                {
                    id:0,
                    rating:0,
                    username: myUser.username,
                    location: bidderLocation,
                    country: bidderCountry,
                })
                .then(async(result) => 
                {
                    console.log(result.data);
                    setBidder(true);
                    setCallBidder(false);
                    
                    var today = new Date();

                    const date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate() + ' '
                        + today.getHours() + ":" + today.getMinutes() ; 

                    console.log("date:",date);

                    const newRes = axiosPrivate.post(`/bidder/${myUser.id}/bid/${item.id}`,
                        {
                            time: date, 
                            amount : currentBid,
                        }
                    )
                    return newRes.data;
                })
                .catch((error) => console.error(error.message));
            }


        return(
            <form className='edit-form'>
                <h2>Πρέπει να γίνεις πρώτα Χτυπημένος!</h2>
  
                <TextField  className = 'edit-div' style={{color:"black"}}
                    required
                    onChange = {event => {  setBidderLocation(event.target.value)}}
                    id="bidder-location-form" label="Εισάγετε την τοποθεσία σας" variant="standard"
                >
                </TextField>

                <TextField  className = 'edit-div' style={{color:"black"}}
                    required
                    onChange = {event => {  setBidderCountry(event.target.value)}}
                    id="bidder-country-form" label="Εισάγετε την χώρα σας" variant="standard"
                >
                </TextField>

                <Button onClick={handleSubmit} variant="contained" sx={{ marginTop:"2%", backgroundColor:"#e67e22",
                '&:hover': {
                    backgroundColor:"#000000"
                } }} className='ypovoli-button'>ΧΤΥΠΑ ΤΟΥΣ ΟΛΟΥΣ ΜΑΓΚΑ!</Button>
            </form>
        )

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

    const ValueBidForm = () => {


        const [bidValue,setBidValue] = useState();
        const [currentBidder, setCurrentBidder] = useState(false);

       

        
        const [empty,setEmpty] = useState(false);
        
        const isbidValid = (bidValue) => (bidValue <= maxValue && bidValue.length>0) || empty ;
        


        const handleXtipima = () => {
            if(!bidValue)
                setEmpty(true);
            else if(isbidValid(bidValue))
                <></>
                          
            else if(!isBidder){
                setCallBidder(true);
                setCurrentBid(bidValue);
            }
            else if(myUser.id === maxBidder)
                setCurrentBidder(true);

            else{
                var today = new Date();

                const date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate() + ' '
                    + today.getHours() + ":" + today.getMinutes() ; 

                console.log("date:",date);

                const newRes = axiosPrivate.post(`/bidder/${myUser.id}/bid/${item.id}`,
                    {
                        time: date, 
                        amount : bidValue,
                    }
                ).then(() => setRefresh(true));
            
            }
            
            
        }

        return(
            <>
            <Box className='form-button-container'>
            <form  className="form-bid">
               
                <TextField style={{color:"black"}}
                
                error={isbidValid(bidValue) }
                helperText={empty? "Πρέπει να βάλεις κάποιο ποσό..."
                                : isbidValid(bidValue) 
                                    ? "Πρέπει να χτυπήσεις με μεγαλύτερο ποσό!" 
                                    : currentBidder ? "Πρέπει να σε χτυπήσει κάποιος άλλος ρε φάτσα!" : "" 
                            }
                onChange = {event => {  setBidValue(event.target.value); setEmpty(false);}}
                id="bid-form" label="Χτύπα το ρε μάγκα!" variant="standard"
                >
                </TextField>
               
                <Button onClick={handleXtipima} sx={{color:"black"}}className='button-bid'><GavelIcon ></GavelIcon></Button>
        
            </form>
            </Box>
            </>

        )

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
                <BidForm/>
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
                    <Typography component={"span"} variant={"body2"}>
                            <p> <MapIcon/> <span style={{color:"#e67e22"}}>Τοποθεσία</span>: {item?.location}, {item?.country}</p>
                    </Typography>

                    {

                        item?.item_start_biding_sold === 0
                        ? 

                        <Typography component={"span"} variant={"body2"}>
                            <p> <EuroIcon/> <span style={{color:"#e67e22"}}>Εναρκτήριο Ποσό</span>: {item?.first_bid}€</p>
                            <p> <GavelIcon/> <span style={{color:"#e67e22"}}>Ποσό Πώλησης</span>: {item?.buy_price}€</p>
                        </Typography>


                        : console.log("oxi",item)
                    }

                </Box>
                {
                    seller &&
                    <Button variant="contained" sx={{ marginTop:"2%", backgroundColor:"#e67e22",
                    '&:hover': {
                        backgroundColor:"#000000"
                    } }} className='edit-button-container'
                    onClick={handleEditModal}
                    style={{position:"absolute,marginRight:2%"}}
                    >
                    <EditIcon/>
                </Button>
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
                        {bidsList?
                            <BidsTable rows={bidsList} />
                            :<></>
                        }
                    </Box>
                    {
                        user && <ValueBidForm/>
                    
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

