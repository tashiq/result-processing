import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ToolbarGen from '../../Toolbar/Toolbar';
import './Result.css'
const Result = () => {

    const [result, setResult] = useState([])
    useEffect(() => {
        axios.get('http://localhost:4000/result')
            .then(res => setResult(res.data))
    }, [])
    const rows = ['Student ID', 'Semester', 'Exam Year', 'CGPA', ''];
    return (
        <div>
            <ToolbarGen title={"Result"} />
            {
                result &&
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                {
                                    rows.map((row) =>
                                        <TableCell align="center" className='text-capitalize'>{row}</TableCell>
                                    )
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                result.map((itemRows, index) =>
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {index + 1}
                                        </TableCell>
                                        {
                                            Object.values(itemRows).map(row =>
                                                <TableCell align="center">{row}</TableCell>
                                            )
                                        }
                                        <TableCell align='center'>
                                            <Link to={`/details?sid=${itemRows['studentID']}&sem=${itemRows['semester']}&year=${itemRows['examYear']}&cgpa=${itemRows['cgpa']}`}
                                                onClick={(e) => e.preventDefault}
                                            >
                                                Details</Link>
                                        </TableCell>
                                    </TableRow>
                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </div>
    );
};

export default Result;

