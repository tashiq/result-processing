import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import ToolbarGen from '../../Toolbar/Toolbar';
import './Home.css'
import congrates from '../../../Images/congrates.jpg'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Committees from '../../Committees/Committees';
const Home = () => {
    const { user } = useAuth();
    const [info, setInfo] = useState();
    const rows = ['Course code', 'Year', 'Completed']
    useEffect(() => {
        axios.get(`http://localhost:4000/examiners/${user.email}`)
            .then(res => {
                setInfo(res.data)
                // console.log(res.data);
            })
    }, [])

    const checkAllClear = () => {
        for (const item of info) {
            if (item.completed !== 1) return true;
        }
        return false
    }
    return (
        <div>
            <ToolbarGen title={"home"} />
            {
                info && checkAllClear() ?
                    <div className="committe box-shadow">
                        <div className='fs-3 mb-2'>
                            To Do
                        </div>
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
                                        info.map((itemRows, index) =>
                                            <TableRow
                                                key={index}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell align="center">{itemRows['courseCode']}</TableCell>
                                                <TableCell align="center">{itemRows['year']}</TableCell>
                                                <TableCell align="center">{itemRows['completed'] ? 'Yes' : 'X'}</TableCell>
                                            </TableRow>
                                        )
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    :
                    <div>
                        <h2>You are all clear!!</h2>
                        <img src={congrates} alt="Congrates" />
                    </div>



            }
            <Committees email={user.email} />

        </div>
    );
};

export default Home;