import {Fab} from "@mui/material";
import {Add} from "@material-ui/icons";
import styled from "styled-components";
import React, {useState} from "react";
// import SellProduct from "../Global/SellProduct";

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


// const Wrapper = styled.div`
//   width: 25%;
//   padding: 20px;
//   border-radius: 10px;
//   background-color: white;
// `;

const Back = styled.div`
  position: fixed;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.75);
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
`
// const Lvogo=styled.h1`
//     font-weight:900;
//     font-size:70px;
//     color:#e67e22;
//     margin:20px; 
// `;
// const Title = styled.h1`
//   font-size: 24px;
//   font-weight: 300;
// `;

// const Card = styled.div`
//   ${'' /* position: relative; */}
//   position:absolute;
//   z-index: 2;
//   background-color: white;
//   border-radius: 4px;
//   box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
//   padding: 1rem;
//   width: 60rem;
//   height: 30rem;
// `

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
// `;
// const Input = styled.input`
//   flex: 1;
//   min-width: 40%;
//   margin: 10px 0;
//   padding: 10px;
// `;


// const Button = styled.button`
//   width: 40%;
//   border: none;
//   padding: 15px 20px;
//   background-color:#e67e22 ;
//   color: white;
//   cursor: pointer;
//   margin-bottom: 10px;
// `;


// const FormContainer=styled.div`
//   box-shadow: 0 1px 4px rgba(0, 0, 0, 0);
//   position:absolute;
//   width:100%;
//   z-index:2;
//   display:flex;
//   justify-content:center;
//   margin-top:-140px;
// `;


// function NewItem(props) {
//     return <Container>
//         <Lvogo>
//             Πούλα το Άνθρωπε!
//         </Lvogo>
//         <Wrapper>
//             <Title>Πούλα την μάνα σου!</Title>
//             <Form>
//                 <Input placeholder="Όνομα Προϊόντος"/>
//                 <Input placeholder="Τιμή"/>
//                 <Input placeholder="Περιγραφή"/>
//                 <Button onClick = {props.onCal}>Πούλησε</Button>
//             </Form>
//         </Wrapper>
//     </Container>
// }


const SellContainer=styled.div`
    display:flex;
    width:50%;
    flex-direction:column;
    @media screen and (max-width:1800px) and (min-width:1500px){
        width:60%;
    }
    @media screen and (max-width:1501px) and (min-width:1000px){
        width:70%;
    }
    @media screen and (max-width:1001px) and (min-width:700px){
        width:80%;
    }
    @media screen and (max-width:701px) and (min-width:450px){
        width:90%;
    }
    @media screen and (max-width:451px){
        width:95%;
    }

    
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0);
    position:absolute;
    z-index:2;
    display:flex;
    justify-content:center;
    margin-top:-140px;
`;

const OutsideContainer=styled.div`
    background-color:inherit;
`;

const LogoContainer=styled.div`
    background-color:white;
    display:flex;
    justify-content:center;
    margin-left:25%;
    margin-right:25%;
    border-radius:10px 10px 0 0;
`;

const Logo=styled.h1`
    color:#e67e22; 
    font-weight:900;
    font-size:70px;
    @media (max-width: 1000px) {
        font-size:60px;
    }
`;

const FormContainer=styled.div`
    background-color:white;
    display:flex;
    flex-direction:column;
    border-radius:10px 10px 0 0;
`;

const Description=styled.p`
    font-family: 'Arial', sans-serif;
    font-size:30px;
    font-weight:bold;
    margin-top:30px;
    margin-bottom:10px;
    text-align:center;
    opacity:0.6;
    @media (max-width: 1000px) {
        font-size:25px;
    }
`;

const Form=styled.form`
`;

const Field=styled.p`
    font-family: 'Arial', sans-serif;
    font-size:18px;
    font-weight:normal;
    margin-left:5%;
    opacity:0.7;
    margin-top:15px;
`;

const InputDiv=styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
`;
const Input=styled.input`
    width:90%;
    ::placeholder{
      font-size:14px;
      opacity:0.3;
    }
    font-size:16px;
    height:24px;
    margin-top:10px;
    padding-left:5px;
    outline:none;    
`;

const ButtonDiv=styled.div`
    background-color:white;
    display:flex;
    justify-content:center;
    border-radius:0 0 10px 10px;
`;

const Button=styled.button`
    font-family: 'Arial', sans-serif;
    background-color:#e67e22;
    &:hover{
        border:2px;
        border-style:solid;
        border-color:grey;
        box-sizing:border-box;
    }
    border-radius:10px;
    border:none;
    width:40%;
    height:50px;
    color:white;
    font-weight:1000;
    font-size:18px;
    margin-top:30px;
    margin-bottom:20px;
    cursor:pointer;
`;

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

    const remain_open=(e)=>{
      e.stopPropagation();
    }

    const SellProduct=()=>{
      return (
        <SellContainer>
            <OutsideContainer onClick={backdropHandler}>
                <LogoContainer onClick={(e)=>remain_open(e)}>
                    <Logo>
                        hit-it
                    </Logo>
                </LogoContainer>
            </OutsideContainer>
            <FormContainer>
                <Description>
                    Πούλα το Προϊόν σου!
                </Description>
                <Form>
                    <Field>
                        Όνομα Προϊόντος*
                    </Field>
                    <InputDiv>
                        <Input type="text" placeholder="Εισάγετε το όνομά του προϊόντος"/>
                    </InputDiv>
                    <Field>
                        Περιγραφή Προϊόντος*
                    </Field>
                    <InputDiv>
                        <Input type="text" placeholder="Εισάγετε την περιγραφή του προϊόντος"/>
                    </InputDiv>
                    <Field>
                        Έναρξη Δημοπρασίας*
                    </Field>
                    <InputDiv>
                        <Input type="text" placeholder="Εισάγετε την τιμή έναρξης της δημοπρασίας"/>
                    </InputDiv>
                    <Field>
                        Λήξη Δημοπρασίας*
                    </Field>
                    <InputDiv>
                        <Input type="text" placeholder="Εισάγετε την τιμή λήξης της δημοπρασίας"/>
                    </InputDiv>
                    <Field>
                        Περιοχή Κατοικίας*
                    </Field>
                    <InputDiv>
                        <Input type="text" placeholder="Εισάγετε την περιοχή κατοικίας σας"/>
                    </InputDiv>
                    <Field>
                        Χώρα Διαμονής*
                    </Field>
                    <InputDiv>
                        <Input type="text" placeholder="Εισάγετε την χώρα διαμονής σας"/>
                    </InputDiv>
                    <Field>
                        Γεωγραφικό Πλάτος
                    </Field>
                    <InputDiv>
                        <Input type="text" placeholder="Εισάγετε το γεωγραφίκο πλάτος της κατοικίας σας"/>
                    </InputDiv>
                    <Field>
                        Γεωγραφικό Μήκος
                    </Field>
                    <InputDiv>
                        <Input type="text" placeholder="Εισάγετε το γεωγραφίκο μήκος της κατοικίας σας"/>
                    </InputDiv>
                    <Field>
                        Εικόνα Προϊόντος
                    </Field>
                    <InputDiv>
                        <Input type="text" placeholder="Εισάγετε το link της εικόνας του προϊόντος σας"/>
                    </InputDiv>
                </Form>
            </FormContainer>
            <ButtonDiv>
                <Button>
                    Υποβολή
                </Button>
            </ButtonDiv>
        </SellContainer>
      )
  }

    return (
        <Container>


            <Dee>
                <Fab color="primary" aria-label="add" onClick={buttonHandler}>
                    <Add/>
                </Fab>
            </Dee>

            {modalIsOpen && <Back onClick={backdropHandler}> <Backdrop/> </Back>}
            {modalIsOpen && <SellProduct onCal={backdropHandler}/>}
        </Container>


    );
}


export default FloatingButtonAdd;