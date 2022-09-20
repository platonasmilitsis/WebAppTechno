import React, {useContext} from 'react'
import styled from 'styled-components'
import { StopPropagation } from './StopPropagation';
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@mui/icons-material/Send';

const Container=styled.div`
    background-color:#7f8c8d;
    height:400px;
    width:300px;
    z-index:3;
    position:fixed;
    bottom:0;
    right:100px;
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
`;

const CloseIconContainer=styled.div`
  cursor:pointer;
  position:absolute;
  right:5px;
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
  right:8px;
  bottom:0;
  position:absolute;
`;

const Message = () => {

  const {set_open,clicked_name}=useContext(StopPropagation);

  return (
    <Container>
      <TopDiv>
        <PersonIconContainer>
          <PersonIcon/>
        </PersonIconContainer>
        <Name>
          {clicked_name}
        </Name>
        <CloseIconContainer>
          <CloseIcon fontSize='medium' onClick={()=>set_open(false)}/>
        </CloseIconContainer>
      </TopDiv>
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