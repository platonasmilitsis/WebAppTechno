import React from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { makeStyles } from '@material-ui/core'
import styled from 'styled-components';
import { Box, Container } from '@mui/system';
import { Button,AppBar, Toolbar, Typography } from '@mui/material';
import {useState} from 'react';
import adminStyles from "./Admin.css";
import { useEffect } from 'react';
import { siLK } from '@mui/material/locale';
import axios from 'axios';

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


const MyDatagrid = (props) =>{
    
    return (
        
        <DataGrid sx={{marginTop:"100px",height:"500px"}} checkboxSelection hideFooter 
        columns={columns}
        rows = {props.users}
        />
    )
}









const Admin = () =>{
    

  
      
 
    const  [NonAcceptedUsersData, setNonAcceptedUser] = useState([]);
    const  [AcceptedUsersData, setAcceptedUser] = useState([]);

    const  [AllUsers, setAllUsers] = useState([]);



    const [update, setUpdate] = useState(true);

    const [Admin, setAdmin] =   useState([]);


    async function fetchUsers() { 
        setUpdate(false);
        axios.get("http://localhost:8080/users")
        .then(res => 
            {
                const users = res.data;
                const filterData = users.filter(users => users.accepted==true && users.admin ==false);
                setAcceptedUser(filterData);
                const filterNonAcceptedData = users.filter(data=> data.accepted==false);
                setNonAcceptedUser(filterNonAcceptedData);
                const filterAdmin  = users.filter(data => data.admin==true);
                setAdmin(filterAdmin);
            })
    }

  


    {update && fetchUsers()}


    const [showNonAccepted, setShowNonAccepted] = useState(true);
    const [showAccepted, setShowAccepted] = useState(false);



    const handleClickAccepted = event => {
        setUpdate(true);
        setShowAccepted(true);
        setShowNonAccepted(false);

    }



    const handleClickNonAccepted = event => {
        setUpdate(true);
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
                        Welcome {Admin[0]?.first_name}
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
                {showNonAccepted && <MyDatagrid users={NonAcceptedUsersData}/>}
                {showAccepted &&  <MyDatagrid users={AcceptedUsersData}/>}    
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