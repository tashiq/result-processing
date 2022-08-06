import React from 'react';
import CreateUserBody from './CreateUserBody';
import HeadingLogin from '../Login/Heading_Login';
import '../Login/login.css'
// import LoginBody from './LoginBody/LoginBody';
const CreateUser = () => {
    return (
        <div id='login-container-body'>
            <HeadingLogin />
            <CreateUserBody />
            {/* <LoginBody /> */}
        </div>
    );
};

export default CreateUser;