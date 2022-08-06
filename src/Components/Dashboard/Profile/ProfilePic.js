import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage'
const ProfilePic = ({ user, storage }) => {
    // const date = new Date();
    const [image, setImage] = useState(null);
    const [dp, setDp] = useState({ photo: user.photo });
    const fileUpload = e => {
        if (image == null) {
            return;
        }
        const upRef = ref(storage, `images/${user.email}/profile`);
        uploadBytes(upRef, image).then(() => {
            listAll(ref(storage, `images/${user.email}`)).then(res => {
                getDownloadURL(res.items[0]).then(url => {
                    setDp({ photo: url });
                    user.photo = url;
                    axios.put(`http://localhost:4000/users/${user.email}`, { url: url })
                })
            })
        })
    }
    useEffect(() => {

    }, [dp])
    return (
        <div className='image-section'>
            <img src={user.photo} alt={"user"} className="img-thumbnail" />
            <div>
                <button className='btn btn-outline-dark p-0' style={{
                    position: 'relative',
                    height: '50px'
                }}>

                    <input type="file" className='p-2' style={{
                        opacity: 1,
                        zIndex: 100,
                        width: '100%',
                        height: '100%'
                    }} onChange={(e) => {
                        if (e.target.files[0].size > 1048576) alert('Image size must be less then 1MB');
                        else setImage(e.target.files[0])
                    }}
                        accept=".png, .jpg, .jpeg"
                    />
                </button>
                <button className='btn btn-success w-50'
                    style={{
                        position: 'relative',
                        marginTop: '12px'
                    }}
                    onClick={fileUpload}>Change Profile</button>
            </div>
        </div>
    );
};

export default ProfilePic;