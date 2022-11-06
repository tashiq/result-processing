import './profile.css';
import { useEffect, useState } from 'react';
import ToolbarGen from '../../Toolbar/Toolbar';
import ProfilePic from './ProfilePic';
import InfoSection from './InfoSection';
import useAuth from '../../../Hooks/useAuth';
import axios from 'axios';
const Profile = () => {
    const { user, storage } = useAuth();
    const [info, setInfo] = useState({});
    useEffect(() => {
        axios.get(`http://localhost:4000/users/${user.email}`).then(res => {
            setInfo(res.data[0]);
        })
    }, [user])
    return (
        <div>
            <ToolbarGen title="profile" />
            <div className='profile-container'>
                <InfoSection info={info} />
                <ProfilePic user={info} storage={storage} />
            </div>
        </div>
    );
};

export default Profile;