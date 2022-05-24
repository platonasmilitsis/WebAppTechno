import {  Facebook, Instagram, Twitter, Phone , Email  } from '@material-ui/icons';
import React from 'react';
import  styled from "styled-components";


const Foot = styled.div`
    padding: 10px 0px;
    background: #f8f9fa;
    position: flex;
    bottom: 0;
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
    margin: 20px 0;
    margin-left:20px;
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

const Wrapper=styled.div`
    flex :1;
    display:flex;
    flex-direction:column;
    margin:0;
    margin-top:-100px;
`;

const Footer = () => {
    return (
        <Foot>
            <Logo>hit-it</Logo>
            <Description>
                Your favourite online shop!
            </Description>
            <Conrainer>
                <Row>
                    <Column>
                        <Wrapper>
                            <Description>
                                Follow us on Social Media!
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
                        </Wrapper>
                    </Column>
                    <Column>
                        <Wrapper>
                            <Description>
                                Contact Us!
                            </Description>
                            <SocialMedia>
                                <Icons color="23272a">
                                    <Phone/>
                                </Icons>
                                <Icons color="bd081c">
                                    <Email/>
                                </Icons>
                            </SocialMedia>
                        </Wrapper>
                    </Column>
                    <Column>
                        <Wrapper>
                            <Description>
                                Abouts Us!
                            </Description>
                            Find out more 
                        </Wrapper>
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