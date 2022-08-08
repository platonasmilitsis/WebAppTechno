import React from 'react'
import styled from 'styled-components'
import {Link} from "react-router-dom";

const Container = styled.div`
    background-color:;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items:center;
    margin-top:50px;
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

const LinkCont = styled.a`
  margin: 5px 0px;
  font-size: 15px;
  text-decoration: underline;
  cursor: pointer;
`;


const Login = () => {
  return (
    <Container>
            <Title>Log In to hit-it</Title>
            <Form>
            <Input type = "text" placeholder="username" />
            <Input type = "password" placeholder="password" />
            <Link to={"./home"}>
                <Button>Login</Button>
            </Link>
            <LinkCont>Forgot your Password?</LinkCont>
            <Link type='submit' to={"./register"}  style={{color: "black"}}>
                Create an account!
            </Link>
            </Form>
        
    </Container>
  );
};

export default Login;