import React, { useState } from 'react'
import styled from 'styled-components'
import { Search } from '@material-ui/icons';
import { search_results } from '../../data';
import CloseIcon from '@material-ui/icons/Close';
import { useNavigate } from 'react-router-dom';
import Navigate from "../Global/Navigate";

const Container=styled.div`
    display:flex;
    flex-direction:column;
`;

const SearchContainer=styled.div`
    display:flex;
    border-radius:25px;
    height:48px;
    width:640px;
    background-color:white;
    justify-content:flex-start;
    align-items:center;
    &:hover{
        border:1px;
        border-style:solid;
        border-color:#e67e22;
        box-sizing:border-box;
    }
    flex-direction:row;
    @media screen and (max-width: 650px) {
        width:420px;
        height:38px;
    }
`;

const InputContainer=styled.div`
    display:flex;
    align-items:center;
    width:600px;
    margin-left:20px;
    @media screen and (max-width: 650px) {
        width:380px;
    }

`;

const Input=styled.input`
    border-width:0px;
    outline:none;    
    font-size:16px;
    ::placeholder{
        opacity:0.1;
        @media screen and (max-width: 650px) {
            font-size:14px;
        }
    }
    width:600px;
    @media screen and (max-width: 650px) {
        width:380px;
    }
`;

const IconContainer=styled.div`
    color:#e67e22;
    cursor:pointer;
    margin-left:20px;

`;

const ResultsContainer=styled.div`
    background-color:white;
    margin-left:30px;
    margin-right:30px;
    border-radius:0 0 3px 3px;
    z-index:1;
`;

const ResultContainer=styled.div`
    height:30px;
    justify-content:center;
    &:hover{
        cursor:pointer;
        background-color:#f8f9f9;
    }
`;

const Result=styled.h1`
    font-family: 'Arial', sans-serif;
    font-size:17px;
    font-weight:300;
    margin-left:15px;
    @media screen and (max-width: 650px) {
        font-size:15px;
    }
`;

const SearchBar = () => {

    let navigate=useNavigate();

    const [filtered_data,set_filtered_data]=useState([]);
    const [word_entered,set_word_entered]=useState([]);

    const handle_filter=(event)=>{
        const search_word=event.target.value;
        set_word_entered(search_word);
        const new_filter=search_results.filter((value)=>{
            return value.title.toLowerCase().includes(search_word.toLowerCase());
        })
        if(search_word==="" || search_word===" "){
            set_filtered_data([]);
        }
        else{
            set_filtered_data(new_filter);
        }
    }

    const clear_input=()=>{
        set_filtered_data([]);
        set_word_entered("");
    }

  return (
    <Container>
        <SearchContainer>
            <InputContainer>
                <Input placeholder="γράψε τον όρο αναζήτησης" onChange={handle_filter} value={word_entered}/>
                {word_entered.length===0? 
                    <IconContainer>
                        <Search/> 
                    </IconContainer>:
                        <IconContainer>
                            <CloseIcon onClick={()=>clear_input()} />
                        </IconContainer>
                    }
            </InputContainer>
        </SearchContainer>
        {filtered_data.length !==0 && (
            <ResultsContainer>
                {filtered_data.map((value)=>
                    {return(
                        <ResultContainer key={value.id} onClick={()=>navigate(Navigate(value.title))}>
                            <Result key={value.id} target="_blank">
                                {value.title}
                            </Result>
                        </ResultContainer>
                    );})}
            </ResultsContainer>
        )}
    </Container>
  )
}

export default SearchBar