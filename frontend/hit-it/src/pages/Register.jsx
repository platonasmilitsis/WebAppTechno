import React from 'react'
import styled from 'styled-components'
import {Link} from "react-router-dom";


const Logo=styled.h1`
    font-weight:900;
    font-size:70px;
    color:#e67e22;
    margin:20px; 
`;

const Container = styled.div`
    background-color:#eaeded;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items:center;
`; 

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  border-radius:10px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

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

const Register = () => {
  return (
    <Container>
        <Logo>
            hit-it
        </Logo>
        <Wrapper>
            <Title>Join hit-it</Title>
            <Form>
            <Input type="text" placeholder="First Name" />
            <Input type="text" placeholder="Last Name" />
            <Input type="text" placeholder="Username" />
            <Input type="text" placeholder="Email" />
            <Input type="password" placeholder="Password" />
            <Input type="password" placeholder="Confirm password" />
            <Link type='submit' to={"./Approval"}>
                <Button>Sign Up</Button>
            </Link>
            <Link to={"/"}  style={{color: "black"}}>
                Log In
            </Link>
            </Form>
        </Wrapper>
    </Container>
  );
};

export default Register;