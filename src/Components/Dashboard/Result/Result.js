import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ToolbarGen from '../../Toolbar/Toolbar';
import './Result.css'
const Result = () => {

    const [result, setResult] = useState([])
    const [dimension, setDimension] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:4000/result')
            .then(res => {
                setResult(res.data)
                let prev = res.data[0]
                let arr = []
                let dim = []
                for (const item of res.data) {
                    if (item.examYear === prev.examYear && item.semester === prev.semester) {
                        arr = [...arr, item]
                    }
                    else {
                        dim = [...dim, arr];
                        prev = item;
                        arr = [item]
                    }
                }
                if (arr.length > 1) {
                    dim = [...dim, arr]
                }
                setDimension(dim);
            })
    }, [])
    const rows = ['Student ID', 'Name', 'Hall', 'Semester', 'Exam Year', 'CGPA', ''];
    return (
        <div>
            <ToolbarGen title={"Result"} />
            {
                dimension &&
                dimension.map((groups, i) =>
                    <details>
                        <summary className='collapse-summary'>
                            <div className='collapse-option'>
                                <span>🔽</span>
                                <span>Semester: {groups[0].semester}</span>
                                <span>Exam Year: {groups[0].examYear}</span>
                            </div>
                        </summary>
                        <TableContainer component={Paper} className='mb-4'>
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

                                < TableBody >{
                                    // console.log(groups, i)
                                    groups.map((itemRows, index) =>

                                        <TableRow
                                            key={i}
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
                    </details>
                )
            }
        </div>
    );
};

export default Result;

