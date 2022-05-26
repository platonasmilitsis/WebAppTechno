import React, { useState } from 'react'
import styled from 'styled-components'
import { Search } from '@material-ui/icons';
import { search_results } from '../../data';

const Container=styled.div`
    width:100%;
    height:200px;
    display:flex;
    align-items:center;
    justify-content:center;
    position:relative;
`;

const Logo=styled.h1`
    font-weight:900;
    color:#e67e22; 
    font-size:70px;
    position:absolute;
    margin-bottom:100px;
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

const ResultContainer=styled.div`
    width:30%;
    background-color:white;
    z-index:1;
    ${'' /* margin-top:340px; */}
    margin-top:140px;
    position:fixed;
    border-radius:10px;
`;

const Result=styled.div`
    margin-left:10px;
    margin-top:10px;
    margin-bottom:10px;
    font-family: 'Arial', sans-serif;
`;

const Main = () => {

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
        <Logo>
            hit-it
        </Logo>
        <SearchContainter>
            <Input placeholder="γράψε τον όρο αναζήτησης" onChange={handle_filter}/>
            <Search style={{color:"#e67e22",fontSize:25}} />
        </SearchContainter>


        {filtered_data.length !==0 && (
            <ResultContainer>
                {filtered_data.map((value)=>
                    {return(
                        <Result key={value.id} target="_blank">
                            {value.title}
                        </Result>
                    );})}
            </ResultContainer>
        )}


        {/* {(() => {
            
        })()} */}
    

    </Container>
  )
}

export default Main