import './App.css';
import Dashboard from './Components/Dashboard/Dashboard/Dashboard';
import Login from './Components/Login/Login';
import Profile from './Components/Dashboard/Profile/Profile'
import Notification from './Components/Dashboard/Notification/Notification'
import History from './Components/Dashboard/History/History'
import Mark from './Components/Dashboard/Mark/Mark'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/Dashboard/Home/Home';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />}>
            <Route path='home' element={<Home />} />
            <Route path='profile' element={<Profile />} />
            <Route path='notification' element={<Notification />} />
            <Route path='mark' element={<Mark />} />
            <Route path='history' element={<History />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
