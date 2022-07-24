import { async } from '@firebase/util';
import { TextField, Typography } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';
import './LoginBody.css'
const LoginBody = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { emailSignIn, error, user } = useAuth();
    const location = useLocation();;
    const navigate = useNavigate();

    // const btn = document.getElementById('login-btn');
    // console.log(btn);
    // btn.addEventListener('click', () => {
    //     const email = emailRef.current.value;
    //     const pass = passwordRef.current.value;
    //     emailSignIn(email, pass, location, navigate);
    //     console.log("clicked");

    // }
    // )

    window.onchange = () => {
        const btn = document.getElementById('login-btn');
        // console.log(btn);
        btn.addEventListener('click', () => {
            const email = emailRef.current.value;
            const pass = passwordRef.current.value;
            emailSignIn(email, pass, location, navigate);
            // console.log(result);
        }
        )
    }
    return (
        <div className='p-2' id='login-body'>
            <div id='form-container' className=''>
                <Typography variant='h6' id='login-body-title'>Please Login</Typography>
                <TextField variant='outlined' label="Email" inputRef={emailRef} id='username' className='w-75 mt-4'></TextField>
                <TextField variant='outlined' label="Password" inputRef={passwordRef} id='password' className='w-75 mt-4' type="password"></TextField>
                <a href="#home" className='w-75 mt-2' style={{
                    fontSize: 14
                }}>Forgot password?</a>
                <button className='sbmit' id='login-btn'>Log In</button>
            </div>
        </div>
    );
};

export default LoginBody;