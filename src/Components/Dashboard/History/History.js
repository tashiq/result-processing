import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import ToolbarGen from '../../Toolbar/Toolbar';
import './History.css'

const History = () => {
    const { user } = useAuth();
    const [dimension, setDimension] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:4000/history?submittedBy=${user.email}`)
            .then(res => {

                let prev = res.data[0]
                let arr = []
                let dim = []
                for (const item of res.data) {
                    const { paperCode, courseCode, courseName, exam, examYear, total, q1, q2, q3, q4, submissionTime } = item;
                    const newDate = new Date(submissionTime);
                    const showDate = newDate.getDate() + '/' + newDate.getMonth() + '/' + newDate.getFullYear();
                    const cur = { showDate, paperCode, courseCode, courseName, exam, examYear, total, q1, q2, q3, q4 }
                    if (item.examYear === prev.examYear && item.courseCode === prev.courseCode) {
                        arr = [...arr, cur]
                    }
                    else {
                        dim = [...dim, arr];
                        prev = item;
                        arr = [cur]
                    }
                }
                if (arr.length > 1) {
                    dim = [...dim, arr]
                }
                setDimension(dim);
            })
    }, [user])
    // console.log(rows);
    return (
        <div>
            <ToolbarGen title={"history"} />
            {
                dimension &&
                dimension.map((groups, i) =>
                    <details>
                        <summary className='collapse-summary'>
                            <div className='collapse-option'>
                                <span>🔽</span>
                                <span>Course Code: {groups[0].courseCode}</span>
                                <span>Exam Year: {groups[0].examYear}</span>
                            </div>
                        </summary>
                        <TableContainer component={Paper} className='mb-4'>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        {
                                            ["Date", "Paper Code", "Course Code", "Course Name", "Exam", "Exam Year", "Total", "Question 1", "Question 2", "Question 3", "Question 4"].map((row) =>
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
        </div >
    );
};

export default History;