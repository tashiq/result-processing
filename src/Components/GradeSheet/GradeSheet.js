import React, { useEffect, useState } from 'react';
import './GradeSheet.css'
import blackLogo from '../../Images/cu_logo_black.png'
import axios from 'axios';
const GradeSheet = ({ id }) => {
    const [result, setResult] = useState();
    let last = []
    const [courses, setCourses] = useState([])
    const params = new URLSearchParams(window.location.search);
    const url = `http://localhost:4000/gradesheet?sid=${params.get('sid')}&sem=${params.get('sem')}&year=${params.get('year')}`
    useEffect(() => {
        axios.get(url)
            .then(res => setResult(res.data))
        axios.get(`http://localhost:4000/courses/${params.get('sem')}`)
            .then(res => setCourses(res.data))
    }, [])

    const PatchUp = () => {
        let temp = []
        for (const course of courses) {
            let found = false;
            const code = course.courseCode
            for (const res of result) {
                if (res.courseCode === code) {
                    found = true;
                    temp = [...temp, res];
                    break;
                }
            }
            if (!found) {
                temp = [...temp, {
                    courseCode: code,
                    courseName: course.courseName,
                    credit: course.credit,
                    grade: -1
                }]
            }
        }
        last = [...temp];
        return true;
    }
    const earnedCreditCalc = () => {
        let sum = 0
        for (const item of last) {
            sum += item['grade'] >= 2.00 ? item['credit'] : 0
        }
        return sum;
    }
    const totalCreditCalc = () => {
        let sum = 0
        for (const item of last) {
            sum += item['credit']
        }
        return sum;
    }
    const gradeCalc = grade => {
        switch (grade) {
            case 4.00: return 'A+'
            case 3.75: return 'A'
            case 3.50: return 'A-'
            case 3.25: return 'B+'
            case 3.00: return 'B'
            case 2.75: return 'B-'
            case 2.50: return 'C+'
            case 2.25: return 'C'
            case 2.00: return 'D'
            case 0.00: return 'F'
            default: return 'X'
        }
    }
    const semeseterCalc = grade => {
        switch (grade) {
            case 1: return '1st'
            case 2: return '2nd'
            case 3: return '3rd'
            case 4: return '4th'
            case 5: return '5th'
            case 6: return '6th'
            case 7: return '7th'
            case 8: return '8th'
            default: return '0'
        }
    }
    const calcGrade = (a, b) => {
        return (a * b) < 0 ? 0 : a * b;
    }
    return (
        <div className='invisibility'>
            {
                result && courses && PatchUp() &&
                <div className='gradesheet-container' id={id}>
                    <div className='gradesheet-top'>
                        <div>Serial no. : 1</div>
                        <div className='marksheet-cu-info'>
                            <img src={blackLogo} alt="ki?" style={{ width: "60px" }} />
                            <div>UNIVERSITY OF CHITTAGONG</div>
                            <div>Chittagong, Bangladesh</div>
                            <div>Department of Computer Science and Engineering</div>
                            <div>GRADE SHEET</div>
                            <div>{last && semeseterCalc(result[0]?.semester)}&nbsp;Semester B.Sc. Engineering Examination, {last && result[0]?.examYear}</div>
                        </div>
                        <div className=''>
                            <table className='points-table'>
                                <thead>
                                    <tr>

                                        <th style={{ width: '132.28346457px', textAlign: 'left' }}>Numerical Ranges</th>
                                        <th style={{ width: '80.0551181px', textAlign: 'center' }}>Letter Grades</th>
                                        <th style={{ width: '109.38582677px', textAlign: 'center' }}>Grade Points</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{ textAlign: 'left' }}>80% and above</td>
                                        <td style={{ textAlign: 'center' }}>A+</td>
                                        <td style={{ textAlign: 'center' }}>4.00</td>
                                    </tr>
                                    <tr>
                                        <td style={{ textAlign: 'left' }}>75% to less than 80%</td>
                                        <td style={{ textAlign: 'center' }}>A</td>
                                        <td style={{ textAlign: 'center' }}>3.75</td>
                                    </tr>
                                    <tr>
                                        <td style={{ textAlign: 'left' }}>70% to less than 75%</td>
                                        <td style={{ textAlign: 'center' }}>A-</td>
                                        <td style={{ textAlign: 'center' }}>3.50</td>
                                    </tr>
                                    <tr>
                                        <td style={{ textAlign: 'left' }}>65% to less than 70%</td>
                                        <td style={{ textAlign: 'center' }}>B+</td>
                                        <td style={{ textAlign: 'center' }}>3.25</td>
                                    </tr>
                                    <tr>
                                        <td style={{ textAlign: 'left' }}>60% to less than 65%</td>
                                        <td style={{ textAlign: 'center' }}>B</td>
                                        <td style={{ textAlign: 'center' }}>3.00</td>
                                    </tr>
                                    <tr>
                                        <td style={{ textAlign: 'left' }}>55% to less than 60%</td>
                                        <td style={{ textAlign: 'center' }}>B-</td>
                                        <td style={{ textAlign: 'center' }}>2.75</td>
                                    </tr>
                                    <tr>
                                        <td style={{ textAlign: 'left' }}>50% to less than 55%</td>
                                        <td style={{ textAlign: 'center' }}>C+</td>
                                        <td style={{ textAlign: 'center' }}>2.50</td>
                                    </tr>
                                    <tr>
                                        <td style={{ textAlign: 'left' }}>45% to less than 50%</td>
                                        <td style={{ textAlign: 'center' }}>C</td>
                                        <td style={{ textAlign: 'center' }}>2.25</td>
                                    </tr>
                                    <tr>
                                        <td style={{ textAlign: 'left' }}>40% to less than 45%</td>
                                        <td style={{ textAlign: 'center' }}>D</td>
                                        <td style={{ textAlign: 'center' }}>2.00</td>
                                    </tr>
                                    <tr>
                                        <td style={{ textAlign: 'left' }}>Less than 40%</td>
                                        <td style={{ textAlign: 'center' }}>F</td>
                                        <td style={{ textAlign: 'center' }}>0.00</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='student-info'>
                        <div className='student-info-unit'>
                            <div className='student-info-key'>Name</div>
                            <div className='student-info-value'>: &nbsp;{
                                params.get('name')
                            }</div> </div>
                        <div className='student-info-unit'>
                            <div className='student-info-key'>Student ID</div>
                            <div className='student-info-value'>: &nbsp;{params.get('sid')}</div></div>
                        <div className='student-info-unit'>
                            <div className='student-info-key'>Hall</div>
                            <div className='student-info-value'>: &nbsp;{params.get('hall')}</div> </div>
                    </div>
                    <div className='gradesheet-mark'>
                        <table>
                            <thead>
                                <tr>
                                    <th style={{ width: '188.97637795px', textAlign: 'center' }}>Course Codes</th>
                                    <th style={{ width: '321.25984252px', textAlign: 'center' }}>Course Titles</th>
                                    <th style={{ width: '75.590551181px', textAlign: 'center' }}>Credits</th>
                                    <th style={{ width: '132.28346457px', textAlign: 'center' }}>Letter Grades</th>
                                    <th style={{ width: '76.0551181px', textAlign: 'center' }}>Grade Points</th>
                                    <th style={{ width: '113.38582677px', textAlign: 'center' }}>Points Secuired</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    last?.map(row =>
                                        <tr>

                                            <td style={{ textAlign: 'center' }}>{row.courseCode}</td>
                                            <td style={{ textAlign: 'left' }}>{row.courseName}</td>
                                            <td style={{ textAlign: 'center' }}>{row.credit}</td>
                                            <td style={{ textAlign: 'center' }}>{gradeCalc(row.grade)}</td>
                                            <td style={{ textAlign: 'center' }}>{row.grade < 0 ? '0.00' : row.grade}</td>
                                            <td style={{ textAlign: 'center' }}>{calcGrade(row.grade, row.credit)}</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className='gradesheet-result-info'>
                        <div className='student-info-unit'>
                            <div className='result-info-key'>Total Credit Offered</div>
                            <div className='result-info-value'>: &nbsp;{last && totalCreditCalc()}</div> </div>
                        <div className='student-info-unit'>
                            <div className='result-info-key'>Total Credit Earned</div>
                            <div className='result-info-value'>: &nbsp;{last && earnedCreditCalc()}</div></div>
                        <div className='student-info-unit'>
                            <div className='result-info-key'>Grade Point Average</div>
                            <div className='result-info-value'>: &nbsp;{params.get('cgpa')}</div>
                        </div>
                        <div className='student-info-unit'>
                            <div className='result-info-key'>Result</div>
                            <div className='result-info-value'>: &nbsp;{params.get('cgpa') >= 2.0 ? 'Pass' : 'Fail'}</div>
                        </div>
                    </div>
                    <div className='gradesheet-bottom'>
                        <div className='gradesheet-bottom-input-container'>
                            <div>
                                <label htmlFor="mark-pub">Date of Publication</label>
                                <input type="text" id='mark-pub' />
                            </div>
                            <div>
                                <label htmlFor="mark-issue">Date of Issue</label>
                                <input type="text" id='mark-issue' />
                            </div>
                        </div>
                        <div className='gradesheet-bottom-input-container'>
                            <div>
                                <label htmlFor="mark-prep">Prepared By</label>
                                <input type="text" id='mark-prep' />
                            </div>
                            <div>
                                <label htmlFor="mark-compared">Compared By</label>
                                <input type="text" id='mark-compared' />
                            </div>
                        </div>
                        <div className='gradesheet-bottom-input-container'>
                            <div style={{ marginBottom: '9px' }}>
                                <input type="text" id='mark-main-examiner' />
                            </div>
                            <div>
                                <label htmlFor="mark-main-examiner" id='controller'>Controller of Examinations<br /> University of Chittagong</label>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default GradeSheet;