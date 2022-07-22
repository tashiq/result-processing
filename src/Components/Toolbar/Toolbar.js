import { Toolbar } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import img from '../../Images/person.png' // can be changed
const ToolbarGen = ({ title }) => {
    return (
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
            }}>{title}</div>
            <Link to="/profile"><img
                className='img-thumbnail' style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%'
                }}
                src={img} alt="user pic" /></Link>
        </Toolbar>
    );
};

export default ToolbarGen;