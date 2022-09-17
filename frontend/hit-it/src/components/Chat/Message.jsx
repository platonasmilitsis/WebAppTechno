import React from 'react'
import styled from 'styled-components'

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

const Message = (props) => {
  return (
    <Container>
      {props.send_contact}
    </Container>
  )
}

export default Message