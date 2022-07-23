import './App.css';
import Dashboard from './Components/Dashboard/Dashboard/Dashboard';
import Login from './Components/Login/Login';
import Profile from './Components/Dashboard/Profile/Profile'
import Notification from './Components/Dashboard/Notification/Notification'
import History from './Components/Dashboard/History/History'
import Mark from './Components/Dashboard/Mark/Mark'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/Dashboard/Home/Home';
import AuthProvider from './Context/AuthProvider';
import AdminRoute from './AdminRoute/AdminRoute';
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AdminRoute />}>
            <Route path='/' element={<Dashboard />}>
              <Route path='home' element={<Home />} />
              <Route path='profile' element={<Profile />} />
              <Route path='notification' element={<Notification />} />
              <Route path='mark' element={<Mark />} />
              <Route path='history' element={<History />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
