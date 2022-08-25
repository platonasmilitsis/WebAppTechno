import React, {useState} from 'react'
import styled from 'styled-components'
import { useNavigate} from 'react-router-dom';
import TokenService from '../../services/token_service';
import UserService from '../../services/user_service';

const Container = styled.div`
    height:420px;
    width:380px;
    background-color:white;
    display: flex;
    flex-direction: column;
    border-radius:10px;
    align-items:center;
    -drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
`; 

const TitleContainer=styled.div`
  display:flex;
  align-items:center;
  text-align:center;
  margin-top:20px;
`;

const Title = styled.p`
  font-size: 22px;
  font-weight: normal;
  font-family: 'Arial', sans-serif;
  opacity:0.8;
  width:300px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const TextContainer=styled.div`
  margin-top:10px;
`;

const LoginText=styled.h2`
  font-family: 'Arial', sans-serif;
  font-size:14px;
  font-weight:300;
  opacity:0.7;
  margin-top:10px;
  margin-left:5px;
`;

const Input = styled.input`
  flex: 1;
  width:280px;
  border:2px;
  height:12px;
  border-style:solid;
  border-color:#e67e22;
  border-radius:5px;
  outline:none;    
  margin: 10px 0;
  padding: 10px;
  ::placeholder{
      font-size:12px;
      opacity:0.3;
  }
`;

const ButtonDiv=styled.div`
  display:flex;
  justify-content:center;
`;

const Button = styled.button`
  border: none;
  padding: 15px 20px;
  background-color:#e67e22 ;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  margin-top:25px;
  border-radius:10px;
  width:100%;
  height:50px;
  font-weight:1000;
  &:hover{
    border:2px;
    border-style:solid;
    border-color:grey;
    box-sizing:border-box;
    }
`;

const RegisterContainer=styled.div`
  text-align:center;
  margin-top:25px;
`;

const RegisterText=styled.h2`
  font-family: 'Arial', sans-serif;
  font-size:16px;
  font-weight:500;
  text-decoration: underline;
  cursor: pointer;
`;

const LineContainer=styled.div`
  position:relative;
  display:flex;
  justify-content:center;
  margin-top:20px;
`;

const Line=styled.hr`
  width:320px;
  opacity:0.3;
  position:absolute;
`;

const ErrorMessage=styled.p`
  color:red;
  font-size:12px;
  margin-bottom:5px;
  margin-left:5px;
  position:absolute;
`;

const Login = () => {

  let navigate=useNavigate();

  const [username,set_username]=useState(null);
  const [password,set_password]=useState(null);
  const [error,set_error]=useState(null);

  const handle_submit=(e)=>{
    e.preventDefault();
    set_error(null);
  }

  const login=()=>{

    const credentials={
      username:username,
      password:password
    }

    fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
    .then((response)=>response.json())
    .then((data)=>{
      TokenService.set_user(data);
      const user=TokenService.get_user();
      console.log(user);
    })
    .catch((error)=>{
      console.error(error);
      if(error instanceof SyntaxError){
        throw new Error("Wrong Credentials")
      }
      else{
        throw new Error("HTTP Error");
      }
    })
    .then()
    .catch((error)=>{
      if(`${error.message[0]}`==="W"){
        set_error("Λάθος όνομα χρήστη ή κωδικός")
        return Promise.reject("Wrong Credentials")
      }
      else{
        navigate("/error");
      }
    })
    .then(()=>{
      fetch(`http://localhost:8080/users/username=${username}`)
      .then((response)=>response.json())
      .then((data)=>{
        console.log(data);
        if(data.accepted){
          if(data.admin){
            navigate("/admin");
          }
          else{
            navigate("/home");
          }
        }
        else{
          set_error("Αναμένεται έγκριση από τον διαχειριστή");
          return Promise.reject("Non Accepted User");
        }
      })
      .catch((error)=>{
        console.error(error);
      })
    })
    .catch((error)=>{
      console.error(error);
    })
  }

  return (
    <Container>
      <TitleContainer>
        <Title>
          Συνέχεια με τον λογαριασμό σου
        </Title>
      </TitleContainer>
      <Form onSubmit={handle_submit}>
      <TextContainer>
      <LoginText>
        Όνομα Χρήστη
      </LoginText>
      <Input type = "text" placeholder="Εισάγετε το Όνομα Χρήστη" onChange={(e)=>{set_username(e.target.value)}}/>
      <LoginText>
        Κωδικός Πρόσβασης
      </LoginText>
      <Input type = "password" placeholder="Εισάγετε τον Κωδικό Πρόσβασης" onChange={(e)=>{set_password(e.target.value)}}/>
      <ErrorMessage>{error}</ErrorMessage>
      </TextContainer>
      <ButtonDiv>
        <Button onClick={login}>
          Σύνδεση
        </Button>
      </ButtonDiv>
      <LineContainer>
        <Line/>
      </LineContainer>
      <RegisterContainer>
      <RegisterText onClick={()=>navigate("/register")}>
        Δημιουργία νέου λογαρισμού
      </RegisterText>
      </RegisterContainer>
      </Form>
        
    </Container>
  );
};

export default Login;
