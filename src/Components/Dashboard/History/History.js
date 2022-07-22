import React, { useState } from 'react';
import TableGen from '../../Table/Table';
import ToolbarGen from '../../Toolbar/Toolbar';
import './History.css'

const History = () => {
    const [rows, setRows] = useState([{ date: "12/2/21", semester: "5th", course: "CSE412", cname: "Data Communication", sid: "19701051", mark: "12.1" }]);
    return (
        <div>
            <ToolbarGen title={"history"} />
            <TableGen rows={["date", "semester", "course id", "course name", "student id", "mark"]} values={rows} />
        </div>
    );
};

export default History;