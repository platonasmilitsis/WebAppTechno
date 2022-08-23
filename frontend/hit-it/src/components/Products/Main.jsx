import React,{useEffect,useState} from 'react'
import styled from 'styled-components'

const Container=styled.div`
  background-color:white;
  margin-top:1%;
  display:flex;
  flex-direction:row;
  justify-content:space-around;
  @media (max-width: 1000px) {
    flex-wrap:wrap;
    overflow:hidden;
  }
  -drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`;

const ImageContainer=styled.div`
  width:96%; 
  max-width:960px;
  margin:0 auto; 
  min-width:600px;
  @media (max-width: 1000px) {
    margin-left:50%;
  }
`;

const Image=styled.img`
  width:50%;
  height: auto;
`;

const TextContainer=styled.div`
  display:flex;
  flex-direction:column;
  @media (max-width: 1000px) {
    margin-left:25%;
  }
`;

const Title=styled.h1`
  font-family: 'Arial', sans-serif;
  font-size:25px;
  font-weight:500;
  width:50%;
  margin-top:10%;
`;

const Description=styled.h2`
  font-family: 'Arial', sans-serif;
  font-size:15px;
  font-weight:300;
  width:65%;
  margin-top:5%;
  opacity:0.6;
`;


const Main = (id) => {

  const [error,set_error] = useState(null);
  const [is_loaded,set_is_loaded] = useState(false);
  const [items,set_items] = useState([]);

  const find_info=()=>{
    const item=items.find(items=>items.id===parseInt(id));
    if(item){
      let name=item.name;
      let description=item.description;
      return {name,description};
    }
    throw new Error("404");
  }

  const product_exists=()=>{
    try{
      return(
        <>
        <ImageContainer>
              <Image src={require("../../assets/logoreact.png")}/>
          </ImageContainer>
          <TextContainer>
            <Title>
              {/* {"Ulefone Power Armor 14 Dual SIM (4GB/64GB) Ανθεκτικό Smartphone Black"} */}
              {find_info().name}
            </Title>
            <Description>
              {/* {"Αδιάβροχο κι ανθεκτικό σε σκληρή χρήση και χτυπήματα. Ασύρματη φόρτιση 15W "+
              "κι ενσύρματη 18W. FM ραδιόφωνο που λειτουργεί χωρίς τη χρήση ακουστικών."} */}
              {find_info().description}
            </Description>
          </TextContainer>
          </>
      )
    }
    catch(exception){
      return(
        <TextContainer>
        <Title>
          ΑΥΤΟ ΔΕΝ ΥΠΑΡΧΕΙ ΚΑΝ ΕΤΣΙ;
        </Title>
        </TextContainer>
      )
    }
  }

  useEffect(() => {
    fetch("http://localhost:8080/items")
      .then(res => res.json())
      .then(
        (result) => {
          set_is_loaded(true);
          set_items(result);
          console.log(result)          
        },
        (error) => {
          set_is_loaded(true);
          set_error(error);
        }
      )
  },[])

  if(error){
    return(
      <div>
        Error:{error.message}
      </div>
    )
  }
  else if(!is_loaded){
    return(
      <div>
        Loading...
      </div>
    )
  } 
  else {
    return (
      <Container>
          {product_exists()}
      </Container>
  )}
}

export default Main