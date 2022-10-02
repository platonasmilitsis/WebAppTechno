import React from 'react'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TextField} from '@material-ui/core';
import Paper from '@mui/material/Paper';
import styled from 'styled-components'


export const StyledTableHead = styled(TableHead)`
& .MuiTableCell-root {
  background-color: #e67e22;
  color:white;
  font-weight: bold;
}
`;

const BidsTable = ( {rows} ) => {
    return(
        <TableContainer sx={{ maxHeight:"250px",height:"250px"}} component={Paper}>
            <Table style={{ backgroundColor:"#eaeded" }} stickyHeader={true} sx={{ maxHeight:"250px", height:"250px", width:"20%" }} aria-label="simple table">
                <StyledTableHead >
                    <TableRow >
                        <TableCell>Όνομα Χρήστη</TableCell>
                        <TableCell align="right">Πόντοι Δημοτικότητας</TableCell>
                        <TableCell align="right">Χτυπητέο Ποσό</TableCell>
                        <TableCell align="right">Ώρα Κρούσης</TableCell>

                    </TableRow>
                </StyledTableHead>
                <TableBody sx={{backgroundColor:"#eaeded"}}>
                    {rows.map((row) => (
                        <TableRow key={row.id}
                            sx={{   '&:last-child td, &:last-child th': {border:0}}}
                        >
                            <TableCell component="th" scope="row">{row.bidder.username}</TableCell>
                            <TableCell align='right'>{row.bidder.rating}</TableCell> 
                            <TableCell align='right'>{row.amount}€</TableCell>
                            <TableCell align='right'>{row.time}</TableCell>

                        </TableRow>
                    ))}

                </TableBody>


            </Table>

        


        </TableContainer>
    );
}

export default BidsTable;