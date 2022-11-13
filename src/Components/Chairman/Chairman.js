import { Autocomplete, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ToolbarGen from '../Toolbar/Toolbar';
import './Chairman.css'
const Chairman = () => {
    const [teachers, setTeachers] = useState([])
    const [selectedTeachers, setSelectedTeachers] = useState();
    const [semesterType, setSemesterType] = useState(false);
    const [year, setYear] = useState();
    useEffect(() => {
        axios.get('http://localhost:4000/users')
            .then(res => setTeachers(res.data))
    }, [])
    const handleCreateCommittee = () => {
        const data = {
            year,
            semesterType,
            selectedTeachers
        }
        axios.put('http://localhost:4000/examcommittee', data)
            .then(res => {
                alert('Assigned')
                document.getElementById('createExamCommittee').disabled = true;
                document.getElementById('createExamCommittee').style.backgroundColor = '#8299b1'
            })
            .catch(err => alert(err))
    }
    return (
        <div>
            <ToolbarGen title={"Exam Committee"} />
            <Autocomplete
                multiple
                id="tags-outlined"
                options={teachers}
                onChange={(e, value) => {
                    setSelectedTeachers([...value]);
                }}
                getOptionLabel={(option) => option.email}
                isOptionEqualToValue={(option, value) => option.email === value.email}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Select email address"
                        placeholder="Email"
                    />
                )} />
            <div>
                <label htmlFor="committee-year">Committee Year</label>
                <input type="number" id='committee-year' onChange={(e) => setYear(e.target.value)} />

                <label htmlFor="semester-type" id='semester-type-label'>Semester Type</label>
                <select type="text" id='semester-type' onChange={(e) =>
                    setSemesterType(e.target.value === '0' ? true : false)
                } >
                    <option value="1">Odd</option>
                    <option value="0">Even</option>
                </select>
            </div>
            <div>
                <button className='sbmit mt-3 btn-shadow' onClick={handleCreateCommittee} id="createExamCommittee">Create</button>
            </div>
        </div>
    );
};

export default Chairman;