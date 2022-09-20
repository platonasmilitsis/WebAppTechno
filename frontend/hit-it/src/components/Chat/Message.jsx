import React, {useContext} from 'react'
import styled from 'styled-components'
import { StopPropagation } from './StopPropagation';

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
`;

const Button=styled.button`
  width:100px;
  height:100px;
`;

const Message = () => {

  const {set_open,clicked_name}=useContext(StopPropagation);

  return (
    <Container>
      {clicked_name && clicked_name}
      <Button onClick={()=>set_open(false)}/>
    </Container>
  )
}

export default Message