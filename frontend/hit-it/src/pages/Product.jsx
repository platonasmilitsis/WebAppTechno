import React from 'react'
import styled from 'styled-components'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import NavBar from '../components/Categories/NavBar';
import Breadcrumb from '../components/Global/Breadcrumb';
import Main from '../components/Products/Main';
import Footer from '../components/Global/Footer';
import { useParams } from "react-router-dom";
import Map from '../pages/Map';


const Container=styled.div`
    background-color:#eaeded; 
`;

const Logo=styled.h3`
    color:#e67e22; 
    font-weight:700;
    font-size:70px;
    margin-top:90px;
`;

const MapInfoContainer=styled.div`
    display: flex;
    flex-direction:row;
    flex-wrap:wrap;
    margin-bottom:50px;
    margin-top:50px;

`;

const MapContainer=styled.div`
    background-color:#ffffff;
    width:50%;
`;

const InfoContainer=styled.div`
    background-color:#ffffff;
    width:50%;
    text-align:center;
`;

const Info=styled.div`
    margin-top:50px;
`;

const FootCont=styled.div`
    width:100%;
    height:20px;
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
            <MapInfoContainer>
                <MapContainer>
                    <Map/>
                </MapContainer>
                <InfoContainer>
                    <Info>
                        <ul>
                            <h3>Πληροφορίες Καταστήματος</h3>
                            <br></br>
                            <li>Διεύθυνση: Βάλβη 27, ΤΚ:43100</li>
                            <li>Τηλέφωνο: 24410 11111</li>
                        </ul> 
                        <Logo>
                            hit-it
                        </Logo>
                    </Info>
                </InfoContainer>
            </MapInfoContainer>
            <FootCont>
                <Footer/>
            </FootCont>
        </Container>
    )
    
}

export default Product