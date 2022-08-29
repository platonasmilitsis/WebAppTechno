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
// import UserService from '../services/user_service';
import { useNavigate} from 'react-router-dom';
// import TokenService from '../services/token_service';
// import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import useRefreshToken from '../hooks/useRefreshToken';
import useAxiosPrivate from '../hooks/useAxiosPrivate';


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
        "&.MuiButton-outlined": {
            backgroundColor: "#e67e22",
            color:"white",
            borderColor: "#e67e22"
        },
        
        fontWeight:"bold",
        width:"30%",
        height:"40px",
        marginLeft:"20px"
    }
    

}











const Admin = () =>{


    const username = localStorage.getItem("username");
    const axiosPrivate = useAxiosPrivate();


    const refresh = useRefreshToken();


    const columns = [
        {field:"id",hide:true},
        {field:"username",headerName:"Username",width:150},
        {field:"first_name",headerName:"First Name",width:150},
        {field:"last_name",headerName:"Last Name",width:150},
        {field:"telephone",headerName:"Telephone",width:150},
        {field:"email",headerName:"E-mail",width:150},
        {field:"address",headerName:"Address",width:150},
        {field:"tin",headerName:"Tin",width:150}
    ]
    
    

    const [rows, setRows] = useState([]);


    
    let navigate = useNavigate();

    const [isAdmin,setAdmin] = useState(true);
    const [myUser,setUser] = useState([]);
    const  [NonAcceptedUsersData, setNonAcceptedUser] = useState([]);
    const [sendAccept, setSendAccept] = useState(false);
    // const access_token = TokenService.get_local_access_token();
    // const refresh_token = TokenService.get_local_access_token();
    const  [AcceptedUsersData, setAcceptedUser] = useState([]);
    const [update, setUpdate] = useState(true);
    const [showNonAccepted, setShowNonAccepted] = useState(true);
    const [showAccepted, setShowAccepted] = useState(false);
    const classes = useStyles()

    const [selectedRows, setSelectedRows] = useState([]);




    
    const onRowsSelectionHandler = (ids) => {
        const selectedIds = new Set(ids);
        console.log(selectedIds);
        setRows(new Set(ids));

    };


          




    async function fetchmyUser() {
        setAdmin(false);
        axios.get(`http://localhost:8080/users/username=${username}`)
        .then((res) => {
            setUser(res.data);
        })
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



    const MyDatagrid = (props) =>{
     
        const [myRows,setRowsId] = useState([]);


        const onHandleAccept = async (event) =>{

            try{
                const response = await axiosPrivate.put(`users/accept?id=${myRows}`);
                console.log(response?.data);
                setUpdate(true);
            } catch(err) {
                console.error(err);
            }
            
        }

        const onHandleDelete = async (event) =>{
            try{
                const response = await axiosPrivate.delete(`users?id=${myRows}`);
                console.log(response?.data);
                setUpdate(true);
            } catch(err) {
                console.error(err);
            }
            
        }


        return (
            <Box sx = {{height:"80%",width:"90%"}}>
                <DataGrid sx={{marginTop:"100px",height:"500px"}} checkboxSelection hideFooter 
                columns={columns}
                rows = {props.users}
                getRowId = {(row) => row.id}
                loading = {props.loading}
                disableSelectionOnClick
                onSelectionModelChange = {(ids) => setRowsId(ids)}
                
                />
                <Box className='buttons-container' sx={{marginTop:"30px"}}>
                {
                    showNonAccepted && <div>
                    <Button onClick={onHandleAccept} sx={{marginLeft:"20px"}} variant="contained"> Accept</Button>
                    <Button variant="contained" onClick={onHandleDelete}
                    style={{ marginLeft:"20px",backgroundColor:"#8b0000"}}>Delete</Button>
                    </div>
                }
                {
                    showAccepted &&
                    <div>
                    <Button variant="contained" onClick={onHandleDelete}
                    style={{backgroundColor:"#8b0000"}}>Delete</Button>
                    </div>
                }          
                </Box>
            </Box>
        )
    }







    async function acceptUsers(props) {
        setSendAccept(false);
        // axios.post()
    }



    {isAdmin && fetchmyUser()}
        



    // if(myUser.admin===false){
    //     return <Navigate to="/home" replace/>;
    // }

        {update && fetchUsers()}



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

        const handleHome = event => {
            navigate("/home");
        }

        return (

            <Container>
                <AppBar sx={{backgroundColor:"#e67e22"}}>
                    <Toolbar sx={{justifyContent:"flex-start"}}>

                        <Typography 
                            sx={styles.text}>
                            Welcome {myUser.first_name}
                        </Typography>


                        <Button  variant="outlined" sx={styles.button}
                        onClick = {refresh}
                        >Refresh?</Button>

                        <Button  variant="outlined" sx={styles.button}
                        onClick = {handleClickNonAccepted}
                        >Non-Accepted-Users</Button>
                    
                        <Button variant="outlined" sx={styles.button}
                        onClick = {handleClickAccepted}
                        >Accepted-Users</Button>

                        <Button variant="outlined" sx={styles.button}
                        onClick = {handleHome}
                        >Hit-it</Button>
                        

                        </Toolbar>
                </AppBar>

                <Box className='main-container'>
                    {showNonAccepted && <MyDatagrid users={NonAcceptedUsersData} loading={!NonAcceptedUsersData.length}/>}
                    {showAccepted &&  <MyDatagrid users={AcceptedUsersData} loading={!AcceptedUsersData.length}/>}    
                </Box>


            </Container>
            
        )
    
}

export default Admin