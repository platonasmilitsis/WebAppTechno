import React, {useContext, useEffect, useState} from 'react'
import styled from 'styled-components'
import { StopPropagation } from './StopPropagation';
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@mui/icons-material/Send';
import useGetUserByUsername from '../../hooks/useGetUserByUsername';

const Container=styled.div`
    background-color:#7f8c8d;
    height:400px;
    width:300px;
    border-radius:5px;
    border-style:groove;
    display:flex;
    flex-direction:column;
`;

const TopDiv=styled.div`
  display:flex;
  justify-content:row;
  justify-content:flex-start;
  align-items:center;
  background-color:#515a5a;
`;

const PersonIconContainer=styled.div`
  margin-left:5px;
  margin-top:5px;
`;

const Name=styled.p`
    font-family: 'Arial', sans-serif;
    font-size:20px;
    font-weight:500;
    margin-left:10px;
    width:200px;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
`;

const CloseIconContainer=styled.div`
  cursor:pointer;
  position:absolute;
  margin-left:265px;
`;

const BottomDiv=styled.div`
  border-style:inset;
  background-color:#aab7b8;
  margin-top:340px;
`;

const Input=styled.input`
  width:250px;
  outline:none;
  border:none;
  background-color:#aab7b8;
  font-size:16px;
  display:flex;
  justify-content:center;
`;

const SendIconContainer=styled.div`
  position:absolute;
  bottom:0;
  margin-left:265px;
  cursor:pointer;
`;

const MessagesContainter=styled.div`
  position:absolute;
  overflow-y:scroll;
  margin-top:35px;
  height:50px;
  width:300px;
`;

const Chat=styled.p`

`;

const Message = (props) => {

  const {set_clicked_name}=useContext(StopPropagation);

  const get_user_by_username=useGetUserByUsername();


  const handle_click=()=>{
    set_clicked_name((current)=>
      current.filter((curr)=>curr!==props.name));
  }

  const [contact_id,set_contact_id]=useState(null);
  const [contacts,set_contacts]=useState(null);
  const [message_id,set_message_id]=useState(null);
  const [messages,set_messages]=useState(null);

  useEffect(()=>{
    const get_id=async()=>{
      const name=await get_user_by_username(props.name);
      set_contact_id(name.id);
    }
    get_id()
    .catch((error)=>console.error(error));
  },[get_user_by_username,props.name])

  useEffect(()=>{
    const get_contacts=async()=>{
        props.uid && fetch(`http://localhost:8080/messagesList/${props.uid}`)
        .then((response)=>response.json())
        .then((data)=>{
            set_contacts(data);
        })
        .catch((error)=>console.error(error));
    }
    get_contacts()
    .catch((error)=>console.error(error));
  },[props.uid])

  useEffect(()=>{
    contacts?.forEach((element)=>{
      if(
        (contact_id && contact_id===element.seller_id && props.uid===element.buyer_id)
          ||
        (contact_id && contact_id===element.buyer_id && props.uid===element.seller_id)
      ){
        set_message_id(element.id);
      }
    })
  },[contacts,contact_id,props.uid])

  useEffect(()=>{
    message_id && fetch(`http://localhost:8080/messagesList/${message_id}/all`)
    .then((response)=>response.json())
    .then((data)=>{
      set_messages(data);
    })
  },[message_id])


  return (
    <Container>
      <TopDiv>
        <PersonIconContainer>
          <PersonIcon/>
        </PersonIconContainer>
        <Name>
          {props.name}
        </Name>
        <CloseIconContainer>
          <CloseIcon fontSize='medium' onClick={()=>handle_click()}/>
        </CloseIconContainer>
      </TopDiv>
      <MessagesContainter>
          {
            messages && messages.map((value)=>{
              return(
                <Chat key={value.id}>
                  {value.message}
                </Chat>
              )
            })
          }
      </MessagesContainter>
      <BottomDiv>
        <Input type='text'/>
        <SendIconContainer>
          <SendIcon fontSize='small'/>
        </SendIconContainer>
      </BottomDiv>
    </Container>
  )
}

export default Message