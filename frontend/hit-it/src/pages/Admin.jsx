import React from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { makeStyles } from '@material-ui/core'
import styled from 'styled-components';
import { Box, Container } from '@mui/system';
import { Button,AppBar, Toolbar, Typography, selectClasses } from '@mui/material';
import {useState} from 'react';
import adminStyles from "./Admin.css";
import { useEffect } from 'react';
import { siLK } from '@mui/material/locale';
import axios from 'axios';
import UserService from '../services/user_service';
import { useNavigate} from 'react-router-dom';
import TokenService from '../services/token_service';

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










const Admin = () =>{
    
    let navigate = useNavigate();
    

    const [sendAccept, setSendAccept] = useState(false);

    const myUser = UserService.get_myUser();
    const access_token = TokenService.get_local_access_token();
    const refresh_token = TokenService.get_local_access_token();

    if(myUser.admin==false) navigate("/home");
 
    const  [NonAcceptedUsersData, setNonAcceptedUser] = useState([]);
    const  [AcceptedUsersData, setAcceptedUser] = useState([]);





    const [update, setUpdate] = useState(true);

    const [selectedRows,setSelectedRows] = useState([]);

    const MyDatagrid = (props) =>{

        const data = props.users;
        
        return (
            
            <DataGrid sx={{marginTop:"100px",height:"500px"}} checkboxSelection hideFooter 
            columns={columns}
            rows = {data}
            onSelectionModelChange = {(some) => {
                console.log(some);
                // setSelectedRows(some);
                // const ids = new Set(newSelectionModel);
                // const selectedRows = newSelectionModel.rows.filter((row) => ids.has(row.id),);
                // setSelectedRows(selectedRows);
            }}
           
            />
        )
    }
    




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
            })
    }

  

    async function acceptUsers(props) {
        setSendAccept(false);
        // axios.post()
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
                        Welcome {myUser.first_name}
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

            <Box sx={{height:"200px"}}>
            <div>
                {selectedRows}
            </div>
            
            </Box>


        </Container>
        
    )
}

export default Admin