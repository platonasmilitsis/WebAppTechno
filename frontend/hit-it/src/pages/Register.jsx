import React, {useState} from 'react'
import styled from 'styled-components'
import { useNavigate,Link} from 'react-router-dom';

const PageContainer=styled.div`
  height:200px;
`;

const Logo=styled.h1`
    font-weight:900;
    font-size:70px;
    color:#e67e22;
`;

const Container = styled.div`
    background-color:#eaeded;
    display: flex;
    flex-direction: column;
    align-items:center;
`; 

const RegisterText=styled.h2`
  font-family: 'Arial', sans-serif;
  font-size:22px;
  font-weight:300;
  margin-bottom:20px;
  opacity:0.7;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  border-radius:10px;
  background-color: white;
  min-width:400px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 8px 0;
  padding: 10px;
`;

const ButtonDiv=styled.div`
  display:flex;
  justify-content:center;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color:#e67e22 ;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  margin-top:20px;
  border-radius:10px;
`;

const ErrorMessage=styled.p`
  color:red;
  font-size:12px;
  margin-bottom:5px;
  margin-left:5px;
`;

const Field=styled.p`
  font-family: 'Arial', sans-serif;
  font-size:15px;
  font-weight:50;
  opacity:0.8;
  margin-left:5px;

`;

const LinkDiv=styled.div`
  margin-top:-10px;
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
      errors.first_name="Το Όνομα είναι υποχρεωτικό";
    }
    if(!last_name){
      errors.last_name="Το Επώνυμο είναι υποχρεωτικό";
    }
    if(!username){
      errors.username="Το Όνομα Χρήστη είναι υποχρεωτικό";
    }
    if(!email){
      errors.email="Το Email είναι υποχρεωτικό";
    }
    if(!tin){
      errors.tin="Το ΑΦΜ είναι υποχρεωτικό";
    }
    if(!password){
      errors.password="Ο Κωδικός Πρόσβασης είναι υποχρεωτικός";
    }
    if(!confirm_password){
      errors.confirm_password="Η επιβεβαίωση κωδικού είναι υποχρεωτική";
    }
    if(confirm_password && password!==confirm_password){
      errors.confirm_password="Οι Κωδικοί Πρόσβασης πρέπει να ταιριάζουν";
    }
    if(isNaN(tin)){
      errors.tin="Το ΑΦΜ πρέπει να είναι αριθμός";
    }
    if(telephone && isNaN(telephone)){
      errors.telephone="Το τηλέφωνο πρέπει να είναι αριθμός";
    }
    /* eslint-disable no-useless-escape */
    let mail_format=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(email && !email.match(mail_format)){
      errors.email="Το Email πρέπει να έχει σωστή μορφή";
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
                password:password===confirm_password?password:null,
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

    .then((response)=>response.json())
    .then((data) => {
      console.log(data);
      try{
        if(data.message[0]==="$"){
          set_used_email("Το Email "+email+" χρησιμοποιείται ήδη");
          set_used_username("Το Όνομα Χρήστη "+username+" χρησιμοποιείται ήδη");
        }
        else if(data.message[0]==="E"){
          set_used_email("Το Email "+email+" χρησιμοποιείται ήδη");
          console.log(email);
        }
        else if(data.message[0]==="U"){
          set_used_username("Το Όνομα Χρήστη "+username+" χρησιμοποιείται ήδη");
          console.log(username);
        }
        console.log(data.message);
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
    .catch(()=>navigate("/error"))

  }

  return (
    <PageContainer>
    <Container>
        <Logo>
            hit-it
        </Logo>
        <RegisterText>
          Δημιουργία Λογαριασμού
        </RegisterText>
        <Wrapper>
            <Form onSubmit={handle_submit}>
                <Field>
                  Όνομα*
                </Field>
              <Input type="text" placeholder="Εισάγετε το Όνομά σας" onChange={(e)=>{set_first_name(e.target.value)}}/>
              <ErrorMessage>{errors.first_name}</ErrorMessage>
                <Field>
                  Επώνυμο*
                </Field>
              <Input type="text" placeholder="Εισάγετε το Επώνυμό σας" onChange={(e)=>{set_last_name(e.target.value)}}/>
              <ErrorMessage>{errors.last_name}</ErrorMessage>
                <Field>
                  Όνομα Χρήστη*
                </Field>
              <Input type="text" placeholder="Εισάγετε το Όνομα Χρήστη" onChange={(e)=>{set_username(e.target.value)}}/>
              <ErrorMessage>{errors.username}</ErrorMessage>
              <ErrorMessage>{used_username}</ErrorMessage>
                <Field>
                  Email*
                </Field>
              <Input type="text" placeholder="Εισάγετε το Email σας" onChange={(e)=>{set_email(e.target.value)}}/>
              <ErrorMessage>{errors.email}</ErrorMessage>
              <ErrorMessage>{used_email}</ErrorMessage>
                <Field>
                  ΑΦΜ*
                </Field>
              <Input type="text" placeholder="Εισάγετε το ΑΦΜ σας" onChange={(e)=>{set_tin(e.target.value)}}/>
              <ErrorMessage>{errors.tin}</ErrorMessage>
                <Field>
                  Κωδικός Πρόσβασης*
                </Field>
              <Input type="password" placeholder="Εισάγετε τον Κωδικό Πρόσβασης" onChange={(e)=>{set_password(e.target.value)}}/>
              <ErrorMessage>{errors.password}</ErrorMessage>
                <Field>
                  Επιβεβαίωση Κωδικού*
                </Field>
              <Input type="password" placeholder="Επαναλάβετε τον Κωδικό Πρόσβασης" onChange={(e)=>{set_confirm_password(e.target.value)}}/>
              <ErrorMessage>{errors.confirm_password}</ErrorMessage>
                <Field>
                  Τηλέφωνο
                </Field>
              <Input type="text" placeholder="Εισάγετε το Τηλέφωνό σας" onChange={(e)=>{set_telephone(e.target.value)}}/>
              <ErrorMessage>{errors.telephone}</ErrorMessage>
                <Field>
                  Διεύθυνηση
                </Field>
              <Input type="text" placeholder="Εισάγετε τη Διεύθυνσή σας" onChange={(e)=>{set_address(e.target.value)}}/>
              <ButtonDiv>
                <Button onClick={register}>
                  Εγγραφή
                </Button>
              </ButtonDiv>
              <LinkDiv>
              <Link to={"/"}  style={{color: "black"}}>
                  Σύνδεση
              </Link>
              </LinkDiv>
            </Form>
        </Wrapper>
    </Container>
    </PageContainer>
  );
};

export default Register;