import React from 'react'
import { useState } from 'react';
import { Button } from '@mui/material';
import { axiosPrivate } from '../../api/axios';

export const Form = ({ setCallEdit,setRefresh,itemId }) => {

        const [itemTitle,setItemTitle] = useState('');
        const [itemDescription,setItemDescription] = useState('');
        const [itemFirstBid,setItemFirstBid] = useState('');
        const [itemBuyPrice,setItemBuyPrice] = useState('');
        const [itemLocation,setItemLocation] = useState('');
        const [itemCountry,setItemCountry] = useState('');
        const [itemLat,setItemLat] = useState('');
        const [itemLong,setItemLong] = useState('');
        const [itemImagePath,setItemImagePath] = useState('');



        const handleSubmit = async(event) => {
            event.preventDefault(); 
        

            itemDescription ? 
                console.log(itemDescription)
                :console.log("fasi")
        
            const res = axiosPrivate.put(`items/${itemId}`,
                {
                    name: itemTitle? itemTitle : null,
                    first_bid : itemFirstBid ? itemFirstBid : null,
                    buy_price : itemBuyPrice ? itemBuyPrice : null,
                    location : itemLocation ? itemLocation : null,
                    country : itemCountry ? itemCountry : null,
                    latitude : itemLat ? itemLat : null,
                    longitude : itemLong ? itemLong : null,
                    img_path : itemImagePath ? itemImagePath : null,
                    description : itemDescription ? itemDescription : null,                    
                })
            .then((request) => { console.log(request); setRefresh(true); setCallEdit(false); } )
            

            
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
