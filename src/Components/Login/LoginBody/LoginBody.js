import { async } from '@firebase/util';
import { TextField, Typography } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';
import './LoginBody.css'
const LoginBody = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { emailSignIn, error, user } = useAuth();
    const location = useLocation();;
    const navigate = useNavigate();
    const handleLogin = e => {
        e.preventDefault();
        const email = emailRef.current.value;
        const pass = passwordRef.current.value;
        emailSignIn(email, pass, location, navigate);
        emailRef.current.value = '';
        passwordRef.current.value = '';
    }
    return (
        <div className='p-2' id='login-body'>
            <form id='form-container' onSubmit={handleLogin}>
                <Typography variant='h6' id='login-body-title'>Please Login</Typography>
                <TextField variant='outlined' label="Email" inputRef={emailRef} id='username' className='w-75 mt-4'></TextField>
                <TextField variant='outlined' label="Password" inputRef={passwordRef} id='password' className='w-75 mt-4' type="password"></TextField>
                <Link to={"/forgot-pass"} style={{
                    width: '100%',
                    marginLeft: '150px',
                    marginTop: '10px'
                }}>Forgot Password?</Link>
                <button className='sbmit mt-4' type='submit' id='login-btn' onClick={handleLogin}>Log In</button>
            </form>
        </div>
    );
};

export default LoginBody;