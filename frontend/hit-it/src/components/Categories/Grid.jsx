import React from 'react'
import styled from 'styled-components'
import Tile from './Tile';

const Container=styled.div`
    font-family: 'Arial', sans-serif;
    font-weight:500;
    font-size:25px;
    color:black;
    margin-top:10px;
    display:flex;
    flex-wrap:wrap;
    margin-left:180px;
    margin-right:100px;
`;

const Grid = () => {
  return (
    <Container>
        <Tile/>
        <Tile/>
        <Tile/>
        <Tile/>
        <Tile/>
        <Tile/>
        <Tile/>
        <Tile/>
        <Tile/>


    </Container>
  )
}

export default Grid