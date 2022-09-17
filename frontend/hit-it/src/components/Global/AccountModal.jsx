import React,{useState, useMemo} from 'react'
import styled from 'styled-components'
import useCloseModal from '../../hooks/useCloseModal';
import { useNavigate } from 'react-router-dom';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MessagesList from '../Chat/MessagesList';

const Container=styled.div`
    position:relative;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    height:130px;
    width:150px;
    @media (max-width: 1000px) {
        width:100px;
    }
`;

const UserName=styled.h1`
    font-family: 'Arial', sans-serif;
    font-size:18px;
    font-weight:normal;
    top:40px;
    position:absolute;
    @media (max-width: 1000px) {
        font-size:16px;
        top:35px;
    }
`;

const IconContainer=styled.div`
    position:absolute;
    top:0;
    cursor:pointer;
    transform:scale(1.3);
    @media (max-width: 1000px) {
        transform:scale(1);
    }
`;

const UserInfoContainer=styled.div`
    display:flex;
    flex-direction:column;
    border-radius:5px;
    height:${props=>props.admin?"100px":"70px"};
    width:120px;
    position:absolute;
    text-align:center;
    position:relative;
    margin-top:${props=>props.admin?"34px":"8px"};
    background-color:#7f8c8d;
    @media (max-width: 1000px) {
        width:100px;
        margin-top:${props=>props.admin?"30px":"2px"};
    }
`;

const UserInfo=styled.p`
    font-family: 'Arial', sans-serif;
    font-size:16px;
    margin-top:10px;
    @media (max-width: 1000px) {
        font-size:14px;
        margin-bottom:8px;
    }
    cursor:pointer;
`;

const MenuItem=styled.div`
    cursor:pointer;
    margin-left:25px;
    @media (max-width: 1000px) {
        margin:0 auto;
    }
    font-size:16px;
    font-weight:normal;
`;

const AccountModal = () => {

    const [user,set_user]=useState(null);
    const [is_admin,set_is_admin]=useState(false);
    const floating_button=()=>{
        set_user(localStorage.getItem('username'));
        set_is_admin(localStorage.getItem('roles')?.includes("ADMIN"));
    }
    useMemo(()=>floating_button(),[]);

    let navigate=useNavigate();

    const logout=async()=>{
        localStorage.clear();
        navigate("/");
    }

    const [user_clicked,set_user_clicked]=useState(false);

    let ref=useCloseModal(()=>{
        set_user_clicked(false);
        set_messages(false);
    });

    const [messages,set_messages]=useState(false);


    return(
        user?
            <Container ref={ref}>
                <IconContainer>
                <AccountBoxIcon fontSize='large' onClick={()=>set_user_clicked(!user_clicked)}/>
                </IconContainer>
                <UserName>
                    {user}
                </UserName>
                {
                    user_clicked?
                    messages?
                    <MessagesList/>:
                    <UserInfoContainer admin={is_admin}>
                        {is_admin && 
                            <UserInfo onClick={()=>navigate("/admin")}>
                                Admin Panel
                            </UserInfo>}
                        <UserInfo onClick={()=>set_messages(!messages)}>
                            Συνομιλίες
                        </UserInfo>
                        <UserInfo onClick={logout}>
                            Αποσύνδεση
                        </UserInfo>
                    </UserInfoContainer>:
                    <></>
                }
            </Container>:
            <>
            <MenuItem onClick={()=>navigate("/register")}>
                Register
            </MenuItem>
            <MenuItem onClick={()=>navigate("/")}>
                Sign In
            </MenuItem>
        </>
    )
}

export default AccountModal