import { Autocomplete, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';
import ToolbarGen from '../../Toolbar/Toolbar';
import './AddExaminer.css'
const AddExaminer = () => {
    const { user } = useAuth();
    const [role, setRole] = useState(null);
    const navigate = useNavigate();
    const [info, setInfo] = useState({ email: '', courses: [] });
    const [course, setCourse] = useState([]);
    useEffect(
        () => {
            axios.get(`http://localhost:4000/users/${user.email}`).then(res => setRole(res.data[0].isExamCommittee))
            axios.get('http://localhost:4000/courses/').then(res => setCourse(res.data))
        }
        , [])
    if (role && role !== user.email) {
        navigate('/home')
    }
    const handleAddSubmit = e => {
        e.preventDefault();
        if (info.email?.indexOf('@') > -1 && info.email?.indexOf('.') > -1) {
            axios.post(`http://localhost:4000/examiners/`, { email: info.email, courses: info.courses })
                .then(() => {
                })
                .catch(err => { console.log(err) })
        }


    }
    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        const prev = { ...info };
        prev[name] = value;
        setInfo(prev)
    }
    return (
        <>
            <ToolbarGen title="Add an Examiner" />
            {
                role ?
                    <form onSubmit={handleAddSubmit} className="exam-add-committee" >

                        <div className='mark-item'>
                            <div className='icon mark-icon'>Email &nbsp;<span style={{ color: 'red' }}> *</span></div>
                            <input className='b-input mark-input' type="email" required name='email' onChange={handleChange} />
                        </div>
                        <div className='mark-item'>
                            <div className='icon mark-icon'>Course &nbsp;<span style={{ color: 'red' }}> *</span></div>
                            <Autocomplete
                                multiple
                                options={course}
                                getOptionLabel={(option) => option.courseCode}
                                isOptionEqualToValue={(option, value) => option.courseCode === value.courseCode}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        id='examiner-course-selection-field'
                                        variant="standard"
                                    />
                                )
                                }
                                onChange={(event, value) => {
                                    // console.log(value);
                                    const prev = { ...info }
                                    prev['courses'] = value;
                                    setInfo(prev)
                                }}
                                id="add-exam-select"
                                className='b-input mark-input'
                                style={{ backgroundColor: 'white' }}

                            />
                        </div>
                        <button className='sbmit mt-4' onClick={handleAddSubmit}>Assign</button>
                    </form> :
                    "Please Wait".toLocaleUpperCase()
            }
        </>
    );
};

export default AddExaminer;