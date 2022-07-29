import firebaseConfig from './Firebase.config';
import { initializeApp } from 'firebase/app';
const initAuthentication = () => {
    initializeApp(firebaseConfig);
}

export default initAuthentication;