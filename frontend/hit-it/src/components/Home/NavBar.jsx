import React,{useState,useEffect,useRef, useCallback} from 'react'
import styled from 'styled-components'
import Message from '../Chat/Message';
import AccountModal from '../Global/AccountModal';
import { StopPropagation } from '../Chat/StopPropagation';
import useGetUserByID from '../../hooks/useGetUserByID';
import useGetUserByUsername from '../../hooks/useGetUserByUsername';

const Container=styled.div`
    height:60px;
    -drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
`;

const Wrapper=styled.div`
    padding:10px 20px;
    display:flex;
    align-items:center;
    justify-content:space-between;
`;

const Right=styled.div`
    flex:1;
    display:flex;
    align-items:center;
    justify-content:flex-end;
    margin-top:10px;
    @media (max-width: 1000px) {
        justify-content:flex-end;
    }
`;

const MessengerContainer=styled.div`
    overflow-x:scroll;
    position:fixed;
    margin-right:100px;
    bottom:0;
    z-index:3;
    display:flex;
    flex:1;
    flex-direction:row;
    width:1530px;
    justify-content:safe flex-end;
    flex-flow:row nowrap;
    @media (max-width: 1000px) {
        width:307px;
    }
`;

const NavBar = () => {

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
        get_id()
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
        <Wrapper>
            <Right>
                <StopPropagation.Provider value={{clicked_name,set_clicked_name,contacts_names}}>
                    <AccountModal/>
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
            </Right>
        </Wrapper>
    </Container>
  )
}

export default NavBar
