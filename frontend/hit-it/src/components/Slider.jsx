import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import styled from "styled-components"

const Container=styled.div`
    width:100%;
    height:100vh;
    display:flex;
    background-color:black;
    position:relative;
`;

const Arrow=styled.div`
    width:50px;
    height:50px;
    background-color:#fff7f7;
    border-radius:50%;
    display:flex;
    align-items:center;
    justify-content:center;
    position:absolute;
    top:0;
    left:${props=>props.direction==="left" && "10px"};
    right:${props=>props.direction==="right" && "10px"};
    bottom:0;
    margin:auto;
    cursor:pointer;
    opacity:0.5;
`;

const Error=styled.div`
    font-size:200px;
    font-weight:bold;
    cursor:pointer;
    color:red;
    align-items:center;
    justify-content:center;
    display:flex;
    margin:auto;
`;

const Slider = () => {
  return (
    <Container>
        <Arrow direction="left">
            <ArrowLeftOutlined/>
        </Arrow>
        <Error>
            404
        </Error>
        <Arrow direction="right">
            <ArrowRightOutlined/>
        </Arrow>
    </Container>
  )
}

export default Slider
