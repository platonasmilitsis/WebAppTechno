import React from 'react'
import styled from 'styled-components'


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

const Link = styled.a`
  margin: 5px 0px;
  font-size: 15px;
  text-decoration: underline;
  cursor: pointer;
`;


const Login = () => {
  return (
    <Container>
        <Logo>
            hit-it
        </Logo>
        <Wrapper>
            <Title>Log In to hit-it</Title>
            <Form>
            <Input placeholder="username" />
            <Input placeholder="password" />
            <Button>Login</Button>
            <Link>Forgot your Password?</Link>
            <Link>Create an account</Link>
            </Form>
        </Wrapper>
    </Container>
  );
};

export default Login;