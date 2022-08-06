import React, { useState } from 'react';
import './Encode.css'
const Encode = () => {
    const [pair, setPair] = useState([])
    const addField = e => {
        const parent = document.getElementById('encode-container');
        const div = document.createElement('div');
        div.classList.add("encode-unit");
        const stdid = document.createElement('input');
        stdid.classList.add('stdid');
        stdid.setAttribute('placeholder', "Student ID");
        stdid.setAttribute('autoComplete', "off");
        stdid.setAttribute('type', 'text')
        const code = document.createElement('input');
        code.setAttribute('placeholder', "Code");
        code.setAttribute('autoComplete', "off");
        code.setAttribute('type', 'text')
        code.classList.add('code');
        div.appendChild(stdid)
        div.appendChild(code)
        parent.appendChild(div);
    }
    const handleEncodeSubmit = e => {
        setPair([]);
        const stdid = document.getElementsByClassName('stdid');
        const cd = document.getElementsByClassName('code');
        for (let i = 0; i < cd.length; i++) {
            const cur = { studentID: stdid[i].value, code: cd[i].value };
            console.log(cur);
            // const prev = [...pair, cur];
            // console.log(prev);
            // setPair([...prev]);
        }
    }

    return (
        <div>
            <div id="encode-container">
                <div className='encode-unit'>
                    <input type="text" className='stdid' autoComplete='off' placeholder='Student ID' />
                    <input type="text" className='code' autoComplete='off' placeholder='Code' />
                </div>
            </div>
            <button
                className='encode-plus'
                onClick={addField}
            >+</button>
            <button className='sbmit encode-submit' onClick={handleEncodeSubmit} >Submit</button>
        </div>
    );
};

export default Encode;