import { Autocomplete, LinearProgress, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';
import ToolbarGen from '../../Toolbar/Toolbar';

const Notify = () => {
    //  ?
    const { user } = useAuth();
    const [selectedEmail, setSelectedEmail] = useState([]);
    const [role, setRole] = useState(null);
    const navigate = useNavigate()
    const [users, setUsers] = useState([]);
    useEffect(
        () => {
            axios.get(`http://localhost:4000/users/${user.email}`).then(res => setRole(res.data.role))
        }
        , [user])
    if (role && role !== "exam committee") {
        navigate('/home')
    }
    useEffect(() => {
        axios.get(`http://localhost:4000/users/`)
            .then(res => setUsers(res.data))
    }, [])
    const handleNotificationSent = () => {
        const message = document.getElementById('notification-box').value;
        const selected = selectedEmail.map(item => item.email)
        const format = {
            emailList: selected,
            message
        }
        axios.post('http://localhost:4000/notifications', format)
    }
    return (
        <>
            <ToolbarGen title={"Notify"} />
            {
                role === "exam committee" ?
                    <div>
                        {/* email selection */}
                        {
                            users ?
                                <Autocomplete
                                    multiple
                                    id="tags-outlined"
                                    options={users}
                                    onChange={(e, value) => {
                                        setSelectedEmail([...value]);
                                    }}
                                    getOptionLabel={(option) => option.email}
                                    filterSelectedOptions
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Select email address"
                                            placeholder="Email"
                                        />
                                    )} /> : <LinearProgress />
                        }
                        {/* Message Box */}
                        <label htmlFor="notification-box" style={{
                            display: 'block',
                            padding: '20px 0px 7px 0'
                        }}>Message</label>
                        <textarea
                            id='notification-box'
                            cols="110"
                            rows="5"
                            style={{
                                boxShadow: '2px 2px 4px #c4c9c7',
                                padding: '12px',
                                fontSize: '18px'
                            }}>

                        </textarea>
                        <button
                            style={{ display: 'block' }}
                            className="sbmit"
                            onClick={handleNotificationSent}
                        >
                            Send
                        </button>
                    </div> :
                    "Please Wait".toLocaleUpperCase()
            }
        </>
    );
};

export default Notify;