import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import './Details.css'
import GradeSheet from '../GradeSheet/GradeSheet';
const Details = () => {
    const params = new URLSearchParams(window.location.search)
    const [result, setResult] = useState([]);
    useEffect(() => {
        const url = `http://localhost:4000/detailresult?sid=${params.get('sid')}&sem=${params.get('sem')}&year=${params.get('year')}`
        axios.get(url)
            .then(res => setResult(res.data))
            .catch(err => console.log(err))
    }, [])
    const handlePrintGradeSheet = e => {
        const gradesheet = document.getElementById('gradesheet').innerHTML;
        console.log(gradesheet);
        const current = document.body.innerHTML;

        document.body.innerHTML = gradesheet
        window.print()
        document.body.innerHTML = current;
    }
    const rows = ["CourseCode", "CourseName", "Total", "Paper Code", "Question 1", "Question 2", "Question 3", "Question 4", "Exam Year", "Submitted By", "Submission Time"]
    return (
        <div>
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
                            result?.map((itemRows, index) =>
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
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <div className='mt-4'>
                {
                    <GradeSheet id="gradesheet"></GradeSheet>
                }

                <button className='sbmit encode-submit btn-shadow' id='print-marksheet-btn' onClick={handlePrintGradeSheet}>Print Marksheet</button>
            </div>
        </div>
    );
};

export default Details;