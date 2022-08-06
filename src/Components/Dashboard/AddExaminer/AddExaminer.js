import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';
import ToolbarGen from '../../Toolbar/Toolbar';

const AddExaminer = () => {
    const { user } = useAuth();
    const [role, setRole] = useState(null);
    const navigate = useNavigate();
    const [info, setInfo] = useState({});
    useEffect(
        () => {
            axios.get(`http://localhost:4000/users/${user.email}`).then(res => setRole(res.data.role))
        }
        , [user])
    if (role && role !== "exam committee") {
        navigate('/home')
    }
    const handleAddSubmit = e => {
        if (info.email?.indexOf('@') > -1 && info.email?.indexOf('.') > -1 && info.password.length >= 6) {
            axios.post(`http://localhost:4000/users/`, { email: info.email, name: info.name }).then(() => {
            })
        }

        e.preventDefault();
    }
    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        const prev = { ...info };
        prev[name] = value;
        setInfo(prev)
        // console.log(prev);
    }
    return (
        <>
            <ToolbarGen title="Add an Examiner" />
            {
                role === "exam committee" ?
                    <form onSubmit={handleAddSubmit} className="exam-add-committee" >
                        <div className='mark-item'>
                            <div className='icon mark-icon'>Name<span style={{ color: 'red' }}> *</span></div>
                            <input className='b-input mark-input' type="text" required onChange={handleChange} name='name' />
                        </div>
                        <div className='mark-item'>
                            <div className='icon mark-icon'>Email <span style={{ color: 'red' }}> *</span></div>
                            <input className='b-input mark-input' type="email" required name='email' onChange={handleChange} />
                        </div>
                        <div className='mark-item'>
                            <div className='icon mark-icon'>Department</div>
                            <input className='b-input mark-input' type="text" name='department' onChange={handleChange} />
                        </div>
                        <div className='mark-item'>
                            <div className='icon mark-icon'>Faculty</div>
                            <input className='b-input mark-input' type="text" name='faculty' onChange={handleChange} />
                        </div>
                        <button className='sbmit mt-4' onClick={handleAddSubmit}>Save</button>
                    </form> :
                    "Please Wait".toLocaleUpperCase()
            }
        </>
    );
};

export default AddExaminer;