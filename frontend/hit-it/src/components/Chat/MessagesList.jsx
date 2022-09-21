import React,{useState, useEffect, useContext} from 'react'
import styled from 'styled-components'
import useGetUserByID from '../../hooks/useGetUserByID';
import useGetUserByUsername from '../../hooks/useGetUserByUsername';
import PersonIcon from '@mui/icons-material/Person';
import { StopPropagation } from './StopPropagation';

const Container=styled.div`
    background-color:#7f8c8d;
    height:215px;
    width:150px;
    z-index:3;
    border-radius:5px;
    overflow-y:scroll;
    border-style:groove;
    @media (max-width: 1000px) {
        height:100px;
        width:100px;
        margin-left:-55px;
        margin-top:-8px;
    }
    position:absolute;
    margin-left:-82px;
    margin-top:-5px;
`;

const ContactContainer=styled.div`
    display:flex;
    flex-direction:row;
    height:30px;
    border-style:outset;
    align-items:center;
    &:hover{
        background-color:#bdc3c7;
    }
    cursor:pointer;
    justify-content:flex-start;
    @media (max-width: 1000px) {
        height:28px;
    }
`;

const IconContainer=styled.div`
    margin-right:10px;
    margin-top:5px;
    margin-left:5px;
`;

const Name=styled.p`
    font-family: 'Arial', sans-serif;
    font-size:18px;
    font-weight:500;
    @media (max-width: 1000px) {
        font-size:16px;
    }
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
`;

const MessagesList = () => {

    const [user_id,set_user_id]=useState(null);
    const [contacts,set_contacts]=useState(null);
    const uname=localStorage.getItem('username');
    // const [contacts_names,set_contacts_names]=useState(['aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa','b','c','d','e','f','g','h','i','j']);
    const [contacts_names,set_contacts_names]=useState([]);

    const get_user_by_id=useGetUserByID();
    const get_user_by_username=useGetUserByUsername();
    

    useEffect(()=>{
        const get_id=async()=>{
            const name=await get_user_by_username(uname);
            set_user_id(name.id);
        }
        get_id()
        .catch((error)=>console.error(error));
    },[uname,user_id,get_user_by_username])

    useEffect(()=>{
        const get_contacts=async()=>{
            user_id && fetch(`http://localhost:8080/messagesList/${user_id}`)
            .then((response)=>response.json())
            .then((data)=>{
                set_contacts(data);
            })
            .catch((error)=>console.error(error));
        }
        get_contacts()
        .catch((error)=>console.error(error));
    },[user_id])

    useEffect(()=>{
        const get_contact=async(element)=>{
            const name=await get_user_by_id(element.seller_id);
            if(!contacts_names.includes(name.username)){
                set_contacts_names([...contacts_names,name.username]);
            }
        }
        contacts?.forEach((element)=>{
            get_contact(element);
        })
    },[contacts,get_user_by_id,contacts_names,set_contacts_names])


    const [open_chat,set_open_chat]=useState(false);
    const [contact,set_contact]=useState(null);

    const {clicked_name,set_clicked_name}=useContext(StopPropagation);


    const handle_click=async(str)=>{
        set_open_chat(!open_chat);
        set_contact(str);
    }



    useEffect(()=>{
        if(!clicked_name.includes(contact)){
            const cont=[...clicked_name,contact];
            set_clicked_name(cont);
        }
    },[contact,set_clicked_name,clicked_name])
    
    
    return(
        <div style={{position:"relative"}}>
        {
            !open_chat && 
                <Container>
                {
                    contacts_names?.map((name)=>{
                        return(
                            <ContactContainer key={name} onClick={()=>handle_click(name)}>
                                <IconContainer>
                                    <PersonIcon fontSize='medium'/>
                                </IconContainer>
                                    <Name>
                                        {name}
                                    </Name>
                            </ContactContainer>
                        )
                    })
                }
                        
            </Container>
        }
        
        
        </div>
    )

  
}

export default MessagesList