import { Toolbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import axios from 'axios'
import img from '../../Images/person.png' // can be changed
const ToolbarGen = ({ title }) => {
    const { user } = useAuth()
    const [photo, setPhoto] = useState(null);
    useEffect(() => {
        axios.get(`http://localhost:4000/users/${user.email}`).then(res => setPhoto(res.data.photo))
    }, [user])
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
                src={photo ? photo : img} alt="user pic" /></Link>
        </Toolbar>
    );
};

export default ToolbarGen;