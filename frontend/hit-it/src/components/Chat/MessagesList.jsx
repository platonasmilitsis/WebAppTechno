import React,{useState, useEffect, useMemo} from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import useAxiosPrivate from "../../hooks/useAxiosPrivate"

const Container=styled.div`
    background-color:#7f8c8d;
    min-height:200px;
    width:150px;
    z-index:1;
    border-radius:5px;
    margin-top:138px;
    overflow-y:scroll;
    color:black;
    font-family: 'Arial', sans-serif;
    font-size:16px;
    font-weight:500;
`;

const MessagesList = () => {

    const axiosPrivate=useAxiosPrivate();
    let navigate=useNavigate();

    const [user,set_user]=useState(null);
    // const floating_button=()=>{set_user(localStorage.getItem('username'));}
    // useMemo(()=>floating_button(),[]);
    

    // const [messages,set_messages]=useState([]);

    const [user_id,set_user_id]=useState(null);
    const [contacts,set_contacts]=useState(null);
    const uname=localStorage.getItem('username');
    const [contacts_ids,set_contacts_ids]=useState(null);
    const [contacts_names,set_contacts_names]=useState(null);
    const [names,set_names]=useState(null);

    useEffect(()=>{
        console.log(uname);
        fetch(`http://localhost:8080/users/username=${uname}`)
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data);
            set_user_id(data.id);
            console.log(user_id);
            axiosPrivate.get(`messagesList/${user_id}`)
            .then((response)=>{
                console.log(response.data);
                set_contacts(response.data);
            })
            .catch((error)=>{
                console.error(error);
            })
        })
        .catch((error)=>{
            console.error(error);
        })

    },[axiosPrivate,uname,user_id])
    useEffect(()=>{
        var arr=[];
        contacts?.forEach((element)=>{
            // console.log(element);
            arr.push(element.seller_id);
        })
        set_contacts_ids(arr);
    },[contacts])
    useEffect(()=>{
        var names=[];
        contacts_ids?.forEach((element)=>{
            // console.log("id:",element);
            // DOESNT WORK
            fetch(`http://localhost:8080/users/${element}`)
            .then((response)=>response.json())
            .then((data)=>{
                console.log(data);
                names.push(data.username);
                console.log("username:",data.username);
            })
            .catch((error)=>{
                console.error(error);
            })
        })
        set_contacts_names(names);
        // console.log(names);
    },[contacts_ids])
    useEffect(()=>{
        console.log(contacts_names);
        // DOESNT WORK
        var nom=[];
        contacts_names?.forEach((element)=>{
            nom.push(element);
            console.log("nom",element);
        })
        set_names(nom);
    },[contacts_names])


  return (
    <Container>
        {
            // DOESNT WORK
            contacts_names?.map((name)=>{
                console.log("CONTACT NAME:",name);
            })
        }
        {   // DOESNT WORK
            names?.map((name)=>{
                console.log("name",name);
                {/* fetch(`http://localhost:8080/users/${id}`)
                .then((response)=>response.json())
                .then((data)=>{
                    console.log(data.username);
                })
                .catch((error)=>{
                    console.error(error);
                }) */}
            })
        }
        {   // WORKS
            contacts_ids?.map((id)=>{
                console.log("id",id);
            })
        }
    </Container>
  )
}

export default MessagesList