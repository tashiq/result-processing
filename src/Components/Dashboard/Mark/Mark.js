import { useRef } from 'react';
import ToolbarGen from '../../Toolbar/Toolbar';
import './Mark.css'
const Mark = () => {
    const cMark = useRef();
    const cCourse = useRef();
    const studentID = useRef();
    const sMark = useRef();
    const sCourse = useRef();
    const sCode = useRef();
    let option = document.querySelectorAll('input[name=exam]');
    for (const item of option) {
        document.getElementById('catm-field').style.display = "none";
        document.getElementById('semester-field').style.display = "none";
        item.addEventListener('click', () => {

            if (item.value === 'catm') {
                document.getElementById('catm-field').style.display = "block";
                document.getElementById('semester-field').style.display = "none";
            }
            else {
                document.getElementById('catm-field').style.display = "none";
                document.getElementById('semester-field').style.display = "block";
            }
        })
    }
    const handleSemSubmit = e => {
        const cO = {
            courseid: sCourse,
            code: sCode,
            mark: sMark
        }
        console.log(cO);
    }
    const handleCatmSubmit = e => {
        const cO = {
            courseid: cCourse,
            studentID: studentID,
            mark: cMark
        }
        console.log(cO);
    }
    return (
        <div>
            <ToolbarGen title={"mark input"} />
            <div className='mark-container'>
                <div className='ajura'>
                    <div className='catm-field'>
                        <div className='fs-4'>CATM mark</div>
                        {/* id, course code, mark,  */}
                        <div className='mark-item'>
                            <div className='icon mark-icon'>Course Code</div>
                            <input className='b-input mark-input' ref={cCourse} />
                        </div>
                        <div className='mark-item'>
                            <div className='icon mark-icon'>Student ID</div>
                            <input className='b-input mark-input' ref={studentID} />
                        </div>
                        <div className='mark-item'>
                            <div className='icon mark-icon'>Mark</div>
                            <input className='b-input mark-input' autoComplete='off' type="number" ref={cMark} />
                        </div>
                        <button className='btn btn-outline-dark mt-2 ' onClick={handleCatmSubmit}>Submit</button>
                    </div>
                    <div className='semester-field'>
                        <div className='fs-4'>Semester Final Mark</div>
                        <div className='mark-item'>
                            <div className='icon mark-icon'>Course Code</div>
                            <input className='b-input mark-input' ref={sCourse} />
                        </div>
                        <div className='mark-item'>
                            <div className='icon mark-icon'>Paper Code</div>
                            <input className='b-input mark-input' autoComplete='off' ref={sCode} />
                        </div>
                        <div className='mark-item'>
                            <div className='icon mark-icon'>Mark</div>
                            <input className='b-input mark-input' autoComplete='off' type="number" ref={sMark} />
                        </div>
                        <button className='btn btn-outline-dark mt-2 ' onClick={handleSemSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mark;