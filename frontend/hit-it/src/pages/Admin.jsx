import React from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { makeStyles } from '@material-ui/core'
import styled from 'styled-components';
import { Box, Container } from '@mui/system';
import { Button,AppBar, Toolbar, Typography } from '@mui/material';
import {useState} from 'react';
import adminStyles from "./Admin.css";


const drawerWidth = 240

const useStyles = makeStyles((theme) => {
    return{
        appBar: {
            width: `calc(100%-${drawerWidth}px)`,
            marginLeft: drawerWidth,            
        }
    }
})


const styles = {
    text:{
        fontWeight:"bold",
        align:"center",
        
    },

    button:{
        width:"30%",
        height:"40px",
        marginLeft:"20px",
        color:"white",

    }
    

}



const columns : GridColDef[] = [
    {field:"id",hide:true},
    {field:"username",headerName:"Username",width:150},
    {field:"first_name",headerName:"First Name",width:150},
    {field:"last_name",headerName:"Last Name",width:150},
    {field:"telephone",headerName:"Telephone",width:150},
    {field:"email",headerName:"E-mail",width:150},
    {field:"address",headerName:"Address",width:150},
    {field:"tin",headerName:"Tin",width:150}

]

/*
async NonAcceptedUsers = () =>{

    const response = await fetch('https://localhost:8080/users');
    const data = await response.json();
    return data;

}
*/
/*

const NonAcceptedDatagrid = () =>{
    
    return (
        <DataGrid autoHeight checkboxSelection hideFooter
        columns={columns}
        rows = {fetch('https://localhost:8080/users')
            .then(response => response.json)
        }
        />
    )
}
*/





const Admin = () =>{
    
    
    const [showNonAccepted, setShowNonAccepted] = useState(true);
    const [showAccepted, setShowAccepted] = useState(false);




    const handleClickAccepted = event => {
        setShowAccepted(true);
        setShowNonAccepted(false);

    }



    const handleClickNonAccepted = event => {
        setShowNonAccepted(true);
        setShowAccepted(false);
    }


    const classes = useStyles()

    return (
        <Container>
            
            <AppBar>
                <Toolbar sx={{justifyContent:"flex-start"}}>
                    <Typography 
                    sx={styles.text}>
                        Welcome Themistoklisss Rambossaaa
                        </Typography>
                    <Button variant="outlined" sx={styles.button}
                    onClick = {handleClickNonAccepted}
                    >Non-Accepted-Users</Button>
                

                    <Button variant="outlined" sx={styles.button}
                    onClick = {handleClickAccepted}
                    >Accepted-Users</Button>

                 </Toolbar>
            </AppBar>
            <Box className='main-container'>
                {showNonAccepted && <NonAcceptedDatagrid/>}
                {showAccepted &&  <NonAcceptedDatagrid/>}    
            </Box>
            <Box className='buttons-container'>
            {
                showNonAccepted && <div>
                <Button sx={{marginLeft:"20px"}} variant="contained"> Accept</Button>
                <Button variant="contained"
                style={{ marginLeft:"20px",backgroundColor:"#8b0000"}}>Delete</Button>
                </div>
            }
            {
                showAccepted &&
                <div>
                <Button variant="contained"
                style={{backgroundColor:"#8b0000"}}>Delete</Button>
                </div>
            }          
            </Box>

        </Container>
        
    )
}

export default Admin