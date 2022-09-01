import {Fab} from "@mui/material";
import {Add} from "@material-ui/icons";
import styled from "styled-components";
import React, {useState} from "react";
import CheckIcon from '@mui/icons-material/Check';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { axiosPrivate } from "../../api/axios";


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

const Back = styled.div`
  position: fixed;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.75);
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
`;

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
    margin-top:-80px;
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
    position:relative;
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
    margin-top:35px;
    margin-bottom:20px;
    cursor:pointer;
`;

const DropdownDiv=styled.div`
    margin-left:3.5%;
    @media screen and (max-width:1001px) and (min-width:700px){
        margin-left:3%;
    }
    @media screen and (max-width:701px) and (min-width:450px){
        margin-left:2%;
    }
    @media screen and (max-width:451px){
        margin-left:1.5%;
    }
 `;   

 const ErrorMessage=styled.p`
    color:red;
    font-size:12px;
    margin-top:2px;
    margin-left:50px;
    position:absolute;
`;

const IconDiv=styled.div`
  color:green;
  margin-left:96%;
  margin-top:-3%;
  position:absolute;
`;

const Success=styled.p`
    color:green;
    font-size:18px;
    position:absolute;
    margin-bottom:10px;
    margin-top:10px;
`;

function Backdrop(props) {
    return <div className='backdrop' onClick={props.onClick}/>;
}

const FloatingButtonAdd=()=>{

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
    };

    const category_names = [
        'Τεχνολογία',
        'Σπίτι - Κήπος',
        'Μόδα',
        'Hobby - Αθλητισμός',
        'Υγεία - Ομορφιά',
        'Παιδικά - Βρεφικά',
        'Auto - Moto',
        'Επαγγελματικά - B2B'
    ];

    const [modalIsOpen, setModalIsOpen] = useState(false);

    function buttonHandler() {
        setModalIsOpen(true);
    }

    function backdropHandler() {
        setModalIsOpen(false);
        set_name(null);
        set_description(null);
        set_category([]);
        set_first_bid(null);
        set_buy_price(null);
        set_location(null);
        set_country(null);
        set_latitude(null);
        set_longitude(null);
        set_image_link(null);
        set_errors({});
        set_notifications({});
        set_success(false);
    }

    const remain_open=(e)=>{
      e.stopPropagation();
    }

    const [name,set_name]=useState(null);
    const [description,set_description]=useState(null);
    const [category,set_category]=useState([]);
    const [first_bid,set_first_bid]=useState(null);
    const [buy_price,set_buy_price]=useState(null);
    const [location,set_location]=useState(null);
    const [country,set_country]=useState(null);
    const [latitude,set_latitude]=useState(null);
    const [longitude,set_longitude]=useState(null);
    const [image_link,set_image_link]=useState(null);

    const [errors,set_errors]=useState({});
    const [notifications,set_notifications]=useState({});
    const [success,set_success]=useState(false);


    const handle_submit=(e)=>{
        e.preventDefault();
        set_errors(validate());
        set_notifications({});
    }

    const validate=()=>{
        const errors={}
        if(!name){
          errors.name="Το όνομα του προϊόντος είναι υποχρεωτικό";
        }
        if(!description){
          errors.description="Η περιγραφή του προϊόντος είναι υποχρεωτική";
        }
        if(!category){
          errors.category="Η κατηγορία του προϊόντος είναι υποχρεωτική";
        }
        if(!first_bid){
          errors.first_bid="Η τιμή έναρξης της δημοπρασίας είναι υποχρεωτική";
        }
        if(!buy_price){
          errors.buy_price="Η τιμή λήξης της δημοπρασίας είναι υποχρεωτική";
        }
        if(!location){
          errors.location="Η περιοχή κατοικίας είναι υποχρεωτική";
        }
        if(!country){
          errors.country="Η χώρα διαμονής είναι υποχρεωτική";
        }
        if(isNaN(first_bid)){
            errors.first_bid="Η τιμή έναρξης της δημοπρασίας πρέπει να είναι σε $";
          }
        if(isNaN(buy_price)){
          errors.buy_price="Η τιμή λήξης της δημοπρασίας πρέπει να είναι σε $";
        }
        if(latitude && isNaN(latitude)){
          errors.latitude="Το γεωγραφικό πλάτος πρέπει να είναι αριθμός";
        }
        if(longitude && isNaN(longitude)){
            errors.longitude="Το γεωγραφικό μήκος πρέπει να είναι αριθμός";
        }
        return errors;
    }

    const check_name=(str)=>{
        set_name(str);
        console.log(str);
        if(str.length===0){
          notifications.name=false;
          errors.name="Το όνομα του προϊόντος είναι υποχρεωτικό";
        }
        else{
          errors.name=null;
          notifications.name=true;
        }
    }

    const check_description=(str)=>{
        set_description(str);
        if(str.length===0){
            notifications.description=false;
            errors.description="Η περιγραφή του προϊόντος είναι υποχρεωτική";
        }
        else{
            errors.description=null;
            notifications.description=true;
        }
    }

    const check_categories=(str)=>{
        set_category(str);
        if(str.length===0){
            notifications.category=false;
            errors.category="Η κατηγορία του προϊόντος είναι υποχρεωτική";
        }
        else{
            notifications.category=true;
            errors.category=false;
        }
    };

    const check_first_bid=(str)=>{
        set_first_bid(parseInt(str));
        if(str.length===0){
            notifications.first=false;
            errors.first_bid="Η τιμή έναρξης της δημοπρασίας είναι υποχρεωτική";
        }
        else{
            if(!isNaN(first_bid)){
                errors.first_bid=null;
                notifications.first_bid=true;
            }
            else{
                errors.first_bid="Η τιμή έναρξης της δημοπρασίας πρέπει να είναι σε $";
                notifications.first_bid=false;
            }
        }
    }

    const check_buy_price=(str)=>{
        set_buy_price(parseInt(str));
        if(str.length===0){
            notifications.buy_price=false;
            errors.buy_price="Η τιμή λήξης της δημοπρασίας είναι υποχρεωτική";
        }
        else{
            if(!isNaN(buy_price)){
                errors.buy_price=null;
                notifications.buy_price=true;
            }
            else{
                errors.buy_price="Η τιμή λήξης της δημοπρασίας πρέπει να είναι σε $";
                notifications.buy_price=false;
            }
        }
    }

    const check_location=(str)=>{
        set_location(str);
        if(str.length===0){
            notifications.location=false;
            errors.location="Η περιοχή κατοικίας είναι υποχρεωτική";
        }
        else{
            errors.location=null;
            notifications.location=true;
        }
    }

    const check_country=(str)=>{
        set_country(str);
        if(str.length===0){
            notifications.country=false;
            errors.country="Η χώρα διαμονής είναι υποχρεωτική";
        }
        else{
            errors.country=null;
            notifications.country=true;
        }
    }

    const check_latitude=(str)=>{
        set_latitude(str);
        if(str){
          if(isNaN(str)){
            errors.latitude="Το γεωγραφικό πλάτος πρέπει να είναι αριθμός";
            notifications.latitude=false;
          }
          else{
            errors.latitude=null;
            notifications.latitude=true;
          }
        }
        else{
          errors.latitude=null;
          notifications.latitude=false;
        }
    }

    const check_longitude=(str)=>{
        set_longitude(str);
        if(str){
          if(isNaN(str)){
            errors.longitude="Το γεωγραφικό μήκος πρέπει να είναι αριθμός";
            notifications.longitude=false;
          }
          else{
            errors.longitude=null;
            notifications.longitude=true;
          }
        }
        else{
          errors.longitude=null;
          notifications.longitude=false;
        }
    }

    const axiosPrivate = useAxiosPrivate();


    const submit=(e)=>{
        e.preventDefault();
        set_errors(validate());
        let user_id=null;
        const credentials ={
                  name:name,
                  description:description,
                  first_bid:first_bid,
                  buy_price:buy_price,
                  location:location,
                  country:country,
                  latitude:latitude,
                  longitude:longitude,
                  img_path:image_link
                  };
    
        fetch(`http://localhost:8080/users/username=${localStorage.getItem('username')}`)
        .then((response)=>response.json())
        .then((data)=>{
            user_id=data.id;
            const headers={
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + localStorage.getItem('username').access_token
            }
            axiosPrivate.post(`/users/${user_id}/items`,{credentials},{headers})
            .then((response)=>{
                console.log(response);
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
            <Dee>
                <Fab color="primary" aria-label="add" onClick={buttonHandler}>
                    <Add/>
                </Fab>
            </Dee>

            {modalIsOpen && <Back onClick={backdropHandler}> <Backdrop/> </Back>}
            {modalIsOpen && 
                <SellContainer onCanPlay={backdropHandler}>
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
                        <Form onSubmit={handle_submit}>
                            <Field>
                                Όνομα Προϊόντος*
                            </Field>
                            <InputDiv>
                                <Input type="text" placeholder="Εισάγετε το όνομά του προϊόντος" onChange={(e)=>{check_name(e.target.value)}}/>
                            </InputDiv>
                            {!notifications.name?
                                <ErrorMessage>{errors.name}</ErrorMessage>:
                                <IconDiv>
                                    <CheckIcon fontSize='small'/>
                                </IconDiv>
                            }
                            <Field>
                                Περιγραφή Προϊόντος*
                            </Field>
                            <InputDiv>
                                <Input type="text" placeholder="Εισάγετε την περιγραφή του προϊόντος" onChange={(e)=>{check_description(e.target.value)}}/>
                            </InputDiv>
                            {!notifications.description?
                                <ErrorMessage>{errors.description}</ErrorMessage>:
                                <IconDiv>
                                    <CheckIcon fontSize='small'/>
                                </IconDiv>
                            }
                            <Field>
                                Κατηγορία Προϊόντος*
                            </Field>
                            <DropdownDiv>
                            <FormControl sx={{ m: 1, width: '95%' }} size="small" fullWidth={true}>
                                <InputLabel style={{fontSize:14 }} id="demo-multiple-checkbox-label">Επιλέξτε μία ή περισσότερες κατηγορίες</InputLabel>
                                <Select
                                    labelId="demo-multiple-checkbox-label"
                                    id="demo-multiple-checkbox"
                                    multiple
                                    value={category}
                                    style={{ height: 32 }}
                                    onChange={(e)=>{check_categories(e.target.value)}}
                                    input={<OutlinedInput label="Επιλέξτε μία ή περισσότερες κατηγορίες" />}
                                    renderValue={(selected) => selected.join(', ')}
                                    MenuProps={MenuProps}
                                >
                                    {category_names.map((name) => (
                                    <MenuItem key={name} value={name}>
                                        <Checkbox checked={category.indexOf(name) > -1} />
                                        <ListItemText primary={name} />
                                    </MenuItem>
                                    ))}
                                </Select>
                                </FormControl>
                            </DropdownDiv>
                            {!notifications.category?
                                <ErrorMessage>{errors.category}</ErrorMessage>:
                                <IconDiv>
                                    <CheckIcon fontSize='small'/>
                                </IconDiv>
                            }
                            <Field>
                                Έναρξη Δημοπρασίας*
                            </Field>
                            <InputDiv>
                                <Input type="text" placeholder="Εισάγετε την τιμή έναρξης της δημοπρασίας" onChange={(e)=>{check_first_bid(e.target.value)}}/>
                            </InputDiv>
                            {!notifications.first_bid?
                                <ErrorMessage>{errors.first_bid}</ErrorMessage>:
                                <IconDiv>
                                    <CheckIcon fontSize='small'/>
                                </IconDiv>
                            }
                            <Field>
                                Λήξη Δημοπρασίας*
                            </Field>
                            <InputDiv>
                                <Input type="text" placeholder="Εισάγετε την τιμή λήξης της δημοπρασίας" onChange={(e)=>{check_buy_price(e.target.value)}}/>
                            </InputDiv>
                            {!notifications.buy_price?
                                <ErrorMessage>{errors.buy_price}</ErrorMessage>:
                                <IconDiv>
                                    <CheckIcon fontSize='small'/>
                                </IconDiv>
                            }
                            <Field>
                                Περιοχή Κατοικίας*
                            </Field>
                            <InputDiv>
                                <Input type="text" placeholder="Εισάγετε την περιοχή κατοικίας σας" onChange={(e)=>{check_location(e.target.value)}}/>
                            </InputDiv>
                            {!notifications.location?
                                <ErrorMessage>{errors.location}</ErrorMessage>:
                                <IconDiv>
                                    <CheckIcon fontSize='small'/>
                                </IconDiv>
                            }
                            <Field>
                                Χώρα Διαμονής*
                            </Field>
                            <InputDiv>
                                <Input type="text" placeholder="Εισάγετε την χώρα διαμονής σας" onChange={(e)=>{check_country(e.target.value)}}/>
                            </InputDiv>
                            {!notifications.country?
                                <ErrorMessage>{errors.country}</ErrorMessage>:
                                <IconDiv>
                                    <CheckIcon fontSize='small'/>
                                </IconDiv>
                            }
                            <Field>
                                Γεωγραφικό Πλάτος
                            </Field>
                            <InputDiv>
                                <Input type="text" placeholder="Εισάγετε το γεωγραφίκο πλάτος της κατοικίας σας" onChange={(e)=>{check_latitude(e.target.value)}}/>
                            </InputDiv>
                            {!notifications.latitude?
                                <ErrorMessage>{errors.latitude}</ErrorMessage>:
                                <IconDiv>
                                    <CheckIcon fontSize='small'/>
                                </IconDiv>
                            }
                            <Field>
                                Γεωγραφικό Μήκος
                            </Field>
                            <InputDiv>
                                <Input type="text" placeholder="Εισάγετε το γεωγραφίκο μήκος της κατοικίας σας" onChange={(e)=>{check_longitude(e.target.value)}}/>
                            </InputDiv>
                            {!notifications.longitude?
                                <ErrorMessage>{errors.longitude}</ErrorMessage>:
                                <IconDiv>
                                    <CheckIcon fontSize='small'/>
                                </IconDiv>
                            }
                            <Field>
                                Εικόνα Προϊόντος
                            </Field>
                            <InputDiv>
                                <Input type="text" placeholder="Εισάγετε το link της εικόνας του προϊόντος σας"/>
                            </InputDiv>
                        </Form>
                    </FormContainer>
                    <ButtonDiv>
                        <Button onClick={submit}>
                            Υποβολή
                        </Button>
                        {success && <Success>
                            Η έναρξη νέας δημοπρασίας πραγματοποιήθηκε επιτυχώς!
                            </Success>}
                    </ButtonDiv>
                    
                </SellContainer>
            }
        </Container>
    );
}


export default FloatingButtonAdd;