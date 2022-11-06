import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';
import Dashboard from './Components/Dashboard/Dashboard/Dashboard';
import Profile from './Components/Dashboard/Profile/Profile'
import Notification from './Components/Dashboard/Notification/Notification'
import History from './Components/Dashboard/History/History'
import Home from './Components/Dashboard/Home/Home';
import AuthProvider from './Context/AuthProvider';
import AdminRoute from './AdminRoute/AdminRoute';
import Forgot from './Components/Forgot/Forgot';
import AddExaminer from './Components/Dashboard/AddExaminer/AddExaminer';
import Notify from './Components/Dashboard/Notify/Notify';
import PageNotFound from './Components/PageNotFound/PageNotFound';
import CreateUser from './Components/CreateUser/CreateUser';
import Encode from './Components/Dashboard/Encode/Encode';
import MarkInput from './Components/Dashboard/Mark/MarkInput';
import Result from './Components/Dashboard/Result/Result';
import Details from './Components/Details/Details';
import Chairman from './Components/Chairman/Chairman';
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AdminRoute />}>
            <Route path='/' element={<Dashboard />}>
              {/* two type of user here */}
              <Route path='home' element={<Home />} />
              <Route path='profile' element={<Profile />} />
              <Route path='notification' element={<Notification />} />
              <Route path='mark' element={<MarkInput />} />
              <Route path='history' element={<History />} />
              <Route path='addmember' element={<AddExaminer />} />
              <Route path="notify" element={<Notify />} />
              <Route path="decode" element={<Encode />} />
              <Route path="result" element={<Result />} />
              <Route path="details" element={<Details />} />
              <Route path="chairman" element={<Chairman />} />
            </Route>
          </Route>
          <Route path='/forgot-pass' element={<Forgot />} />
          <Route path='/signup' element={<CreateUser />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
