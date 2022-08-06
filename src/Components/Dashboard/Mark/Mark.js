import axios from 'axios';
import { useRef, useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import ToolbarGen from '../../Toolbar/Toolbar';
import './Mark.css'
const Mark = () => {
    const cMark = useRef();
    const cCourse = useRef();
    const code = useRef();
    const year = useRef();
    const { user } = useAuth();
    const [eType, setEtype] = useState(true); // true = catm
    const handleCatmSubmit = e => {
        if (cCourse.current.value &&
            code.current.value &&
            cMark.current.value &&
            year.current.value) {
            const cO = {
                courseid: cCourse.current.value,
                studentID: code.current.value,
                mark: cMark.current.value,
                year: year.current.value,
                type: eType ? "CATM" : "semester",
                examiner: user.email,
                date: new Date()
            }
            axios.post(`http://localhost:4000/exammark?type=catm&code=${cO.studentID}`, cO)
                .then(res => console.log(res))
            // console.log(cO);
            cCourse.current.value = ""
            code.current.value = ""
            cMark.current.value = ""
            year.current.value = ""
        }
        else {
            alert("Missing Input")
        }
    }
    return (
        <div>
            <ToolbarGen title={"mark input"} />
            <div className='mark-container'>
                <div className='ajura'>
                    <div className='catm-field'>
                        <div className='fs-4'>Mark Submission</div>
                        {/* id, course code, mark,  */}
                        <div className='mark-item'>
                            <div className='icon mark-icon'>Course Code</div>
                            <input className='b-input mark-input' type="text" ref={cCourse} />
                        </div>
                        <div className='mark-item choice-type'>
                            <input type="radio" name='exam-type' id='catm' checked onClick={() => { setEtype(true) }} />
                            <label htmlFor="catm">CATM marks</label>
                            <input type="radio" name='exam-type' id='sem' />
                            <label htmlFor="sem" onClick={() => { setEtype(false) }} >Semester Final Marks</label>
                        </div>
                        <div className='mark-item'>
                            <div className='icon mark-icon'>{eType ? "Student ID" : "Paper Code"}</div>
                            <input className='b-input mark-input' type="text" ref={code} />
                        </div>
                        <div className='mark-item'>
                            <div className='icon mark-icon'>Mark</div>
                            <input className='b-input mark-input' autoComplete='off' type="text" ref={cMark} />
                        </div>
                        <div className='mark-item'>
                            <div className='icon mark-icon'>Exam Year</div>
                            <input className='b-input mark-input' type="text" ref={year} />
                        </div>
                        <button className='btn btn-outline-dark mt-2 ' onClick={handleCatmSubmit}>Submit</button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Mark;