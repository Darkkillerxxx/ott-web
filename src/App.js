import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Menu from './components/Menu';
import Dashboard from './screens/Dashboard';
import AddEpisodes from './screens/AddContents';
import Profile from './screens/Profile';
import Login from './screens/Login';
import './App.css';
import AddShows from './screens/AddShows';
import CreateSeasonsForm from './screens/AddSeasons';
import ManageMovies from './screens/ManageMovies';
import ManageEpisodes from './screens/ManageEpisodes';
import ManageLiveShows from './screens/ManageLiveShows';
import ManageShows from './screens/ManageShows';
import AddMovie from './screens/AddMovies';
import SeriesDetails from './screens/SeriesDetails';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem('auth');
    setIsLoggedIn(!!token); // If token exists, set isLoggedIn to true
  }, []);

  const handleLogin = () => {
    // Simulate login
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Logout user
    localStorage.removeItem('auth');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      {isLoggedIn ? (
        <div className='row'>
          <div className='col-2'>
            <Menu />
          </div>
          <div className='col-10' style={{ backgroundColor: '#fcfcfc' }}>
            <Routes>
                 {/* Redirect unknown paths to Dashboard */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/addEpisodes" element={<AddEpisodes />} />
              <Route path="/profile" element={<Profile handleLogout={handleLogout} />} />
              <Route path="/addShows" element={<AddShows />} />
              <Route path='/addMovie' element={<AddMovie />} />
              <Route path="/addSeasons" element={<CreateSeasonsForm />} />
              <Route path="/manageMovies" element={<ManageMovies />} />
              <Route path="/manageEpisodes" element={<ManageEpisodes />} />
              <Route path="/manageLiveShows" element={<ManageLiveShows />} />
              <Route path="/manageShows" element={<ManageShows />} />
              <Route path="/seriesDetails/:id" element={<SeriesDetails />} />           
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          {/* Redirect unknown paths to Login */}
        </Routes>
      )}
    </Router>
  );
};

export default App;
