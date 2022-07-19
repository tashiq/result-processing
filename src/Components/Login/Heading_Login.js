import React from 'react';
import cu_logo from '../../Images/cu_logo.png'
import './HeadingLogin.css'
const HeadingLogin = () => {
    return (
        <div className='d-flex flex-column align-items-center' id='login-heading'>
            <img src={cu_logo} alt="CU logo" width={50} />
            <div className="fs-2">University of Chittagong</div>
            <div className='fs-4 fw-semibold'>Result Processing</div>
        </div>
    );
};

export default HeadingLogin;