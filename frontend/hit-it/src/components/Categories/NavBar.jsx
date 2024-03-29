import React, {useState, useEffect, useRef, useCallback} from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import SearchBar from '../Global/SearchBar';
import AccountModal from '../Global/AccountModal';
import { StopPropagation } from '../Chat/StopPropagation';
import Message from '../Chat/Message';
import useGetUserByID from '../../hooks/useGetUserByID';
import useGetUserByUsername from '../../hooks/useGetUserByUsername';

const Container=styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    flex-wrap:wrap;
    /* Heights because results from search move the whole screen, 
    to not give absolute positioning that will cause more problems */
    height:60px;
    @media screen and (max-width: 1077px) and (min-width:650px) {
        height:180px;
    }
    @media (max-width:651px){
        height:160px;
    }
`;

const LogoContainer=styled.div`
    margin-left:30px;
    margin-top:30px;
    margin-right:60px;
    @media (max-width: 1000px) {
        margin-top:10px;
    }
`;

const Logo=styled.h1`
    font-weight:900;
    color:#e67e22; 
    font-size:50px;
    cursor:pointer;
    white-space:nowrap;
`;

const SearchContainter=styled.div`
    margin-top:50px;
    display:flex;
    @media (max-width: 1077px) {
        order:3;
        @media screen and (max-width:1077px) and (min-width:1000px){
            margin-left:200px;
        }
        @media screen and (max-width:1000px) and (min-width:950px){
            margin-left:150px;
        }
        @media screen and (max-width:950px) and (min-width:850px){
            margin-left:100px;
        }
        @media screen and (max-width:850px) and (min-width:750px){
            margin-left:70px;
        }
        @media screen and (max-width:750px) and (min-width:700px){
            margin-left:40px;
        }
        @media screen and (max-width:700px) and (min-width:660px){
            margin-left:15px;
        }
        @media screen and (max-width:660px) and (min-width:650px){
            margin-left:10px;
        }
        @media screen and (max-width:650px) and (min-width:600px){ 
            margin-left:100px;
        }
        @media screen and (max-width:600px) and (min-width:550px){
            margin-left:70px;
        }
        @media screen and (max-width:550px) and (min-width:500px){
            margin-left:50px;
        }
        @media (max-width:500px){
            margin-left:20px;
        }
  }
    
`;

const RightContainer=styled.div`
    justify-content:space-between;
    display:flex;
    flex-direction:row;
    margin-top:30px;
    @media (max-width: 1077px) {
        order:2;
        margin-right:20px;
        margin-top:10px;
    }
    margin-left:60px;
`;

const AccountModalContainer=styled.div`
    position:${props=>props.is_logged && "absolute"};
    margin-left:${props=>props.is_logged && "-100px"};
    margin-top:${props=>props.is_logged && "-50px"};
`;

const MessengerContainer=styled.div`
    overflow-x:scroll;
    position:fixed;
    bottom:0;
    z-index:3;
    display:flex;
    flex:1;
    flex-direction:row;
    width:80%;
    margin-left:10%;
    margin-right:10%;
    justify-content:safe flex-end;
    flex-flow:row nowrap;
    @media (max-width: 1000px) {
        width:307px;
    }
`;

const NavBar = () => {

    let navigate=useNavigate();

    const [clicked_name,set_clicked_name]=useState([]);

    const [user_id,set_user_id]=useState(null);
    const [contacts,set_contacts]=useState(null);
    const uname=localStorage.getItem('username');
    const [contacts_names,set_contacts_names]=useState([]);

    const get_user_by_id=useGetUserByID();
    const get_user_by_username=useGetUserByUsername();
    

    useEffect(()=>{
        const get_id=async()=>{
            const name=await get_user_by_username(uname);
            set_user_id(name.id);
        }
        uname && get_id()
        .catch(()=>{});
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

    const sort_by_name=useCallback(()=>{
        contacts_names.sort((a,b)=>a.toLowerCase().localeCompare(b.toLowerCase()));
    },[contacts_names])

    useEffect(()=>{
        const get_contact=async(element)=>{
            // Find whether is buyer or seller, same chat for both, different contact name
            if(element.seller_id!==user_id){
                const name=await get_user_by_id(element.seller_id);
                if(!contacts_names.includes(name.username)){
                    set_contacts_names([...contacts_names,name.username]);
                }
            }
            else{
                const name=await get_user_by_id(element.buyer_id);
                if(!contacts_names.includes(name.username)){
                    set_contacts_names([...contacts_names,name.username]);
                }
            }
        }
        contacts?.forEach((element)=>{
            get_contact(element)
            .catch(()=>{})
        })
        sort_by_name();
    },[contacts,get_user_by_id,contacts_names,set_contacts_names,sort_by_name,user_id])

    const ScrollEnd=()=> {
        const el=useRef();
        useEffect(()=>el.current.scrollIntoView());
        return <div ref={el}/>;
    };

  return (
    <Container>
        <LogoContainer>
            <Logo onClick={()=>navigate("/home")}>
                hit-it
            </Logo>
        </LogoContainer>
        <SearchContainter>
            <SearchBar/>
        </SearchContainter>
        <StopPropagation.Provider value={{clicked_name,set_clicked_name,contacts_names}}>
        <RightContainer>
            <AccountModalContainer is_logged={user_id}>
                <AccountModal/>
            </AccountModalContainer>
        </RightContainer>
        <MessengerContainer>
            {
                clicked_name?.map((value)=>{
                    return(
                        value && clicked_name.includes(value) &&
                            <div key={value}>
                            <Message name={value} uid={user_id}/>
                            <ScrollEnd/>
                            </div>
                    )
                })
            }
        </MessengerContainer>
        </StopPropagation.Provider>
    </Container>
  )
}

export default NavBar
