import React, {useState} from 'react'
import styled from 'styled-components'
import { useNavigate,Link} from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const PageContainer=styled.div`
  height:200px;
  padding-top:10px;
  background-color:#eaeded; 
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
  padding: 20px;
  border-radius:10px;
  background-color: white;
  position:relative;
  @media (max-width: 650px) {
    width:400px;
  }
  display:flex;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-left:15px;
`;

const InputContainer=styled.div`
    display:flex;
    align-items:center;
    width:600px;
    flex-wrap:wrap;
    @media (max-width: 650px) {
      width:380px;
    }
`;

const Input=styled.input`
    height:30px;
    font-size:18px;
    ::placeholder{
        opacity:0.3;
        font-size:14px;
        margin-left:50px;
    }
    width:570px;
    @media (max-width: 650px) {
    width:350px;
  }
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
  margin-top:55px;
  margin-left:5px;
  position:absolute;
`;

const Field=styled.p`
  font-family: 'Arial', sans-serif;
  font-size:15px;
  font-weight:50;
  opacity:0.8;
  margin-left:5px;
  margin-bottom:7px;
  margin-top:17px;
`;

const LinkDiv=styled.div`
  margin-top:-10px;
`;

const IconDiv=styled.div`
  color:green;
  margin-left:2px;

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
  const [notifications,set_notifications]=useState({});
  const [user_icon,set_user_icon]=useState(false);
  const [mail_icon,set_mail_icon]=useState(false);

  const handle_submit=(e)=>{
    e.preventDefault();
    set_used_email(null);
    set_used_username(null);
    set_errors(validate());
    set_notifications({});
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
      errors.tin="Ο ΑΦΜ είναι υποχρεωτικός";
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
      errors.tin="O ΑΦΜ πρέπει να είναι αριθμός";
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

  const check_first_name=(str)=>{
    set_first_name(str);
    if(str.length===0){
      notifications.first_name=false;
      errors.first_name="Το Όνομα είναι υποχρεωτικό";
    }
    else{
      errors.first_name=null;
      notifications.first_name=true;
    }
  }

  const check_last_name=(str)=>{
    set_last_name(str);
    if(str.length===0){
      notifications.last_name=false;
      errors.last_name="Το Επώνυμο είναι υποχρεωτικό"
    }
    else{
      errors.last_name=null;
      notifications.last_name=true;
    }
  }

  const check_tin=(str)=>{
    set_tin(str);
    if(str.length===0){
      notifications.tin=false;
      errors.tin="Ο ΑΦΜ είναι υποχρεωτικός"
    }
    else{
      if(!isNaN(str)){
        errors.tin=null;
        notifications.tin=true;
      }
      else{
        notifications.tin=false;
        errors.tin="Ο ΑΦΜ πρέπει να είναι αριθμός";
      }
    }
  }

  const check_username=(str)=>{
    set_username(str);
    fetch("http://localhost:8080/users")
    .then(response=>response.json())
    .then((data)=>{
      try{
        const user_name=data.find(data=>data.username===str).username;
        if(user_name){
          set_used_username("Το Όνομα Χρήστη "+str+" χρησιμοποιείται ήδη");
          errors.username=null;
          set_user_icon(false);
        }
      }
      catch(error){
        set_used_username(null);
        errors.username=null;
        if(str){
          set_user_icon(true);
        }
        else{
          set_user_icon(false);
          errors.username="Το Όνομα Χρήστη είναι υποχρεωτικό";
        }
      }
    })
    .catch((error)=>{
      console.error(error);
      navigate("/error");
    })
  }

  const check_email=(str)=>{
    set_email(str);
    /* eslint-disable no-useless-escape */
    let mail_format=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(str && str.match(mail_format)){
      fetch("http://localhost:8080/users")
      .then(response=>response.json())
      .then((data)=>{
        try{
          const e_mail=data.find(data=>data.email===str).email;
          if(e_mail){
            set_used_email("Το Email "+str+" χρησιμοποιείται ήδη");
            errors.email=null;
            set_mail_icon(false);
          }
        }
        catch(error){
          set_used_email(null);
          errors.email=null;
          set_mail_icon(true);
        }
      })
      .catch((error)=>{
        console.error(error);
        navigate("/error");
      })
    }
    else if(str && !str.match(mail_format)){
      set_used_email(null);
      set_mail_icon(false);
      errors.email=null;
    }
    else{
      set_mail_icon(false);
      errors.email="Το Email είναι υποχρεωτικό";
    }
  }

  const check_password=(str)=>{
    set_password(str);
    if(str.length===0){
      notifications.password=false;
      errors.password="Ο Κωδικός Πρόσβασης είναι υποχρεωτικός";
      if(confirm_password){
        notifications.confirm_password=false;
        errors.confirm_password="Οι Κωδικοί Πρόσβασης πρέπει να ταιριάζουν";
      }
    }
    else{
      notifications.password=true;
      errors.password=false;
      if(confirm_password){
        if(str===confirm_password){
          errors.confirm_password=null;
          notifications.confirm_password=true;
        }
        else{
          notifications.confirm_password=false;
          errors.confirm_password="Οι Κωδικοί Πρόσβασης πρέπει να ταιριάζουν";
        }
      }
      
    }
  }

  const check_confirm=(str)=>{
    set_confirm_password(str);
    if(str.length===0){
      if(password){
        notifications.confirm_password=false;
        errors.confirm_password="Η Επιβεβαίωση Κωδικού είναι υποχρεωτική";
      }
      else{
        notifications.confirm_password=false;
        errors.confirm_password=null;
      }
    }
    else{
      if(password){
        if(str===password){
          notifications.confirm_password=true;
          errors.confirm_password=null;
        }
        else{
          notifications.confirm_password=false;
          errors.confirm_password="Οι Κωδικοί Πρόσβασης πρέπει να ταιριάζουν";
        }
      }
    }
  }

  const check_telephone=(str)=>{
    set_telephone(str);
    if(str){
      if(isNaN(str)){
        errors.telephone="Το τηλέφωνο πρέπει να είναι αριθμός";
        notifications.telephone=false;
      }
      else{
        errors.telephone=null;
        notifications.telephone=true;
      }
    }
    else{
      errors.telephone=null;
      notifications.telephone=false;
    }
  }

  const check_address=(str)=>{
    // No regex yet
    set_address(str);
    if(str){
      errors.address=null;
      notifications.address=true;
    }
    else{
      errors.address=null;
      notifications.address=false;
    }
  }

  const register=(e)=>{
    e.preventDefault();
    set_errors(validate());
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
        console.log(data.message[0]);
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
        <HelmetProvider>
            <Helmet>
                <meta charSet="utf-8" />
                <title>
                    Εγγραφή
                </title>
            </Helmet>
        </HelmetProvider>
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
            <InputContainer>
              <Input type="text" placeholder="Εισάγετε το Όνομά σας" onChange={(e)=>{check_first_name(e.target.value)}}/>
              {!notifications.first_name?
                  <ErrorMessage>{errors.first_name}</ErrorMessage>:
                <IconDiv>
                  <CheckIcon fontSize='small'/>
                </IconDiv>
                }
            </InputContainer>
            <Field>
              Επώνυμο*
            </Field>
            <InputContainer>
              <Input type="text" placeholder="Εισάγετε το Επώνυμό σας" onChange={(e)=>{check_last_name(e.target.value)}}/>
              {!notifications.last_name?
                <ErrorMessage>{errors.last_name}</ErrorMessage>:
                <IconDiv>
                  <CheckIcon fontSize='small'/>
                </IconDiv>
                }
            </InputContainer>
            <Field>
              Όνομα Χρήστη*
            </Field>
            <InputContainer>
              <Input type="text" placeholder="Εισάγετε το Όνομα Χρήστη" onChange={(e)=>{check_username(e.target.value)}}/>
              {!user_icon?
              <>
                <ErrorMessage>{errors.username}</ErrorMessage>
                <ErrorMessage>{used_username}</ErrorMessage>
              </>:
              <IconDiv>
                  <CheckIcon fontSize='small'/>
                </IconDiv>
              }
            </InputContainer>
            <Field>
              Email*
            </Field>
            <InputContainer>
              <Input type="text" placeholder="Εισάγετε το Email σας" onChange={(e)=>{check_email(e.target.value)}}/>
              {!mail_icon?
                <>
                <ErrorMessage>{errors.email}</ErrorMessage>
                <ErrorMessage>{used_email}</ErrorMessage>
                </>:
                <IconDiv>
                  <CheckIcon fontSize='small'/>
                </IconDiv>
              }
            </InputContainer>
            <Field>
              ΑΦΜ*
            </Field>
            <InputContainer>
              <Input type="text" placeholder="Εισάγετε το ΑΦΜ σας" onChange={(e)=>{check_tin(e.target.value)}}/>
              {!notifications.tin?
                  <ErrorMessage>{errors.tin}</ErrorMessage>:
                <IconDiv>
                  <CheckIcon fontSize='small'/>
                </IconDiv>
              }
            </InputContainer>
            <Field>
              Κωδικός Πρόσβασης*
            </Field>
            <InputContainer>
              <Input type="password" placeholder="Εισάγετε τον Κωδικό Πρόσβασης" onChange={(e)=>{check_password(e.target.value)}}/>
              {!notifications.password?
                <ErrorMessage>{errors.password}</ErrorMessage>:
                <IconDiv>
                  <CheckIcon fontSize='small'/>
                </IconDiv>
                }
              </InputContainer>
            <Field>
              Επιβεβαίωση Κωδικού*
            </Field>
            <InputContainer>
              <Input type="password" placeholder="Επαναλάβετε τον Κωδικό Πρόσβασης" onChange={(e)=>{check_confirm(e.target.value)}}/>
              {!notifications.confirm_password?
                <ErrorMessage>{errors.confirm_password}</ErrorMessage>:
                <IconDiv>
                  <CheckIcon fontSize='small'/>
                </IconDiv>
              }
            </InputContainer>
            <Field>
              Τηλέφωνο
            </Field>
            <InputContainer>
              <Input type="text" placeholder="Εισάγετε το Τηλέφωνό σας" onChange={(e)=>{check_telephone(e.target.value)}}/>
              {!notifications.telephone?
                <ErrorMessage>{errors.telephone}</ErrorMessage>:
                <IconDiv>
                  <CheckIcon fontSize='small'/>
                </IconDiv>
              }
            </InputContainer>
            <Field>
              Διεύθυνση
            </Field>
            <InputContainer>
              <Input type="text" placeholder="Εισάγετε τη Διεύθυνσή σας" onChange={(e)=>{check_address(e.target.value)}}/>
              {!notifications.address?
                <ErrorMessage>{errors.address}</ErrorMessage>:
                <IconDiv>
                  <CheckIcon fontSize='small'/>
                </IconDiv>
              }
            </InputContainer>
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