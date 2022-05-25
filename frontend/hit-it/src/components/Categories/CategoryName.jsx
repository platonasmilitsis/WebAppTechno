import React from 'react'
import styled from 'styled-components'

const Container=styled.div`
    font-family: 'Arial', sans-serif;
    font-weight:500;
    font-size:25px;
    color:black;
    margin-top:50px;
    margin-left:30px;
    margin-bottom:30px;
    margin-top:30px;
`;

const CategoryName = (category_name) => {
  return (
    <Container key={category_name}>
        {category_name}
    </Container>
  )
}

export default CategoryName