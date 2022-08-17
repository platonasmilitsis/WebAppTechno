import React, {useState} from 'react'
import styled from 'styled-components'
import { useNavigate,Link} from 'react-router-dom';


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

const ErrorMessage=styled.p`
  color:red;
  font-size:12px;
`;

const Register = () => {

  let navigate=useNavigate();

  const [first_name,set_first_name]=useState(null);
  const [last_name,set_last_name]=useState(null);
  const [username,set_username]=useState(null);
  const [email,set_email]=useState(null);
  const [tin,set_tin]=useState(null);
  const [password,set_password]=useState(null);
  const [confirm_password,set_confirm_password]=useState(null);
  const [telephone,set_telephone]=useState(null);
  const [address,set_address]=useState(null);

  const [errors,set_errors]=useState({});
  const [used_email,set_used_email]=useState(null);
  const [used_username,set_used_username]=useState(null);

  const handle_submit=(e)=>{
    e.preventDefault();
    set_used_email(null);
    set_used_username(null);
    set_errors(validate());
  }

  const validate=()=>{
    const errors={}
    if(!first_name){
      errors.first_name="Username is required";
    }
    if(!last_name){
      errors.last_name="Last Name is required";
    }
    if(!username){
      errors.username="Username is required";
    }
    if(!email){
      errors.email="Email is required";
    }
    if(!tin){
      errors.tin="Tin is required";
    }
    if(!password){
      errors.password="Password is required";
    }
    if(!confirm_password){
      errors.confirm_password="Confirm password is required";
    }
    if(confirm_password && password!==confirm_password){
      errors.confirm_password="Passwords must match";
    }
    if(isNaN(tin)){
      errors.tin="Tin must be a number";
    }
    /* eslint-disable no-useless-escape */
    let mail_format=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(email && !email.match(mail_format)){
      errors.email="Email must have correct format";
    }
    return errors;
  }

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
    if(email===null){
      // Some Uncaught Error from BackEnd, only for email
      set_email("");
    }
    fetch('http://localhost:8080/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    .then((response)=>response.json())
    .then((data) => {
      console.log(data);
      try{
        console.log(data.message);
        if(data.message[0]==="E"){
          set_used_email(data.message);
        }
        else if(data.message[0]==="U"){
          set_used_username(data.message);
        }
      }
      catch(error){
        // Won't redirect if everything is not solved
        // Will catch NULL data.message[0] of used email / username
        // So everything has been solved and can redirect
        console.log("Continue");
        navigate("/register/Approval");
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      throw new Error("HTTP ERROR");
    })
    .then()
    .catch(()=>navigate("/home/technology"))

  }

  return (
    <Container>
        <Logo>
            hit-it
        </Logo>
        <Wrapper>
            <Title>Join hit-it</Title>
            <Form onSubmit={handle_submit}>
            <Input type="text" placeholder="First Name *" onChange={(e)=>{set_first_name(e.target.value)}}/>
            <ErrorMessage>{errors.first_name}</ErrorMessage>
            <Input type="text" placeholder="Last Name *" onChange={(e)=>{set_last_name(e.target.value)}}/>
            <ErrorMessage>{errors.last_name}</ErrorMessage>
            <Input type="text" placeholder="Username *" onChange={(e)=>{set_username(e.target.value)}}/>
            <ErrorMessage>{errors.username}</ErrorMessage>
            <ErrorMessage>{used_username}</ErrorMessage>
            <Input type="text" placeholder="Email *" onChange={(e)=>{set_email(e.target.value)}}/>
            {<ErrorMessage>{errors.email}</ErrorMessage>}
            <ErrorMessage>{used_email}</ErrorMessage>
            <Input type="text" placeholder="TIN *" onChange={(e)=>{set_tin(e.target.value)}}/>
            <ErrorMessage>{errors.tin}</ErrorMessage>
            <Input type="password" placeholder="Password *" onChange={(e)=>{set_password(e.target.value)}}/>
            <ErrorMessage>{errors.password}</ErrorMessage>
            <Input type="password" placeholder="Confirm password *" onChange={(e)=>{set_confirm_password(e.target.value)}}/>
            <ErrorMessage>{errors.confirm_password}</ErrorMessage>
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