import {Fab} from "@mui/material";
import {Add} from "@material-ui/icons";
import styled from "styled-components";
import React, {useState} from "react";

const Container = styled.div`
  position: center;
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const Dee = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
`;


const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  border-radius: 10px;
  background-color: white;
`;

const Back = styled.div`
  position: fixed;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.75);
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
`
const Lvogo=styled.h1`
    font-weight:900;
    font-size:70px;
    color:#e67e22;
    margin:20px; 
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Card = styled.div`
  position: relative;
  z-index: 2;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  padding: 1rem;
  width: 60rem;
  height: 30rem;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;


const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color:#e67e22 ;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

// const Link = styled.a`
//   margin: 5px 0px;
//   font-size: 15px;
//   text-decoration: underline;
//   cursor: pointer;
// `;



function NewItem(props) {
    return <Container>
        <Lvogo>
            Πούλα το Άνθρωπε!
        </Lvogo>
        <Wrapper>
            <Title>Πούλα την μάνα σου!</Title>
            <Form>
                <Input placeholder="Όνομα Προϊόντος"/>
                <Input placeholder="Τιμή"/>
                <Input placeholder="Περιγραφή"/>
                <Button onClick = {props.onCal}>Πούλησε</Button>
            </Form>
        </Wrapper>
    </Container>
}

function Backdrop(props) {
    return <div className='backdrop' onClick={props.onClick}/>;
}

function FloatingButtonAdd() {

    const [modalIsOpen, setModalIsOpen] = useState(false);

    function buttonHandler() {
        setModalIsOpen(true);
    }

    function backdropHandler() {
        setModalIsOpen(false);
    }

    return (
        <Container>


            <Dee>
                <Fab color="primary" aria-label="add" onClick={buttonHandler}>
                    <Add/>
                </Fab>
            </Dee>

            {modalIsOpen && <Back onClick={backdropHandler}> <Backdrop/> </Back>}
            {modalIsOpen && <Card> <NewItem onCal={backdropHandler}/></Card>}


        </Container>


    );
}


export default FloatingButtonAdd;