import React,{useState, useEffect} from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';

const Container=styled.div`
  ${'' /* background-color:red; */}
  height:50px;
  position:absolute;
  border-radius:10px;
  display:flex;
  flex-direction:row;
  justify-content:center;
  width:70%;
  margin-left:15%;
  margin-right:15%;
  @media (max-width: 1000px) and (min-width:600px){
    width:90%;
    margin-left:5%;
    margin-right:5%;
  }
  @media screen and (max-width: 601px){
    width:100%;
    margin-left:0;
    margin-right:0;
  }
  margin-top:40px;
`;

const Announcement=styled.p`
    font-family: 'Arial', sans-serif;
    font-size:26px;
    font-weight:bold;
    color:{props.color};
    text-decoration:underline;
    cursor:pointer;
    @media screen and (max-width: 601px){
        font-size:22px;
    }
`;

const AdminAnnouncement = () => {

    const [message,set_message]=useState(null);
    const [users,set_users]=useState(null);

    let navigate=useNavigate();

    useEffect(()=>{
        fetch("http://localhost:8080/users")
        .then((response)=>response.json())
        .then((data)=>{
            const remaining=data.filter((data)=>data.accepted===false);
            set_users(remaining);
            remaining.length===0?
                set_message("Δεν εκκρεμούν αιτήματα νέων χρηστών"):
                    set_message("Εκκρεμούν αιτήματα νέων χρηστών");
        })
        .catch((error)=>{
            console.error(error);
        })
    },[])

  return (
    <Container>
        <Announcement style={{color:users?.length>0?"red":"green"}} onClick={()=>navigate("/admin")}>
            {message}
        </Announcement>
    </Container>
  )
}

export default AdminAnnouncement