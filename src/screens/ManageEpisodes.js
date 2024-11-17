import React, { useState } from 'react';
import { Paper, Grid, TextField, Button, Typography, Select, MenuItem, Checkbox, ListItemText, InputLabel, FormControl, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { ArrowDropDown } from '@mui/icons-material';
import ScreenHeader from '../components/ScreenHeader';

const ManageEpisodes = () => {
  const [episodes, setEpisodes] = useState([
    { id: 1, season: 'Season 1', show: 'Show 1', episodeName: 'Episode 1', description: 'Description of Episode 1', image: 'https://via.placeholder.com/50', uploadDate: '2024-11-16', rating: 4.5 },
    { id: 2, season: 'Season 1', show: 'Show 1', episodeName: 'Episode 2', description: 'Description of Episode 2', image: 'https://via.placeholder.com/50', uploadDate: '2024-11-15', rating: 4.0 },
    { id: 3, season: 'Season 2', show: 'Show 2', episodeName: 'Episode 3', description: 'Description of Episode 3', image: 'https://via.placeholder.com/50', uploadDate: '2024-11-14', rating: 4.2 },
    { id: 4, season: 'Season 2', show: 'Show 2', episodeName: 'Episode 4', description: 'Description of Episode 4', image: 'https://via.placeholder.com/50', uploadDate: '2024-11-13', rating: 3.9 },
    { id: 5, season: 'Season 1', show: 'Show 1', episodeName: 'Episode 5', description: 'Description of Episode 5', image: 'https://via.placeholder.com/50', uploadDate: '2024-11-12', rating: 4.3 },
    { id: 6, season: 'Season 3', show: 'Show 3', episodeName: 'Episode 6', description: 'Description of Episode 6', image: 'https://via.placeholder.com/50', uploadDate: '2024-11-10', rating: 4.1 },
    { id: 7, season: 'Season 3', show: 'Show 3', episodeName: 'Episode 7', description: 'Description of Episode 7', image: 'https://via.placeholder.com/50', uploadDate: '2024-11-09', rating: 4.4 },
    { id: 8, season: 'Season 1', show: 'Show 1', episodeName: 'Episode 8', description: 'Description of Episode 8', image: 'https://via.placeholder.com/50', uploadDate: '2024-11-08', rating: 3.8 },
    { id: 9, season: 'Season 4', show: 'Show 4', episodeName: 'Episode 9', description: 'Description of Episode 9', image: 'https://via.placeholder.com/50', uploadDate: '2024-11-07', rating: 4.6 },
    { id: 10, season: 'Season 4', show: 'Show 4', episodeName: 'Episode 10', description: 'Description of Episode 10', image: 'https://via.placeholder.com/50', uploadDate: '2024-11-06', rating: 4.0 },
  ]);

  const [filters, setFilters] = useState({
    search: '',
    showName: [],
    rating: [],
  });

  const [showNameOpen, setShowNameOpen] = useState(false);
  const [ratingOpen, setRatingOpen] = useState(false);

  const handleSearchChange = (e) => {
    setFilters({ ...filters, search: e.target.value });
  };

  const handleShowNameChange = (event) => {
    const value = event.target.value;
    setFilters({ ...filters, showName: typeof value === 'string' ? value.split(',') : value });
  };

  const handleRatingChange = (event) => {
    const value = event.target.value;
    setFilters({ ...filters, rating: typeof value === 'string' ? value.split(',') : value });
  };

  const toggleShowNameDropdown = () => {
    setShowNameOpen(!showNameOpen);
  };

  const toggleRatingDropdown = () => {
    setRatingOpen(!ratingOpen);
  };

  const applyFilters = () => {
    let filteredEpisodes = episodes.filter((episode) => {
      let matches = true;
      if (filters.search && !episode.episodeName.toLowerCase().includes(filters.search.toLowerCase())) {
        matches = false;
      }
      if (filters.showName.length > 0 && !filters.showName.includes(episode.show)) {
        matches = false;
      }
      if (filters.rating.length > 0 && !filters.rating.includes(episode.rating.toString())) {
        matches = false;
      }
      return matches;
    });
    setEpisodes(filteredEpisodes);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'season', headerName: 'Season', width: 150 },
    { field: 'show', headerName: 'Show', width: 150 },
    { field: 'episodeName', headerName: 'Episode Name', width: 180 },
    { field: 'description', headerName: 'Description', width: 250 },
    { field: 'image', headerName: 'Image', width: 100, renderCell: (params) => <img src={params.value} alt="episode" style={{ width: '50px', height: '50px' }} /> },
    { field: 'uploadDate', headerName: 'Upload Date', width: 150 },
    { field: 'rating', headerName: 'Rating', width: 120 },
  ];

  return (
    <div>
      <ScreenHeader label="Manage Episodes" />

      <Grid container spacing={2}>
        <Grid item xs={2}>
          {/* Filters Section */}
          <Paper elevation={0} style={{ padding: '20px', height: 'auto' }}>
            <Typography variant="h6" gutterBottom>Filters</Typography>

            <Typography variant="body2">Search Box</Typography>
            <TextField
              label="Search Episode"
              variant="outlined"
              fullWidth
              value={filters.search}
              onChange={handleSearchChange}
            />

            <Typography variant="body2" style={{ marginTop: '10px' }}>Show Name</Typography>
            <FormControl fullWidth>
              <InputLabel>Show Name</InputLabel>
              <Select
                multiple
                value={filters.showName}
                onChange={handleShowNameChange}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 200,
                    },
                  },
                }}
              >
                {['Show 1', 'Show 2', 'Show 3', 'Show 4'].map((show) => (
                  <MenuItem key={show} value={show}>
                    <Checkbox checked={filters.showName.indexOf(show) > -1} />
                    <ListItemText primary={show} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Typography variant="body2" style={{ marginTop: '10px' }}>Rating</Typography>
            <FormControl fullWidth>
              <InputLabel>Rating</InputLabel>
              <Select
                multiple
                value={filters.rating}
                onChange={handleRatingChange}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 200,
                    },
                  },
                }}
              >
                {[4.5, 4.0, 3.9, 4.2, 4.3, 4.1, 4.4, 3.8, 4.6].map((rating) => (
                  <MenuItem key={rating} value={rating.toString()}>
                    <Checkbox checked={filters.rating.indexOf(rating.toString()) > -1} />
                    <ListItemText primary={rating} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="contained"
              style={{ backgroundColor: 'black', color: 'white', marginTop: '20px' }}
              onClick={applyFilters}
              fullWidth
            >
              Apply Filters
            </Button>
          </Paper>
        </Grid>

        {/* Data Table Section */}
        <Grid item xs={10}>
          <div style={{ width: '100%' }}>
            <DataGrid rows={episodes} columns={columns} pageSize={5} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ManageEpisodes;
