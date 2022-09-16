import React,{useState, useEffect, useMemo} from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useGetUserByID from '../../hooks/useGetUserByID';
import useGetUserByUsername from '../../hooks/useGetUserByUsername';

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

    const [user_id,set_user_id]=useState(null);
    const [contacts,set_contacts]=useState(null);
    const uname=localStorage.getItem('username');
    const [contacts_ids,set_contacts_ids]=useState([]);
    const [contacts_names,set_contacts_names]=useState([]);

    const get_user_by_id=useGetUserByID();
    const get_user_by_username=useGetUserByUsername();

    useEffect(()=>{
        const get_name=async()=>{
            const name=await get_user_by_username(uname);
            set_user_id(name.id);
            user_id && axiosPrivate.get(`messagesList/${user_id}`)
            .then((response)=>{
                set_contacts(response.data);
            })
            .catch((error)=>{
                console.error(error);
            })
        }
        get_name()
        .catch((error)=>{
            console.error(error);
        })

    },[axiosPrivate,uname,user_id])
    useEffect(()=>{
        contacts?.forEach((element)=>{
            const contact_id=[...contacts_ids,element.seller_id];
            set_contacts_ids(contact_id);
        })
    },[contacts])
    useEffect(()=>{
        contacts_ids?.forEach((element)=>{
            const get_name=async()=>{
                const name=await get_user_by_id(element);
                const contact_name=[...contacts_names,name.username];
                set_contacts_names(contact_name);
            }
            get_name()
            .catch((error)=>{
                console.error(error);
            })
        })
    },[contacts_ids])


  return (
    <Container>
        {
            contacts_names?.map((name)=>{
                return(
                    <p key={name}>
                        {name}
                    </p>
                )
            })
        }
    </Container>
  )
}

export default MessagesList