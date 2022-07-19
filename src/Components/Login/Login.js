import React from 'react';
import HeadingLogin from './Heading_Login';
import './login.css'
import LoginBody from './LoginBody/LoginBody';
const Login = () => {
    return (
        <div id='login-container-body'>
            <HeadingLogin />
            <LoginBody />
        </div>
    );
};

export default Login;