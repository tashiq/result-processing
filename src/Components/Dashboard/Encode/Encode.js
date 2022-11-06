import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ToolbarGen from '../../Toolbar/Toolbar';
import './Encode.css'
const Encode = () => {
    const [courseCode, setCourseCode] = useState([]);
    useEffect(
        () => {
            axios.get('http://localhost:4000/allcoursecode')
                .then(res => setCourseCode(res.data))
        }
        , [])
    const handleEncodeSubmit = e => {
        const allBlocks = document.getElementsByClassName('encode-unit');
        let result = []
        for (let i = 0; i < allBlocks.length; i++) {
            const nodes = allBlocks[i].childNodes;
            if (nodes[0].value !== '')
                result = [...result, { studentId: nodes[0].value, paperCode: nodes[1].value }]
        }
        axios.post('http://localhost:4000/decode', result)
            .catch(err => alert(err))
    }
    return (
        <div>
            <ToolbarGen title="Decode" />
            <div id="encode-container">
                {
                    courseCode ?
                        <>
                            {

                                courseCode.map((code) =>
                                    <div className='encode-unit'>
                                        <input type="text" className='stdid' autoComplete='off' placeholder='Student ID' />
                                        <input type="text" disabled className='Acode' autoComplete='off' placeholder='Paper Code' value={code.paperCode} />
                                    </div>
                                )
                            }
                        </>
                        : 'You All Set'
                }
            </div>
            <button className='sbmit encode-submit' onClick={handleEncodeSubmit} >Submit</button>
        </div>
    );
};

export default Encode;