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
        axios.get(`http://localhost:4000/history?submittedBy=${user.email}`)
            .then(res => {
                // console.log(res.data);
                const newItem = res.data.map(items => {
                    const { paperCode, courseCode, courseName, exam, examYear, total, q1, q2, q3, q4, submissionTime } = items;
                    const newDate = new Date(submissionTime);
                    const showDate = newDate.getHours() + ':' + newDate.getMinutes() + ' ' + newDate.getDate() + '/' + newDate.getMonth() + '/' + newDate.getFullYear();
                    return { showDate, paperCode, courseCode, courseName, exam, examYear, total, q1, q2, q3, q4 }
                })
                setRows(newItem)
            })
    }, [user])
    console.log(rows);
    return (
        <div>
            <ToolbarGen title={"history"} />
            {
                rows &&
                <TableGen rows={["Date", "Paper Code", "Course Code", "Course Name", "Exam", "Exam Year", "Total", "Question 1", "Question 2", "Question 3", "Question 4"]} values={rows} />
            }
        </div>
    );
};

export default History;