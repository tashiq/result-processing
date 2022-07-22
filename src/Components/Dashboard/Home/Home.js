
import React, { useState } from 'react';
import TableGen from '../../Table/Table';
import ToolbarGen from '../../Toolbar/Toolbar';
import './Home.css'
const Home = () => {
    const [contact, setContact] = useState([{ name: "Mohammad Fahim Foisal", position: "Student", mobile: "01974261254" }, { name: "Mohammad Sakib", position: "Student", mobile: "01774261254" }, { name: "Mohammad Noman", position: "Job", mobile: "01674261254" }]);

    const [teacher, setTeacher] = useState([{ name: "Mohammad Fahim Foisal", designation: "Student", mobile: "01974261254", email: "fahim.csecu@gmail.com" }, { name: "Mohammad Sakib", designation: "Student", mobile: "01774261254", email: "fahim.csecu@gmail.com" }, { name: "Mohammad Noman", designation: "Job", mobile: "01674261254", email: "fahim.csecu@gmail.com" }]);

    const [member, setMember] = useState([{ name: "Mohammad Fahim Foisal", mobile: "01974261254", email: "fahim.csecu@gmail.com" }, { name: "Mohammad Sakib", mobile: "01774261254", email: "fahim.csecu@gmail.com" }, { name: "Mohammad Noman", mobile: "01674261254", email: "fahim.csecu@gmail.com" }]);
    return (
        <div>
            <ToolbarGen title={"home"} />
            <div className="committe box-shadow">
                <div className='fs-3 mb-2'>
                    Exam Committe
                </div>
                <TableGen rows={["name", "contact", "email"]} values={member} />
            </div>
            <div className="teacher box-shadow">
                <div className='fs-3 mb-2'>
                    Teachers
                </div>
                <TableGen rows={["name", "designation", "mobile", "email"]} values={teacher} />
            </div>
            <div className="emergency box-shadow">
                <div className='fs-3 mb-2'>Emergency Contacts</div>
                <TableGen rows={["name", "position", "mobile"]} values={contact} />
            </div>
        </div>
    );
};

export default Home;