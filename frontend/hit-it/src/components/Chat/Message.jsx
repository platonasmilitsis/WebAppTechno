import React, {useContext, useEffect, useState} from 'react'
import styled from 'styled-components'
import { StopPropagation } from './StopPropagation';
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@mui/icons-material/Send';
import useGetUserByUsername from '../../hooks/useGetUserByUsername';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

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
  margin-left:270px;
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
  bottom:2px;
  margin-left:270px;
  cursor:pointer;
`;

const MessagesContainter=styled.div`
  position:absolute;
  overflow-y:scroll;
  margin-top:40px;
  height:330px;
  width:300px;
  
`;

const Chat=styled.div`
  background-color:${props=>props.sender_id===props.uid?"#515a5a":"#95a5a6"};
  max-width:40%;
  width:fit-content;
  block-size:fit-content;
  margin-bottom:1px;
  border-radius:10px;
  margin-left:${props=>props.sender_id===props.uid?"auto":"5px"};
  margin-right:${props=>props.sender_id===props.uid?"5px":"auto"};
`;

const Talk=styled.p`
  font-family: 'Arial', sans-serif;
  font-size:16px;
  padding:8px;
`;

const Form=styled.form``;

const Message = (props) => {

  const axiosPrivate=useAxiosPrivate();

  const {set_clicked_name}=useContext(StopPropagation);

  const get_user_by_username=useGetUserByUsername();

  // const ScrollEnd=()=> {
  //   const el=useRef();
  //   useEffect(()=>el.current.scrollIntoView());
  //   return <div ref={el}/>;
  // };


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
    .catch(()=>{});
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
    .catch(()=>{})
  },[message_id,messages])

  const [form_value,set_form_value]=useState('');

  const get_date=()=>{
    var today=new Date();
    var date=today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + 
        ' '+today.getHours() + ':' + today.getMinutes();
    return date;
  }

  const handle_submit=async(e)=>{
    e.preventDefault();
    const headers={
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    }
    const message={
      message:form_value,
      is_read:false,
      sender_id:props.uid,
      messages_list_id:message_id,
      time:get_date()
    };
    axiosPrivate.post(`messagesList/${message_id}`,message,{headers})
    .catch((error)=>console.error(error));
    set_form_value('');
  }


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
      <MessagesContainter id="chat-window">
          {
            messages && messages.map((value)=>{
              return(
                <Chat key={value.id} sender_id={value.sender_id} uid={props.uid}>
                  <Talk>
                    {value.message}
                  </Talk>
                </Chat>
              )
            })
          }
      {/* <ScrollEnd/> */}
      </MessagesContainter>
      <BottomDiv>
          <Form onSubmit={handle_submit}>
            <Input type='text' value={form_value} onChange={(e)=>set_form_value(e.target.value)}/>
          </Form>
        <SendIconContainer>
          <SendIcon fontSize='small' onClick={handle_submit}/>
        </SendIconContainer>
      </BottomDiv>
    </Container>
  )
}

export default Message