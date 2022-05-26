import React, { useState } from 'react'
import styled from 'styled-components'
import { ShoppingCartOutlined } from "@material-ui/icons"
import { Badge } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';
import { search_results } from '../../data';

const Container=styled.div`
    height:80px;
    position:relative;
`;

const Wrapper=styled.div`
    padding:10px 20px;
    display:flex;
    align-items:center;
    justify-content:space-between;
`;

const Left=styled.div`
    flex:1;
    display:flex;
    align-items:center;
    justify-content:flex-start;
    margin-top:10px;
`;

const Logo=styled.h1`
    font-weight:900;
    color:#e67e22; 
    font-size:50px;
    flex:1;
    margin-left:10px;
    cursor:pointer;
`;


const SearchContainter=styled.div`
    &:hover{
        border:1px;
        border-style:solid;
        border-color:#e67e22;
    }
    display:flex;
    align-items:center;
    width:30%;
    border-radius:25px;
    padding:5px;
    position:absolute;
    background-color:white;
    margin-top:60px;
    margin-left:30%;
`;

const Input=styled.input`
    width:100%;
    border-width:0px;
    outline:none;    
    font-size:16px;
    ::placeholder{
        opacity:0.1;
    }
`;

const DummyDiv=styled.div`
    position:absolute;
    width:30%;
    margin-left:30%;

`;

const ResultContainer=styled.div`
    width:100%;
    background-color:white;
    z-index:1;
    margin-top:50px;
    position:absolute;
    border-radius:10px;
`;

const Result=styled.div`
    margin-left:10px;
    margin-top:10px;
    margin-bottom:10px;
    font-family: 'Arial', sans-serif;
`;

const Right=styled.div`
    flex:1;
    display:flex;
    align-items:center;
    justify-content:flex-end;
    margin-top:10px;
`;

const MenuItem=styled.div`
    font-size:14px;
    cursor:pointer;
    margin-left:25px;
`;

const NavBar = () => {
    
    let navigate=useNavigate();

    const [filtered_data,set_filtered_data]=useState([]);

    const handle_filter=(event)=>{
        const search_word=event.target.value;
        const new_filter=search_results.filter((value)=>{
            return value.title.toLowerCase().includes(search_word.toLowerCase());
        })
        if(search_word===""){
            set_filtered_data([]);
        }
        else{
            set_filtered_data(new_filter);
        }
    }

  return (
    <Container>
        <Wrapper>
            <Left>
                <Logo onClick={()=>navigate("/home")}>
                    hit-it
                </Logo>
            </Left>
            <SearchContainter>
            <Input placeholder="γράψε τον όρο αναζήτησης" onChange={handle_filter}/>
            <Search style={{color:"#e67e22",fontSize:25}} />
        </SearchContainter>


        {filtered_data.length !==0 && (
            <DummyDiv>
            <ResultContainer>
                {filtered_data.map((value)=>
                    {return(
                        <Result key={value.id} target="_blank">
                            {value.title}
                        </Result>
                    );})}
            </ResultContainer>
            </DummyDiv>
        )}
            <Right>
                <MenuItem>
                    Register
                </MenuItem>
                <MenuItem>
                    Sign In
                </MenuItem>
                <MenuItem>
                    <Badge badgeContent={1} color="primary" overlap="rectangular">
                        <ShoppingCartOutlined/>
                    </Badge>
                </MenuItem>
            </Right>
        </Wrapper>
    </Container>
  )
}

export default NavBar