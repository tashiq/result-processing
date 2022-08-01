import React, { useEffect, useState } from 'react';
import ToolbarGen from '../../Toolbar/Toolbar';
import './Notification.css'
import axios from 'axios'
import useAuth from '../../../Hooks/useAuth';
const Notification = () => {
    const [notifications, setNotifications] = useState([])
    const { user } = useAuth();
    const [selectedList, setSelectedList] = useState([]);
    const [updated, setUpdated] = useState(false);
    useEffect(() => {
        axios.get(`https://frozen-journey-42014.herokuapp.com/notifications?email=${user.email}`).then(res => setNotifications(res.data))
    }, [updated])
    const handleNotificationClick = (_id, index) => {
        // remove if listed. add if not listed
        let remove = false;
        selectedList.forEach(item => {
            if (item._id === _id) {
                remove = true
            }
        })
        const newList = selectedList.filter(item => item._id !== _id)
        if (remove) {
            setSelectedList([...newList]);
        }
        else {
            setSelectedList([...newList, { _id, index }]);
        }
    }
    const handleReadNotifications = e => {
        if (selectedList.length) {
            axios.put(`https://frozen-journey-42014.herokuapp.com/notifications?email=${user.email}&read=true`, selectedList).then(res => {
                setUpdated(!updated)
            })
            for (const item of selectedList) {
                document.getElementById(item.index + '').checked = false;
            }
            setSelectedList([]);
        }
    }
    return (
        <div>
            <ToolbarGen title="notification" />
            <div id="notification">
                <div id="mark-as-read" style={{
                    color: selectedList.length > 0 ? "blue" : "rgba(141, 141, 227, 0.4)"
                }} onClick={handleReadNotifications}>Mark as read</div>
                {/* notification item */}
                {
                    notifications.map((notification, index) =>
                        <div className='single-notification' style={{
                            backgroundColor: notification.read ? "transparent" : "white"
                        }}>
                            <label for={index + ''}>
                                <div className='notification-item'>
                                    <div className='not-icon'><i className="fas fa-bell"></i></div>
                                    <div className='not-text'>{notification.message}</div>
                                </div>

                            </label>
                            <div>
                                <input type="checkbox" id={index + ''} className='not-check' name="notification-item" onClick={() => handleNotificationClick(notification._id, index)} />
                            </div>
                        </div>
                    )
                }

            </div>
        </div >
    );
};

export default Notification;