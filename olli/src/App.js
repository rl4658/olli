import React, { useState } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'react-image-gallery/styles/css/image-gallery.css';
import './CSS/ImageSlider/ImageSlider.css'
import HomePage from './components/Pages/HomePage.js';
import Login from './components/Login/login.js';
import ParentPage from './components/Pages/ParentPage.js';
import Tetris from './components/Games/Tetris.js';
import AdminPage from './components/Pages/AdminPage.js';
import ParentUserSettingPage from './components/Pages/ParentUserSettingPage.js';
import AdminUserSettingPage from './components/Pages/AdminUserSettingPage.js';
import Calendar from './components/AdminComponents/Calendar.js';
import SNPage from './components/Pages/SNPage.js';
import ParentCalendar from './components/ParentComponents/ParentCalendar.js';
import ParentEvents from './components/ParentComponents/ParentEvents.js';
import ChatRoom from './components/Pages/ChatRoom.js';
import StaffPage from './components/Pages/StaffPage.js';


export default function App() {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  console.log(events)

  return (
    <Router>
      <Routes>
        <Route
          exact path='/'
          element={
            <HomePage user={user} />
          } />
        <Route
          exact path='/login'
          element={
            <div className='loginSection'>
              <Login setUser={setUser} />
            </div>} />
        <Route
          exact path='/parentPage'
          element={
            <ParentPage user={user} setUser={setUser} />
          } />

        <Route
          exact path='/adminPage'
          element={
            <AdminPage user={user} setUser={setUser} />
          } />

        <Route
          exact path='/parentuserSettings'
          element={
            <ParentUserSettingPage />
          } />

        <Route
          exact path='/adminuserSettings'
          element={
            <AdminUserSettingPage />
          } />

        <Route
          exact path='/calender'
          element={
            <Calendar user={user} setUser={setUser} createEvents={setEvents} />
          } />
        <Route
          exact path='/parentCalender'
          element={
            <ParentCalendar user={user} setUser={setUser} />
          } />
        <Route
          exact path='/parentEvents'
          element={
            <ParentEvents user={user} setUser={setUser} events={events} />
          } />

        <Route
          exact path='/tetris'
          element={
            <Tetris />
          } />

        <Route
          exact path='/snPage'
          element={
            <SNPage user={user} setUser={setUser} />
          } />

        <Route
          exact path='/chat'
          element={
            <ChatRoom />
          } />
        <Route
          exact path='/staff'
          element={
            <StaffPage />
          } />
      </Routes>
    </Router>
  )
}