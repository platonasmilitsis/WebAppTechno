import {  Facebook, Instagram, Twitter, Phone , Email  } from '@material-ui/icons';
import React from 'react';
import  styled from "styled-components";


const Foot = styled.div`
    padding: 10px 10px;
    background: #f8f9fa;
    ${'' /* position: relative; */}
    width: 100%;
`;

const Conrainer = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    max-width: 1000px;
    margin: 0 auto; 
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 50px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(185px, 1fr));
  grid-gap: 100px;
  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;

const Logo = styled.h1`
    color:#e67e22;
    margin-left:20px;
`;

const Description = styled.p`
    margin: 5px 0;
    margin-left:20px;
    font-family: 'Arial', 'sans-serif';
`;


const SocialMedia = styled.div`
    display:flex;
    margin-left:25px;
  
`;

const Icons = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 30%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
`;



const Footer = () => {
    return (
        <Foot>
            <Logo>hit-it</Logo>
            <Description>
                Το αγαπημένο σου online κατάστημα!
            </Description>
            <Conrainer>
                <Row>
                    <Column>
                        <Description>
                            Ακολουθήστε μας στα Social Media!
                        </Description>
                        <SocialMedia>
                            <Icons color="3b5998">
                                <Facebook/>
                            </Icons>
                            <Icons color="1da1f2">
                                <Twitter/>
                            </Icons>
                            <Icons color="c32aa3">
                                <Instagram/>
                            </Icons>
                        </SocialMedia>
                    </Column>
                    <Column>
                        <Description>
                            Επικοινωνία
                        </Description>
                        <SocialMedia>
                            <Icons color="23272a">
                                <Phone/>
                            </Icons>
                            <Icons color="bd081c">
                                <Email/>
                            </Icons>
                        </SocialMedia>
                    </Column>
                    <Column>
                        <Description>
                            Σχετικά με εμάς!
                        </Description>
                        <Description>
                            Περισσότερες πληροφορίες 
                        </Description>
                                
                    </Column>
                </Row>
            </Conrainer>
            <Description>
                © 2022 Created by hit-it team. All Rights reserved.
            </Description>
        </Foot>

    )
}

export default Footer;