import React, {useContext} from 'react'
import styled from 'styled-components'
import { StopPropagation } from './StopPropagation';
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@mui/icons-material/Send';

const Container=styled.div`
    background-color:#7f8c8d;
    min-height:400px;
    min-width:300px;
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

const Message = (props) => {

  const {set_clicked_name}=useContext(StopPropagation);

  const handle_click=()=>{
    set_clicked_name((current)=>
      current.filter((curr)=>curr!==props.name));
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