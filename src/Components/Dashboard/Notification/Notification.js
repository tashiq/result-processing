import React from 'react';
import ToolbarGen from '../../Toolbar/Toolbar';
import './Notification.css'
const Notification = () => {

    return (
        <div>
            <ToolbarGen title="notification" />
            <div id="notification">
                {/* notification item */}
                <div className='single-notification'>
                    <label for="checkbox">
                        <div className='notification-item'>
                            <div className='not-icon'><i className="fas fa-bell"></i></div>
                            <div className='not-text'>Please, submit your mark as early as possible.</div>
                        </div>

                    </label>
                    <div>
                        <input type="checkbox" id='checkbox' className='not-check' name="notification-item" />
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Notification;