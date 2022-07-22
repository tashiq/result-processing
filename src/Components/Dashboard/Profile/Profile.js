import './profile.css';
import { useEffect } from 'react';
import person from '../../../Images/person.png'
import ToolbarGen from '../../Toolbar/Toolbar';
const Profile = () => {
    useEffect(() => {
        const items = document.getElementsByClassName('edit');
        for (const item of items) {
            item.addEventListener('click', () => {
                const text = item.parentNode.parentNode;
                text.childNodes[0].style.display = "flex";
                text.childNodes[1].style.display = "none";
                // set value
            })
        }
        const saves = document.getElementsByClassName('fa-save');
        for (const item of saves) {
            item.addEventListener('click', () => {
                const text = item.parentNode.parentNode;
                text.childNodes[1].style.display = "flex";
                text.childNodes[0].style.display = "none";
            })
        }
        const close = document.getElementsByClassName('fa-window-close');
        for (const item of close) {
            item.addEventListener('click', () => {
                const text = item.parentNode.parentNode;
                text.childNodes[1].style.display = "flex";
                text.childNodes[0].style.display = "none";
            })
        }
    }, [])
    return (
        <div>
            <ToolbarGen title="profile" />
            <div className='profile-container'>
                <div className='info-section'>

                    <div className='main-info'>
                        <div className='desig'>Professor</div>
                        <div className='name'>Khalid Afzal</div>
                        <div className='email'>kafzal@gmail.com</div>
                    </div>
                    <div >
                        <ul className='basic-info'>
                            <li className='b-item'>
                                <i className="fas icon fa-school"></i>
                                <span className='b-topic'>Faculty</span>
                                <div className='b-text'>
                                    {/*  */}
                                    <div className='b-input'>
                                        <input className='b-in' />
                                        <i className="far icon fa-save"></i>
                                        <i className="fas icon   fa-window-close"></i>
                                    </div>
                                    <div className='b-value'>
                                        <div className='b-inner-text'>BBA</div>
                                        <div className='edit'> <i className="fas icon fa-pencil-alt"></i>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className='b-item'>
                                <i className="fas icon fa-graduation-cap"></i>
                                <span className='b-topic'>Department</span>
                                <div className='b-text'>
                                    <div className='b-input'>
                                        <input className='b-in' />
                                        <i className="far icon fa-save"></i>
                                        <i className="fas icon   fa-window-close"></i>
                                    </div>
                                    <div className='b-value'>
                                        <div className='b-inner-text'>Management</div>
                                        <div className='edit'> <i className="fas icon fa-pencil-alt"></i>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className='b-item'>
                                <i className="fas icon fa-tint"></i>
                                <span className='b-topic'>Blood Group
                                </span>
                                <div className='b-text'>
                                    <div className='b-input'>
                                        <input className='b-in' />
                                        <i className="far icon fa-save"></i>
                                        <i className="fas icon   fa-window-close"></i>
                                    </div>
                                    <div className='b-value'>
                                        <div className='b-inner-text'>O+</div>
                                        <div className='edit'> <i className="fas icon fa-pencil-alt"></i>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className='b-item'>
                                <i className="fas icon fa-phone"></i>
                                <span className='b-topic'>Phone
                                </span>
                                <div className='b-text'>
                                    <div className='b-input'>
                                        <input className='b-in' />
                                        <i className="far icon fa-save"></i>
                                        <i className="fas icon   fa-window-close"></i>
                                    </div>
                                    <div className='b-value'>
                                        <div className='b-inner-text'>+8801974372365</div>
                                        <div className='edit'> <i className="fas icon fa-pencil-alt"></i>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='image-section'>
                    <img src={person} alt={"user"} className="img-thumbnail" />
                    <button className='btn btn-outline-dark'>Change Profile</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;