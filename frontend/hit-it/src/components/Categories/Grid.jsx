import React from 'react'
import styled from 'styled-components'
import Tile from './Tile';

const Container=styled.div`
    font-family: 'Arial', sans-serif;
    font-weight:500;
    font-size:25px;
    color:black;
    display:flex;
    flex-wrap:wrap;
    width:80%;
    margin-left:13%;
    margin-right:13%;
    margin-bottom:20px; {/* For the Footer */}
`;

const Grid = (images,titles,descriptions) => {

  const create_tiles=()=>{
    var tiles=[];
    for(let i=0;i<images.length;i++){
      tiles.push(Tile(images[i],titles[i],descriptions[i]));
    }
    return tiles;
  }

  return (
    <Container>
      {create_tiles()}
    </Container>
  )
}

export default Grid