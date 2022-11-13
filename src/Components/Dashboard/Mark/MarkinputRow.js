import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';
import Profile from './Components/Dashboard/Profile/Profile'
import Home from './Components/Dashboard/Home/Home';
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='home' element={<Home />} />
                <Route path='profile' element={<Profile />} />
            </Routes>
        </BrowserRouter>
    );
}
export default App;
