import React from 'react'
import styled from 'styled-components'
import { Breadcrumbs, Link} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const Container=styled.div`
    flex:1;
    display:flex;
    align-items:center;
    justify-content:flex-start;
    margin-top:30px;
    margin-left:30px;
    opacity:0.6;
    cursor:pointer;
`;


const Breadcrumb = (page_name,page_link) => {

    let navigate=useNavigate();

    const breadcrumbs=()=>{
        var links=[];
        for(let i=0;i<page_name.length;i++){
            links.push
                    (<Link underline="hover" 
                        color="inherit" 
                            onClick={()=>navigate(page_link[i])}>
                                {page_name[i]}
                                    </Link>)
        }
        return links       
    }

  return (
    <Container>
        <Breadcrumbs separator="›" aria-label="breadcrumb">
            {breadcrumbs()}
      </Breadcrumbs>
    </Container>
  )
}

export default Breadcrumb