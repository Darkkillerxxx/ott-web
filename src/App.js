import logo from './logo.svg';
import { CSpinner, useColorModes } from '@coreui/react'
import Menu from './components/Menu';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
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

function App() {
  return (
    <Router>
        <div className='row'>
          <div className='col-2'>
            <Menu />
          </div>
          <div className='col-10' style={{backgroundColor:'#fcfcfc'}}>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/addEpisodes" element={<AddEpisodes />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/addShows" element={<AddShows/>} />
              <Route path="/addSeasons" element={<CreateSeasonsForm/>} />
              <Route path="/manageMovies" element={<ManageMovies/>} />
              <Route path="/manageEpisodes" element={<ManageEpisodes/>} />
              <Route path="/manageLiveShows" element={<ManageLiveShows />} />
              <Route path="/manageShows" element={<ManageShows />} />
            </Routes>
          </div>
        </div>
    </Router>
  );
}

export default App;
