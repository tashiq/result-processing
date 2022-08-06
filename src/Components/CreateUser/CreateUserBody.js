import { CircularProgress, LinearProgress, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import '../Login/LoginBody/LoginBody.css'
const CreateUserBody = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const rePasswordRef = useRef();
    const { createUser } = useAuth();
    const [progress, setProgress] = useState(true)
    const navigate = useNavigate();
    const handleLogin = e => {
        const email = emailRef.current.value;
        const pass = passwordRef.current.value;
        const rePass = rePasswordRef.current.value;
        e.preventDefault();
        if (!email || !pass) {
            alert('Empty Field');
            return;
        }
        if (pass !== rePass) {
            alert("Password and Confirmation password is not same.")
            return
        }
        setProgress(false);
        const supBtn = document.getElementById('signup-btn');
        supBtn.disabled = true;
        supBtn.style.backgroundColor = "rgb(169 169 231)"
        supBtn.style.color = '#d7d2d2'
        axios.get(`http://localhost:4000/users/${email}`).then(res => {
            if (res.data) {
                createUser(email, pass, navigate);
            }
            else {
                alert("Permission Denied")
                supBtn.disabled = false;
                supBtn.style.backgroundColor = "rgb(107, 107, 233)"
                supBtn.style.color = 'white';
                setProgress(true);
            }
        });
        passwordRef.current.value = '';
        rePasswordRef.current.value = '';
    }
    return (
        <div className='p-2' id='login-body'>
            <form id='form-container' onSubmit={handleLogin}>
                <Typography variant='h6' id='login-body-title'>Please Sign Up</Typography>
                <TextField variant='outlined' label="Name" inputRef={nameRef} id='name' className='w-75 mt-4'></TextField>
                <TextField variant='outlined' label="Email" inputRef={emailRef} id='username' className='w-75 mt-4'></TextField>
                <TextField variant='outlined' label="Password" inputRef={passwordRef} id='password' className='w-75 mt-4' type="password"></TextField>
                <TextField variant='outlined' label="Confirm Password" inputRef={rePasswordRef} id='password' className='w-75 mt-4' type="password"></TextField>

                <button className='sbmit mt-4' type='submit' id='signup-btn' onClick={handleLogin}>Sign Up {progress ? "" : <CircularProgress size="1rem" />}</button>
            </form>
        </div>
    );
};

export default CreateUserBody;