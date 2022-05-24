import styled from "styled-components"

const Container=styled.div`
    height:300px;
    background-color:#e67e22;
    display:flex;
    align-items:center;
    font-size:15px;
    font-weight:bold;
    margin-left:285px;
    margin-right:285px;
    border-radius:10px;
    position:relative;
    max-width:1275px;
`;

const Title=styled.h1`
    font-size:33px;
    font-family: 'Arial', sans-serif;
    margin-bottom:80px;
    margin-left:50px;
    position:absolute;
`;

const Description=styled.p`
    font-size:17px;
    font-family: 'Arial', sans-serif;
    margin-top:80px;
    margin-left:50px;
    position:absolute;
    width:450px;

`;

const ImgContainer=styled.div`
    margin-left:900px;
    margin-bottom:50px;
    overflow:hidden;
`;

const Image=styled.img`
    height:100%;
    width:100%;
    object-fit:cover;
    margin-top:40px;
`;

const Announcement = () => {
  return (
    <Container>
        <Title>
          Ήρθαν τα hit-it Point
        </Title>
        <Description>
          Τώρα μπορείς να παραλάβεις την παραγγελία σου, όποτε σε βολεύει!
        </Description>
        <ImgContainer>
          <Image src={require("../../assets/logoreact.png")}/>
        </ImgContainer>
    </Container>
  )
}

export default Announcement
