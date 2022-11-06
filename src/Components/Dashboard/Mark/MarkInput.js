import axios from 'axios';
import { useEffect, useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import ToolbarGen from '../../Toolbar/Toolbar';
import logo from '../../../Images/cu_logo.png'
import './Mark.css'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
const MarkInput = () => {
    const { user } = useAuth(false);
    const [info, setInfo] = useState();
    const [catm, setCatm] = useState();
    useEffect(() => {
        axios.get(`http://localhost:4000/examiners/${user.email}`)
            .then(res => setInfo(res.data))
    }, [])
    // console.log(info);
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
        // document.getElementById('markinput-mark-submit-btn').disabled = true;
        // document.getElementById('markinput-mark-submit-btn').style.backgroundColor = '#8299b1'
        // console.log(document.getElementById('markinput-mark-submit-btn'));
        const exam = document.getElementById('markinput_exam_name').value;
        const year = document.getElementById('markinput_exam_type').value;
        const courseCode = document.getElementById('markinput_course').value;
        const courseName = document.getElementById('markinput_course_name').value;
        // if (year === '' || courseCode === '' || courseName === '') {
        // alert('Empty field')
        // return
        // }
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
            .then(res => res.data)
            .catch(err => console.log(err))

    }

    return (
        <div>
            <ToolbarGen title={"mark input"} />
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
                                চট্টগ্রাম বিশ্ববিদ্যালয়
                            </div>
                            <div className="markinput_heading markinput_top">
                                পরীক্ষার্থীদের প্রাপ্ত নম্বরের তালিকা
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
                                <label htmlFor="markinput_exam_name" style={{ paddingLeft: '9px', paddingRight: '9px' }}>পরীক্ষা</label>
                                <input type="number" name="exam_year" id="markinput_exam_type" min="1999" max="9999" className='input_underline' style={{ width: '70px', paddingLeft: '3px' }} />
                                <label htmlFor="markinput_exam_type" style={{ margin: '0px 4px', display: 'inline-block' }}>ইং</label>
                            </div>
                            <div className="markinput_top">
                                <label htmlFor="markinput_course_name" >বিষয়ঃ</label><input type="text" id='markinput_course_name' className='input_underline' style={{ paddingLeft: '5px' }} />
                                <label htmlFor="markinput_course_code" style={{ margin: '0px 4px', display: 'inline-block' }}>কোর্স কোডঃ</label>

                                <select name='exam_name' id='markinput_course' className='markinput_exam input_underline'>
                                    {
                                        info?.map((course) =>
                                            course.completed ? '' : <option value={course.courseCode}>{course.courseCode}</option>
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
                                                            <TableCell align="center">1</TableCell>
                                                            <TableCell align="center">2</TableCell>
                                                            <TableCell align="center">3</TableCell>
                                                            <TableCell align="center">4</TableCell>
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
                                                                    <TableCell align="center"><input type="text" className='table_input' name='q1' /></TableCell>
                                                                    <TableCell align="center"><input type="number" className='table_input' name='q2' min="0" /></TableCell>
                                                                    <TableCell align="center"><input type="number" className='table_input' name='q3' min="0" /></TableCell>
                                                                    <TableCell align="center"><input type="number" className='table_input' name='q4' min="0" /></TableCell>
                                                                    <TableCell align="center"><input type="number" className='table_input' name='total' min="0" /></TableCell>
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

