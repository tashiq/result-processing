import firebaseConfig from './Firebase.config';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage'
const app = initializeApp(firebaseConfig);
const storage = getStorage(app)
export default storage;