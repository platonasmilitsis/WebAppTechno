import React from 'react'
import styled from 'styled-components'

const Container=styled.div`
    ${'' /* background-color:white; */}
    display:flex;
    height:800px;
    width:500px;
    flex-direction:column;
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
`;

const Logo=styled.h1`
    color:#e67e22; 
    font-weight:900;
    font-size:60px;
    ${'' /* width:60%; */}
`;

const FormContainer=styled.div`
    background-color:white;
    display:flex;
    flex-direction:column;
    ${'' /* align-items:center; */}
`;

const Description=styled.p`
    font-family: 'Arial', sans-serif;
    font-size:20px;
    font-weight:normal;
    margin-top:10px;
    margin-bottom:10px;
`;

const Form=styled.form`

`;

const Field=styled.p`
    font-family: 'Arial', sans-serif;
    font-size:16px;
    font-weight:normal;
`;

const InputDiv=styled.div`
    display:flex;
    align-items:center;
`;
const Input=styled.input`
    width:450px;
`;

const SellProduct = () => {
  return (
    <Container>
        <OutsideContainer>
            <LogoContainer>
                <Logo>
                    hit-it
                </Logo>
            </LogoContainer>
        </OutsideContainer>
        <hr></hr>
        <FormContainer>
            <Description>
                Προσθήκη νέας δημοπρασίας
            </Description>
            <hr></hr>
            <Form>
                <Field>
                    Όνομα Προϊόντος
                </Field>
                <InputDiv>
                    <Input type="text" placeholder="Εισάγετε το Όνομά του Προϊόντος"/>
                </InputDiv>
                <Field>
                    Περιγραφή Προϊόντος
                </Field>
                <InputDiv>
                    <Input type="text" placeholder="Εισάγετε το Όνομά του Προϊόντος"/>
                </InputDiv>
            </Form>
        </FormContainer>
        <hr></hr>
    </Container>
  )
}

export default SellProduct