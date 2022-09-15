
import React from 'react'
import { useState } from 'react';
import { axiosPrivate } from '../../api/axios';
import { Box } from '@mui/system';
import { TextField } from '@material-ui/core';
import { Button } from '@mui/material';
import GavelIcon from '@mui/icons-material/Gavel';
import { useEffect } from 'react';


export const ValueBidForm = ({ maxValue, isBidder, setCallBidder, setCurrentBid, myUser, maxBidder, item, setRefresh, refresh  }) => {

    const [bidValue,setBidValue] = useState();
    const [currentBidder, setCurrentBidder] = useState(false);      
    const [empty,setEmpty] = useState(false);
    const isbidValid = (bidValue) => (bidValue <= maxValue && bidValue.length>0) || empty ;
    


    const handleXtipima = event  => {
        event.preventDefault();
        if(!bidValue)
            setEmpty(true);
        else if(isbidValid(bidValue))
            <></>
                        
        else if(!isBidder){
            console.log("GIATI!");
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
            ).then(() => {
                setRefresh(true)
                event.target.reset();        

            });
        
        }      
    }

    return(
        <>
        <Box className='form-button-container'>
        <form  onSubmit = {handleXtipima} className="form-bid">
            
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
            
            <Button  type="submit" sx={{color:"black"}}className='button-bid'><GavelIcon ></GavelIcon></Button>
    
        </form>
        </Box>
        </>

    )

}