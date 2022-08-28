import React from 'react'
import styled from 'styled-components'
import SellProduct from '../components/Global/SellProduct';

const Container=styled.div`
    background-color:red;
    height:100vh;
`;

const ProductForm = () => {
  return (
    <Container>
        <SellProduct/>
    </Container>
  )
}

export default ProductForm