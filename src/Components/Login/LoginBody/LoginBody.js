import { TextField, Typography, Button } from '@mui/material';
import React from 'react';
import './LoginBody.css'
const LoginBody = () => {
    return (
        <div className='p-2' id='login-body'>
            <div id='form-container' className=''>
                <Typography variant='h6' id='login-body-title'>Please Login</Typography>
                <TextField variant='outlined' label="Username" id='username' className='w-75 mt-4'></TextField>
                <TextField variant='outlined' label="Password" id='password' className='w-75 mt-4' type="password"></TextField>
                <a href="#home" className='w-75 mt-2' style={{
                    fontSize: 14
                }}>Forgot password?</a>
                <button className='submit' id="login-submit">Log In</button>
            </div>
        </div>
    );
};

export default LoginBody;