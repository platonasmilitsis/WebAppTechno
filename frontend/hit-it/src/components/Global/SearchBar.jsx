import React, { useState } from 'react'
import styled from 'styled-components'
import { Search } from '@material-ui/icons';
import { search_results } from '../../data';
import CloseIcon from '@material-ui/icons/Close';
import { useNavigate } from 'react-router-dom';

const Container=styled.div`
    width:100%;
    display:flex;
    align-items:center;
    justify-content:center;
    position:relative;
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

const IconDiv=styled.div`
    color:#e67e22;
    fontSize:25;
    cursor:pointer;
    display:flex;
    position:absolute;
    margin-left:92%;
`;

const Wrapper=styled.div`
    position:relative;
    width:30%;
`;

const ResultContainer=styled.div`
    width:100%;
    background-color:white;
    z-index:1;
    margin-top:20px;
    position:absolute;
    border-radius:10px;
    border:1px;
    border-style:solid;
    border-color: #bdc3c7 ;
    
`;

const Results=styled.div`
    height:30px;
    position:relative;
    &:hover{
        cursor:pointer;
        background-color:#f8f9f9;
    }
    border-radius:10px;
`;

const Result=styled.div`
    margin-left:10px;
    margin-top:5px;
    margin-bottom:5px;
    font-family: 'Arial', sans-serif;
    position:absolute;
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

    const handle_redirect=(title)=>{
        switch(title){
            case "Τεχνολογία":
                navigate("/home/technology");
                break;
            case "Σπίτι - Κήπος":
                navigate("/home/home-garden");
                break;
            case "Μόδα":
                navigate("/home/fashion");
                break;
            case "Hobby - Αθλητισμός":
                navigate("/home/hobby-sports");
                break;
            case "Υγεία - Ομορφιά":
                navigate("/home/health-beauty");
                break;
            case "Παιδικά - Βρεφικά":
                navigate("/home/childrenry");
                break;
            case "Auto - Moto":
                navigate("/home/auto-moto");
                break;
            case "Επαγγελματικά - B2B":
                navigate("/home/business-b2b");
                break;
            default:
                navigate("/");
        }
    } 

  return (
      <Container>
        <SearchContainter>
            <Input placeholder="γράψε τον όρο αναζήτησης" onChange={handle_filter} value={word_entered}/>
            {word_entered.length===0? 
                <IconDiv>
                    <Search/> 
                </IconDiv>:
                    <IconDiv>
                        <CloseIcon onClick={()=>clear_input()} />
                    </IconDiv>
                }
        </SearchContainter>
        {filtered_data.length !==0 && (
            <Wrapper>
            <ResultContainer>
                {filtered_data.map((value)=>
                    {return(
                        <Results key={value.id} onClick={()=>handle_redirect(value.title)}>
                            <Result key={value.id} target="_blank">
                                {value.title}
                            </Result>
                        </Results>
                    );})}
            </ResultContainer>
            </Wrapper>
        )}
    </Container>
  )
  
}

export default SearchBar