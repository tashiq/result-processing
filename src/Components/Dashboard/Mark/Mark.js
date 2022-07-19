import { Checkbox, Toolbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import img from './../../../Images/cu_logo.png'
import './Mark.css'
const Mark = () => {
    const [examType, setExamType] = useState();
    useEffect(() => {

    }, [examType])
    return (
        <div>
            <Toolbar
                style={{
                    backgroundColor: 'white',
                    display: 'flex',
                    justifyContent: 'space-between',
                    boxShadow: "2px 2px 5px #9caf9b",
                    marginBottom: '20px'
                }}
            >
                <div style={{
                    textTransform: 'uppercase',
                    fontSize: '21px',
                    color: '#022b5e'
                }}>Mark Input</div>
                <Link to="/dashboard/profile"><img
                    className='img-thumbnail' style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%'
                    }}
                    src={img} alt="user pic" /></Link>
            </Toolbar>
            <div className='mark-container'>
                <div className='confirmation'>
                    <div>
                        Confirm the type of the Marks
                    </div>
                    <div className='radio'>
                        <input type="radio" id="catm" name="exam" value="catm" />
                        <label for="catm">CATM marks</label><br />
                        <input type="radio" id="semester" name="exam" value="semester" />
                        <label for="semester">Semester final marks</label>
                    </div>
                </div>
                <div className='catm'>
                    hi
                </div>
                <div className='semester'>
                    hello
                </div>
            </div>
        </div>
    );
};

export default Mark;