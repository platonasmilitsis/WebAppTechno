import React from 'react'
import styled from 'styled-components'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import NavBar from '../components/Categories/NavBar';
import Breadcrumb from '../components/Global/Breadcrumb';
import Main from '../components/Products/Main';
import Footer from '../components/Global/Footer';
import { useParams } from "react-router-dom";

const Container=styled.div`
    background-color:#eaeded; 
`;

const Product = () => {

    const page_names=["Καλωσοριστική","Αρχική"];
    const page_links=["/","/home"];


    const params = useParams();

    return (
        <Container>
            <HelmetProvider>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>
                        Προϊόντα
                    </title>
                </Helmet>
            </HelmetProvider>
            <NavBar/>
            {Breadcrumb(page_names,page_links)}
            {Main(params.id)}
            <Footer/>
        </Container>
    )
    
}

export default Product