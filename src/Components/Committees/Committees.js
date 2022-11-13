import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
// homepage(chairman)
const Committees = ({ email }) => {
    const [info, setInfo] = useState(false)
    const [committees, setCommittees] = useState([]);
    // console.log(email);
    useEffect(() => {
        axios.get(`http://localhost:4000/users/${email}`).then(res => {
            if (res.data[0].isChairman === 1) {
                setInfo(true);
            }
        })

        axios.get(`http://localhost:4000/committees`)
            .then(res => setCommittees(res.data));
    }, [])
    return (
        <div>
            {
                committees && info &&
                <>
                    <h3>Exam Committees</h3>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    {
                                        ["email", "year", "Semester Types"].map((row) =>
                                            <TableCell align="center" className='text-capitalize'>{row}</TableCell>
                                        )
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    committees.map((itemRows, index) =>
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell align="center">{itemRows['email']}</TableCell>
                                            <TableCell align="center">{itemRows['year']}</TableCell>
                                            <TableCell align="center">{itemRows['semesterType'] ? 'Odd' : 'Even'}</TableCell>
                                        </TableRow>
                                    )
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            }
        </div >
    );
};

export default Committees;