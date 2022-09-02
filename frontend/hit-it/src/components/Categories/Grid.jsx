import React from 'react'
import styled from 'styled-components'
import Tile from './Tile';

const Container=styled.div`
    font-family: 'Arial', sans-serif;
    display:flex;
    flex-wrap:wrap;
    justify-content:flex-start;
    width:80%;
    margin-left:15%;
    margin-right:auto;
    margin-bottom:3%; {/* For the Footer */}
`;

const Grid = (ids,images,titles,descriptions) => {

  const create_tiles=()=>{
    var tiles=[];
    for(let i=0;i<ids.length;i++){
      tiles.push(Tile(ids,images[i],titles[i],descriptions[i]));
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