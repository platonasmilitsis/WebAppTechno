import React, {useState,useEffect} from 'react'
import Axios from 'axios'
import styled from 'styled-components'
import { useNavigate,Link } from 'react-router-dom';


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

  let navigate=useNavigate();

  const [first_name,set_first_name]=useState(null);
  const [last_name,set_last_name]=useState(null);
  const [username,set_username]=useState(null);
  const [email,set_email]=useState(null);
  const [tin,set_tin]=useState(null);
  const [password,set_password]=useState(null);
  const [telephone,set_telephone]=useState(null);
  const [address,set_address]=useState(null);



  const register=()=>{
    const data ={
                username:username, 
                first_name:first_name,
                last_name:last_name,
                email:email,
                tin:tin,
                password:password,
                telephone:telephone,
                address:address,
                admin:false,
                accepted:false
                };
    
    fetch('http://localhost:8080/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then((response) =>{
      if(!response.ok){
        throw new Error("ALREADY IN USE");
      }
      return response.json();
    })
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
      throw new Error("HTTP ERROR");
    })
    .then()
    .catch(()=>navigate("/home/technology"))
    navigate("/register/Approval");

  }


  return (
    <Container>
        <Logo>
            hit-it
        </Logo>
        <Wrapper>
            <Title>Join hit-it</Title>
            <Form>
            <Input type="text" placeholder="First Name *" onChange={(e)=>{set_first_name(e.target.value)}}/>
            <Input type="text" placeholder="Last Name *" onChange={(e)=>{set_last_name(e.target.value)}}/>
            <Input type="text" placeholder="Username *" onChange={(e)=>{set_username(e.target.value)}}/>
            <Input type="text" placeholder="Email *" onChange={(e)=>{set_email(e.target.value)}}/>
            <Input type="text" placeholder="TIN *" onChange={(e)=>{set_tin(e.target.value)}}/>
            <Input type="password" placeholder="Password *" />
            <Input type="password" placeholder="Confirm password *" onChange={(e)=>{set_password(e.target.value)}}/>
            <Input type="text" placeholder="Telephone" onChange={(e)=>{set_telephone(e.target.value)}}/>
            <Input type="text" placeholder="Address" onChange={(e)=>{set_address(e.target.value)}}/>
            {/* <Link type='submit' to={"./Approval"}> */}
            <Button onClick={register}>
              Sign Up
            </Button>
            {/* </Link> */}
            <Link to={"/"}  style={{color: "black"}}>
                Log In
            </Link>
            </Form>
        </Wrapper>
    </Container>
  );
};

export default Register;