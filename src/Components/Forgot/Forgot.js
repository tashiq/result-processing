import { Button, TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import logo from '../../Images/cu_logo.png'
const Forgot = () => {
    const [semail, setEmail] = useState(null);
    const emailRef = useRef();
    const { resetPassword } = useAuth();
    const handleForgoSubmit = e => {
        e.preventDefault();
        const email = emailRef.current.value;
        // console.log(typeof email);
        if (email?.indexOf('@') > -1 && email?.indexOf('.') > -1) {
            resetPassword(email);
            setEmail(email);
            document.getElementById('form').style.display = 'none';
            document.getElementById('send-message').style.display = 'block';
        }
        else {
            alert('Invalid Email Address')
        }
    }
    useEffect(() => {
        document.getElementById('send-message').style.display = 'none'
    }, [])

    return (
        <div>
            <div className="navigation">
                <Link to="/"><img
                    style={{
                        width: '50px'
                    }}
                    src={logo} alt="user pic" />
                    <div className='nav-title'>
                        Chittagong University <br /> Result Processing System
                    </div>
                </Link>
            </div>
            <div className="forgot-input">
                <form id='form' className="forget-content" onSubmit={handleForgoSubmit}>
                    <TextField type={"email"} inputRef={emailRef} label="Your email address" className='' style={{
                        width: '350px'
                    }} />
                    <Button onClick={handleForgoSubmit} type="submit" variant='outlined' style={{
                        display: 'block',
                        width: '150px'
                    }}>Submit</Button>
                </form>
                <div id="send-message" className='forget-content'>
                    <span className='fs-2'
                        style={{
                            color: '#02025e'
                        }}
                    >Password Reset Email Send</span>
                    <br />
                    <span className='fs-6'>To</span>
                    <br />
                    <span className='fs-5' style={{
                        backgroundColor: '#d7d7d7',
                        padding: "9px 12px",
                        borderRadius: '12px'
                    }}>{semail}</span>
                    <br />
                    <span style={{
                        color: 'red'
                    }}>(*Please check the spam box)</span>
                </div>
            </div>
        </div>
    );
};

export default Forgot;