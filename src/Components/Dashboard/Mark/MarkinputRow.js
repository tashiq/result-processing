import { TableCell, TableRow } from '@mui/material';
import React from 'react';

const MarkinputRow = ({ rows }) => {
    console.log(rows);
    return (
        <TableRow
            key={""}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                {1}
            </TableCell>
            <TableCell align="left"><input type="number" className='table_input' /></TableCell>
            <TableCell align="left"><input type="text" className='table_input' /></TableCell>
            <TableCell align="left"><input type="number" className='table_input' /></TableCell>
        </TableRow>
    );
};

export default MarkinputRow;