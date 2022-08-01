import axios from "axios";
import { useEffect, useState } from "react";
const InfoSection = ({ info }) => {
    const [btnToggle, setBtnToggle] = useState(true);
    const [update, setUpdate] = useState({});
    const [data, setData] = useState({ ...info });
    useEffect(() => {
        setData({ ...info })
    }, [info])
    // console.log(data);
    const handleEdit = () => {
        setBtnToggle(!btnToggle);
        setUpdate({ ...info });
    }
    const handleInput = e => {
        const name = e.target.name;
        const value = e.target.value;
        const current = { ...update };
        current[name] = value;
        setUpdate({ ...current });
    }
    const handleEditSubmit = e => {
        setBtnToggle(true);
        axios.put(`https://frozen-journey-42014.herokuapp.com/users?email=${data.email}`, update)
            .then(res => {
                if (res) {
                }
            })
        setData({ ...update })
    }
    return (
        <div className='info-section'>
            <div onClick={handleEdit}>
                {btnToggle ?
                    <button className='edit-btn'>Edit Profile</button> :
                    <button className='edit-btn'>Cancel</button>
                }
            </div>
            {btnToggle &&
                <div>
                    <div className='main-info' style={{
                        minHeight: "50px",
                    }}>
                        <div className='desig'>{data.designation || ""}</div>
                        <div className='name'>{data.name || ""}</div>
                        <div className='email'>{data.email || ""}</div>
                    </div>
                    <div >
                        <ul className='basic-info'>
                            <li className='b-item'>
                                <i className="fas icon fa-school"></i>
                                <span className='b-topic'>Faculty</span>
                                <div className='b-text'>
                                    <div className='b-value'>
                                        <div className='b-inner-text'>{data.faculty || ""}</div>
                                    </div>
                                </div>
                            </li>
                            <li className='b-item'>
                                <i className="fas icon fa-graduation-cap"></i>
                                <span className='b-topic'>Department</span>
                                <div className='b-text'>

                                    <div className='b-value'>
                                        <div className='b-inner-text'>{data.department || ""}</div>

                                    </div>
                                </div>
                            </li>
                            <li className='b-item'>
                                <i className="fas icon fa-tint"></i>
                                <span className='b-topic'>Blood Group
                                </span>
                                <div className='b-text'>

                                    <div className='b-value'>
                                        <div className='b-inner-text'>{data.blood || ""}</div>

                                    </div>
                                </div>
                            </li>
                            <li className='b-item'>
                                <i className="fas icon fa-phone"></i>
                                <span className='b-topic'>Phone
                                </span>
                                <div className='b-text'>

                                    <div className='b-value'>
                                        <div className='b-inner-text'>{data.phone || ""}</div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            }
            {!btnToggle &&
                <div>
                    <div className='main-info' style={{
                        minHeight: "50px",
                    }}>
                        <input className='desig' value={update.designation} onChange={handleInput} name="designation" />
                        <input className='name' value={update.name} onChange={handleInput} name="name" />
                        <input className='email' value={update.email} disabled onChange={handleInput} name="email" />
                    </div>
                    <div >
                        <ul className='basic-info'>
                            <li className='b-item'>
                                <i className="fas icon fa-school"></i>
                                <span className='b-topic'>Faculty</span>
                                <div className='b-text'>
                                    <div className='b-value'>
                                        <input className='b-inner-text' value={update.faculty} onChange={handleInput} name="faculty" />
                                    </div>
                                </div>
                            </li>
                            <li className='b-item'>
                                <i className="fas icon fa-graduation-cap"></i>
                                <span className='b-topic'>Department</span>
                                <div className='b-text'>

                                    <div className='b-value'>
                                        <input className='b-inner-text' value={update.department} onChange={handleInput} name="department" />
                                    </div>
                                </div>
                            </li>
                            <li className='b-item'>
                                <i className="fas icon fa-tint"></i>
                                <span className='b-topic'>Blood Group
                                </span>
                                <div className='b-text'>

                                    <div className='b-value'>
                                        <input className='b-inner-text' value={update.blood} onChange={handleInput} name="blood" />
                                    </div>
                                </div>
                            </li>
                            <li className='b-item'>
                                <i className="fas icon fa-phone"></i>
                                <span className='b-topic'>Phone
                                </span>
                                <div className='b-text'>

                                    <div className='b-value'>
                                        <input className='b-inner-text' value={update.phone} onChange={handleInput} name="phone" />
                                    </div>
                                </div>
                            </li>
                            <li className='b-item'>
                                <button onClick={handleEditSubmit}>Submit</button>
                            </li>
                        </ul>
                    </div>
                </div>
            }
        </div>
    );
};

export default InfoSection;
// Precaution: kew ekhane asle gali dis na.... alsemi kore design change kori nai.