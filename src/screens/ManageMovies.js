import React, { useEffect, useState } from 'react';
import {
  Grid,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Paper,
} from '@mui/material';
import ScreenHeader from '../components/ScreenHeader';

const ManageMovies = () => {
  const [episodes, setEpisodes] = useState([
    { id: 1, title: 'A Man On the Inside', genre: 'Action', language: 'English', image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSJqeu-_8A0j9RDA6df4AjhPQ5mgHq4qxvVSMB8Nd_byqe4ByuLSqbAAceMgqafFWZwNwJE' },
    { id: 2, title: 'Navarasam', genre: 'Drama', language: 'Hindi', image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRVCtf9DbnM8VAsGckOqGGkX7RwVm2YzULrBgyHl_vOWxkc82wg' },
    { id: 3, title: 'Kaala Paani', genre: 'Horror', language: 'Tamil', image: 'https://via.placeholder.com/200' },
    { id: 4, title: 'Queen of Tears', genre: 'Comedy', language: 'Hindi(Dub)', image: 'https://via.placeholder.com/200' },
  ]);

  const [filters, setFilters] = useState({
    search: '',
    genre: '',
    language: '',
  });

  const handleSearchChange = (e) => {
    setFilters({ ...filters, search: e.target.value });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    let filteredEpisodes = episodes.filter((episode) => {
      let matches = true;
      if (filters.search && !episode.title.toLowerCase().includes(filters.search.toLowerCase())) {
        matches = false;
      }
      if (filters.genre && filters.genre !== episode.genre) {
        matches = false;
      }
      if (filters.language && filters.language !== episode.language) {
        matches = false;
      }
      return matches;
    });
    setEpisodes(filteredEpisodes);
  };

  return (
    <div>
      {/* Header Section */}
      <Grid container alignItems="center" justifyContent="space-between" style={{ marginBottom: '20px' }}>
        <ScreenHeader label="Manage Movies" />
      </Grid>

      <Grid container spacing={3}>
        {/* Filters Section */}
        <Grid item xs={2}>
          <Paper elevation={0} style={{ padding: '20px', height: 'auto' }}>
            <Typography variant="h6" gutterBottom>
              Filters
            </Typography>

            {/* Search Movies */}
            <FormControl fullWidth margin="normal">
              <TextField
                label="Search Movies"
                variant="outlined"
                name="search"
                value={filters.search}
                onChange={handleSearchChange}
              />
            </FormControl>

            {/* Movie Genre */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Movie Genre</InputLabel>
              <Select
                name="genre"
                value={filters.genre}
                onChange={handleFilterChange}
              >
                {['Horror', 'Action', 'Drama', 'Comedy'].map((genre) => (
                  <MenuItem key={genre} value={genre}>
                    {genre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Movie Language */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Movie Language</InputLabel>
              <Select
                name="language"
                value={filters.language}
                onChange={handleFilterChange}
              >
                {['Hindi', 'Hindi(Dub)', 'English', 'Tamil'].map((language) => (
                  <MenuItem key={language} value={language}>
                    {language}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Apply Filters Button */}
            <Button
              variant="contained"
              style={{ marginTop: '20px', backgroundColor: 'black', color: 'white' }}
              onClick={applyFilters}
              fullWidth
            >
              Apply Filters
            </Button>
          </Paper>
        </Grid>

        {/* Movies Section */}
        <Grid item xs={9}>
          <Grid container spacing={2}>
            {episodes.map((episode) => (
              <Grid item xs={3} key={episode.id}>
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    paddingBottom: '150%',
                    overflow: 'hidden',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                  }}
                >
                  <img
                    src={episode.image}
                    alt={episode.title}
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'brightness(50%)',
                    }}
                  />
                  <Typography
                    variant="h6"
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      color: 'white',
                      textAlign: 'center',
                      fontWeight: 'bold',
                    }}
                  >
                    {episode.title}
                  </Typography>
                </div>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ManageMovies;
