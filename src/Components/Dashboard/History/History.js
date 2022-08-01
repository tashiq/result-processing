import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import TableGen from '../../Table/Table';
import ToolbarGen from '../../Toolbar/Toolbar';
import './History.css'

const History = () => {
    const { user } = useAuth();
    const [rows, setRows] = useState([]);
    useEffect(() => {
        axios.get(`https://frozen-journey-42014.herokuapp.com/exammark?editedBy=${user.email}`)
            .then(res => {
                const newItem = res.data.map(items => {
                    const { date, courseid, coursename, type, studentID, mark } = items;
                    const sem = courseid[courseid.length - 3];
                    const newDate = new Date(date);
                    const showDate = newDate.getMinutes() + ':' + newDate.getHours() + ' ' + newDate.getDate() + '/' + newDate.getMonth() + '/' + newDate.getFullYear();
                    return { showDate, sem, courseid, coursename, type, studentID, mark }
                })
                console.log(newItem);
                setRows(newItem)
            })
    }, [user])
    console.log(rows);
    return (
        <div>
            <ToolbarGen title={"history"} />
            {
                rows &&
                <TableGen rows={["date", "semester", "course id", "course name", "Type", "student id", "mark"]} values={rows} />
            }
        </div>
    );
};

export default History;