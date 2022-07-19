import { Toolbar } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import img from './../../../Images/cu_logo.png'

const Home = () => {
    return (
        <div>
            <Toolbar
                style={{
                    backgroundColor: 'white',
                    display: 'flex',
                    justifyContent: 'space-between',
                    boxShadow: "2px 2px 5px #9caf9b",
                    marginBottom: '20px'
                }}
            >
                <div style={{
                    textTransform: 'uppercase',
                    fontSize: '21px',
                    color: '#022b5e'
                }}>Home</div>
                <Link to="/dashboard/profile"><img
                    className='img-thumbnail' style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%'
                    }}
                    src={img} alt="user pic" /></Link>
            </Toolbar>
        </div>
    );
};

export default Home;