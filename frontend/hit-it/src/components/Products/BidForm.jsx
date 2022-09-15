import React from 'react';
import { useState } from 'react';
import { axiosPrivate } from '../../api/axios';
import { TextField } from '@material-ui/core';
import { Button } from '@mui/material';


const BidForm = ( { userId, userUsername, itemId, setBidder, setCallBidder, currentBid, setRefresh } ) => {
    const [bidderLocation, setBidderLocation]  = useState('');
    const [bidderCountry, setBidderCountry]  = useState('');

    const  handleSubmit = async() => {
        const res = await axiosPrivate.post(`/bidders/${userId}`,
            {
                id:0,
                rating:0,
                username: userUsername,
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

                const newRes = axiosPrivate.post(`/bidder/${userId}/bid/${itemId}`,
                    {
                        time: date, 
                        amount : currentBid,
                    }
                )

                setRefresh(true);
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

export default BidForm