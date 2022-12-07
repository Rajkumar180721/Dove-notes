
import { Routes, Route, Navigate } from 'react-router-dom';
import Welcome from 'Screens/Welcome';
import Login from 'Screens/Login';
import { Register, Verified } from 'Screens/Register';
import Home from 'Screens/Home';

const Main = () => {
return (         
    <Routes>
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='/welcome' element={<Welcome />} /> 
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/verified' element={<Verified />} />
        <Route path='/home' element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
    </Routes>
);
}
export default Main;