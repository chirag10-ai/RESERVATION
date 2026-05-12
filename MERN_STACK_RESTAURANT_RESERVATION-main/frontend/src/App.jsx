import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './Pages/Home/Home';
import NotFound from './Pages/NotFound/NotFound';
import Success from './Pages/Success/Success';
import Admin from './Pages/Admin/Admin';
import Auth from './Pages/Auth/Auth';
import AboutPage from './Pages/About/About';
import ServicesPage from './Pages/Services/Services';
import TeamPage from './Pages/Team/Team';
import ReservationPage from './Pages/Reservation/Reservation';
import MenuPage from './Pages/Menu/Menu';

import './App.css'
import AdminLogin from './components/AdminLogin';
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/success' element={<Success/>}/>
          <Route path='/about' element={<AboutPage/>}/>
          <Route path='/services' element={<ServicesPage/>}/>
          <Route path='/team' element={<TeamPage/>}/>
          <Route path='/reservation' element={<ReservationPage/>}/>
          <Route path='/menu' element={<MenuPage/>}/>
          <Route path='/admin' element={<Admin/>}/>
          <Route path='/auth' element={<Auth/>}/>
          <Route path='/login' element={<Auth/>}/>
          <Route path='/register' element={<Auth/>}/>
          <Route path='/loginadmin' element={<AdminLogin/>}/>
          <Route path='*' element={<NotFound/>}/>

        </Routes>
        <Toaster/>
      </Router>
    </>
  )
}

export default App
