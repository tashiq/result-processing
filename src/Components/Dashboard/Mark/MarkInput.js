import axios from 'axios';
import { useEffect, useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import ToolbarGen from '../../Toolbar/Toolbar';
import logo from '../../../Images/cu_logo.png'
import './Mark.css'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const MarkInput = () => {
    const { user } = useAuth(false);
    const [info, setInfo] = useState();
    const [catm, setCatm] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`http://localhost:4000/examiners/${user.email}`)
            .then(res => {
                let prev = [];
                for (const item of res.data) {

                    if (item.completed === 0) {
                        prev = [...prev, item]
                    }
                }
                setInfo(prev);
            })
    }, [])
    const [input, setInput] = useState(true);
    const [rows, setRows] = useState(1);

    const handleRowNumber = () => {
        const rowNumber = document.getElementById('markinput_row_number').value;
        if (rowNumber !== null && rowNumber !== '0') {
            setRows(rowNumber)
            setInput(false)
        }
    }
    const handleMarkSubmit = e => {
        // console.log(document.getElementById('markinput-mark-submit-btn'));
        const exam = document.getElementById('markinput_exam_name').value;
        const year = document.getElementById('markinput_exam_type').value;
        const courseCode = document.getElementById('markinput_course').value;
        const courseName = document.getElementById('markinput_course_name').value;
        if (year === '') {
            alert('Empty year field')
            return
        }

        document.getElementById('markinput-mark-submit-btn').disabled = true;
        document.getElementById('markinput-mark-submit-btn').style.backgroundColor = '#8299b1'
        const rows = document.querySelectorAll('#markinput-body>tr');
        let allMarks = [];
        for (const row of rows) {
            let perPaper = {}
            for (const td of row.childNodes) {
                if (td.firstChild.tagName === 'INPUT') {
                    perPaper[td.firstChild.name] = td.firstChild.value;
                }
            }
            allMarks = [...allMarks, perPaper]
        }
        const result = {
            courseCode,
            courseName,
            exam,
            examYear: year,
            marks: allMarks,
            submittedBy: user.email
        }
        // console.log(result);

        axios.post(`http://localhost:4000/marks/`, result)
            .then(res => navigate('/history'))
            .catch(err => console.log(err))

    }
    const handleAllInput = (e) => {
        const value = e.target.value;
        for (const item of info) {
            if (item.courseCode === value && item.completed === 0) {
                document.getElementById('markinput_course_name').value = item.courseName;
            }
        }
    }
    const handleGreaterValue = e => {
        if (parseFloat(e.currentTarget.value ? e.currentTarget.value : 0) > 9) {
            e.currentTarget.style.borderBottom = '2px solid red'
            return
        } else {
            e.currentTarget.style.borderBottom = '2px solid grey'
        }
        const parentTag = e.currentTarget.parentNode.parentNode;
        // console.log(parentTag.childNodes[3].firstChild.value);
        let q1 = parseFloat(parentTag.childNodes[2].firstChild.value);
        q1 = q1 ? q1 : 0
        let q2 = parseFloat(parentTag.childNodes[3].firstChild.value);
        q2 = q2 ? q2 : 0
        let q3 = parseFloat(parentTag.childNodes[4].firstChild.value);
        q3 = q3 ? q3 : 0
        let q4 = parseFloat(parentTag.childNodes[5].firstChild.value);
        q4 = q4 ? q4 : 0
        parentTag.childNodes[6].firstChild.value = q1 + q2 + q3 + q4;
    }
    return (
        <div>

            <div className='ajura catm-field' >
                <h3>Select Marking Type</h3>
                <select name='mark-type' id='mark-type' className='markinput_exam input_underline'
                    onChange={(e) => { setCatm(e.target.value === 'catm' ? true : false) }}
                >
                    <option value="notcatm">Paper Evaluation</option>
                    <option value="catm">CATM</option>

                </select>
            </div>
            <div className='mark-container'>
                <div className='ajura'>
                    <div className='catm-field'>
                        <div>
                            <img src={logo} alt="CU logo" className='cu_logo_markinput' />
                            <div className='markinput_cu_title markinput_top'>
                                UNIVERSITY OF CHITTAGONG
                            </div>
                            <div className="markinput_heading markinput_top">
                                Obtained Marks by the Students
                            </div>
                            <div className='markinput_exam_name markinput_top'>
                                <select name='exam_name' id='markinput_exam_name' className='markinput_exam input_underline'>
                                    <option value="firstsem">1st Semester BSc. Engineering</option>
                                    <option value="secondsem">2nd  Semester BSc. Engineering</option>
                                    <option value="thirdsem">3rd Semester BSc. Engineering</option>
                                    <option value="fourthsem">4th Semester BSc. Engineering</option>
                                    <option value="fifthsem">5th Semester BSc. Engineering</option>
                                    <option value="sixthsem">6th Semester BSc. Engineering</option>
                                    <option value="seventhsem">7th Semester BSc. Engineering</option>
                                    <option value="eighthsem">8th Semester BSc. Engineering</option>
                                </select>
                                <label htmlFor="markinput_exam_name" style={{ paddingLeft: '9px', paddingRight: '9px' }}>Exam</label>
                                <input type="number" name="exam_year" id="markinput_exam_type" min="1999" max="9999" className='input_underline' style={{ width: '70px', paddingLeft: '3px' }} />

                            </div>
                            <div className="markinput_top">
                                <label htmlFor="markinput_course_name" >Course:</label>
                                <input type="text" id='markinput_course_name' className='input_underline' style={{ paddingLeft: '5px' }} defaultValue={info ? info[0]?.courseName : ''} />
                                <label htmlFor="markinput_course_code" style={{ margin: '0px 4px', display: 'inline-block' }}>Course Code</label>

                                <select name='exam_name' id='markinput_course' className='markinput_exam input_underline' onChange={handleAllInput}>
                                    {
                                        // console.log(info)
                                        info?.map((course) =>
                                            <option value={course.courseCode}>{course.courseCode}</option>
                                        )

                                    }
                                </select>

                            </div>
                        </div>

                        <hr />
                        {/* How many number of rows required!!!! */}
                        <div>
                            {input ?
                                <div className='markinput_top'>
                                    <label htmlFor="markinput_row_number" style={{ paddingRight: '9px' }}>Number of rows</label><input type="number" id='markinput_row_number' className='input_underline' min={'1'} />
                                    <button className='add_row_btn' onClick={handleRowNumber}>Submit</button>
                                </div>
                                :
                                <div className='markinput_top'>
                                    <TableContainer>
                                        {
                                            catm ?
                                                <Table sx={{ minWidth: 650 }} aria-label="simple table" id="markinput-table">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>Serial No.</TableCell>
                                                            <TableCell align="center">Student ID</TableCell>
                                                            <TableCell align="center">Obtained Mark</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody id="markinput-body">
                                                        {
                                                            Array(parseInt(rows)).fill(null).map((item, i) =>
                                                                <TableRow
                                                                    key={i}
                                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                >
                                                                    <TableCell scope="row">
                                                                        {i + 1}
                                                                    </TableCell>
                                                                    <TableCell align="center"><input type="text" className='table_input' name='studentID' /></TableCell>
                                                                    <TableCell align="center"><input type="number" className='table_input' name='total' min="0" /></TableCell>
                                                                </TableRow>
                                                            )
                                                        }
                                                    </TableBody>
                                                </Table>
                                                :
                                                <Table sx={{ minWidth: 650 }} aria-label="simple table" id="markinput-table">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>Serial No.</TableCell>
                                                            <TableCell align="center">Code Number</TableCell>
                                                            <TableCell align="center">Question 1</TableCell>
                                                            <TableCell align="center">Question 2</TableCell>
                                                            <TableCell align="center">Question 3</TableCell>
                                                            <TableCell align="center">Question 4</TableCell>
                                                            <TableCell align="center">Total Mark</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody id="markinput-body">
                                                        {
                                                            Array(parseInt(rows)).fill(null).map((item, i) =>
                                                                <TableRow
                                                                    key={i}
                                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                >
                                                                    <TableCell scope="row">
                                                                        {i + 1}
                                                                    </TableCell>
                                                                    <TableCell align="center"><input type="text" className='table_input' name='paperCode' /></TableCell>
                                                                    <TableCell align="center"><input type="text" className='table_input' name='q1' onChange={handleGreaterValue} /></TableCell>
                                                                    <TableCell align="center"><input type="number" className='table_input' name='q2' onChange={handleGreaterValue} min="0" /></TableCell>
                                                                    <TableCell align="center"><input type="number" className='table_input' name='q3' onChange={handleGreaterValue} min="0" /></TableCell>
                                                                    <TableCell align="center"><input type="number" className='table_input' name='q4' onChange={handleGreaterValue} min="0" /></TableCell>
                                                                    <TableCell align="center"><input type="number" className='table_input' name='total' min="0" disabled /></TableCell>
                                                                </TableRow>
                                                            )
                                                        }
                                                    </TableBody>
                                                </Table>
                                        }
                                    </TableContainer>
                                </div>
                            }
                            {
                                !input &&
                                <div>
                                    <button className='add_row_btn' id='markinput-mark-submit-btn' onClick={handleMarkSubmit}>Submit</button>
                                </div>
                            }
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MarkInput;




// <div className='mark-item'>
//                             <div className='icon mark-icon'>Course Code</div>
//                             <input className='b-input mark-input' type="text" ref={cCourse} />
//                         </div>
//                         <div className='mark-item choice-type'>
//                             <input type="radio" name='exam-type' id='catm' checked onClick={() => { setEtype(true) }} />
//                             <label htmlFor="catm">CATM marks</label>
//                             <input type="radio" name='exam-type' id='sem' />
//                             <label htmlFor="sem" onClick={() => { setEtype(false) }} >Semester Final Marks</label>
//                         </div>
//                         <div className='mark-item'>
//                             <div className='icon mark-icon'>{eType ? "Student ID" : "Paper Code"}</div>
//                             <input className='b-input mark-input' type="text" ref={code} />
//                         </div>
//                         <div className='mark-item'>
//                             <div className='icon mark-icon'>Mark</div>
//                             <input className='b-input mark-input' autoComplete='off' type="text" ref={cMark} />
//                         </div>
//                         <div className='mark-item'>
//                             <div className='icon mark-icon'>Exam Year</div>
//                             <input className='b-input mark-input' type="text" ref={year} />
//                         </div>
//                         <button className='btn btn-outline-dark mt-2 ' onClick={handleCatmSubmit}>Submit</button>

