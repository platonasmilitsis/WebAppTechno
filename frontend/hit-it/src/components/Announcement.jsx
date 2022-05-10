import styled from "styled-components"

const Container=styled.div`
    height:30px;
    background-color:teal;
    color:white;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:15px;
    font-weight:bold;
`;

const Announcement = () => {
  return (
    <Container>
        Εγγραφείτε για να προχωρήσει η διάλυση!
    </Container>
  )
}

export default Announcement