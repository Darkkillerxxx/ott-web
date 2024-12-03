import React, { useState } from 'react';
import { Paper, Grid, TextField, Button, Typography, Select, MenuItem, Checkbox, ListItemText, InputLabel, FormControl } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ScreenHeader from '../components/ScreenHeader';

const ManageEpisodes = () => {
  const [episodes, setEpisodes] = useState([
    { id: 1, season: 'Season 1', show: 'A Man On the Inside', episodeName: 'Tinker Tailor Older Spy', description: 'Lorem ipsum odor amet, consectetuer adipiscing elit. Curae sollicitudin in platea, feugiat penatibus mus. Nibh natoque sed etiam sagittis habitasse a lobortis suspendisse! Adipiscing vivamus natoque phasellus in ac taciti convallis non etiam', image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSJqeu-_8A0j9RDA6df4AjhPQ5mgHq4qxvVSMB8Nd_byqe4ByuLSqbAAceMgqafFWZwNwJE', uploadDate: '2024-11-16', rating: 4.5 },
    { id: 2, season: 'Season 1', show: 'A Man On the Inside', episodeName: 'The Man Who Knew Too Much About Bridges', description: 'Lorem ipsum odor amet, consectetuer adipiscing elit. Curae sollicitudin in platea, feugiat penatibus mus. Nibh natoque sed etiam sagittis habitasse a lobortis suspendisse! Adipiscing vivamus natoque phasellus in ac taciti convallis non etiam', image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj9xiWemCp16FHCl4qX4edA7QAJJZCgpF5Vl-MSWhU2UNtadEf1DQuYXUOABuremIPLgXQEGvTM5j7cvWXY_Mx_X3bNdyFcncJfO2ukNp6fL6CUV5e8Hyog6cGll-4r64J6LOfthLQgQ5ar/s400/cap217.bmp', uploadDate: '2024-11-15', rating: 4.0 },
    { id: 3, season: 'Season 2', show: 'Navarasam', episodeName: 'Edhiri karuna', description: 'Lorem ipsum odor amet, consectetuer adipiscing elit. Curae sollicitudin in platea, feugiat penatibus mus. Nibh natoque sed etiam sagittis habitasse a lobortis suspendisse! Adipiscing vivamus natoque phasellus in ac taciti convallis non etiam', image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRVCtf9DbnM8VAsGckOqGGkX7RwVm2YzULrBgyHl_vOWxkc82wg', uploadDate: '2024-11-14', rating: 4.2 },
    { id: 4, season: 'Season 2', show: 'Navarasam', episodeName: 'Summer of 92', description: 'Lorem ipsum odor amet, consectetuer adipiscing elit. Curae sollicitudin in platea, feugiat penatibus mus. Nibh natoque sed etiam sagittis habitasse a lobortis suspendisse! Adipiscing vivamus natoque phasellus in ac taciti convallis non etiam', image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRLVBbtgf3Sa_XG87S1GPkw6uA8beTK7oNDbJfI5LDuI_5xVQ9W', uploadDate: '2024-11-13', rating: 3.9 },
    { id: 5, season: 'Season 1', show: 'A Man On the Inside', episodeName: 'The Emily Always Rings Twice', description: 'Lorem ipsum odor amet, consectetuer adipiscing elit. Curae sollicitudin in platea, feugiat penatibus mus. Nibh natoque sed etiam sagittis habitasse a lobortis suspendisse! Adipiscing vivamus natoque phasellus in ac taciti convallis non etiam', image: 'https://m.media-amazon.com/images/S/pv-target-images/473984c10e47fbed89b029120ff1f4dd3d2a7d4280eb8cf4555a7f92de3ee9f8._SX1080_FMjpg_.jpg', uploadDate: '2024-11-12', rating: 4.3 },
    { id: 6, season: 'Season 3', show: 'Kaala Paani', episodeName: 'Nature Wins', description: 'Lorem ipsum odor amet, consectetuer adipiscing elit. Curae sollicitudin in platea, feugiat penatibus mus. Nibh natoque sed etiam sagittis habitasse a lobortis suspendisse! Adipiscing vivamus natoque phasellus in ac taciti convallis non etiam', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjc_Wqkn0ISoOmHTQS8gMRH02ifrvrfR-G4A&s', uploadDate: '2024-11-10', rating: 4.1 },
    { id: 7, season: 'Season 3', show: 'Kaala Paani', episodeName: 'The Switch', description: 'Lorem ipsum odor amet, consectetuer adipiscing elit. Curae sollicitudin in platea, feugiat penatibus mus. Nibh natoque sed etiam sagittis habitasse a lobortis suspendisse! Adipiscing vivamus natoque phasellus in ac taciti convallis non etiam', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzTigfRMVLbUbifZUB_i8W7Syucldn8RtAPw&s', uploadDate: '2024-11-09', rating: 4.4 },
    { id: 8, season: 'Season 1', show: 'A Man On the Inside', episodeName: 'The Curious Incident of the Dog in the Painting Class.', description: 'Lorem ipsum odor amet, consectetuer adipiscing elit. Curae sollicitudin in platea, feugiat penatibus mus. Nibh natoque sed etiam sagittis habitasse a lobortis suspendisse! Adipiscing vivamus natoque phasellus in ac taciti convallis non etiam', image: 'https://enimgs.eyesonshow.com/eyesonshow/50/247739-20241121181001673f06f9ba5f8.jpg', uploadDate: '2024-11-08', rating: 3.8 },
    { id: 9, season: 'Season 4', show: 'Queen of Tears', episodeName: 'E-1', description: 'Lorem ipsum odor amet, consectetuer adipiscing elit. Curae sollicitudin in platea, feugiat penatibus mus. Nibh natoque sed etiam sagittis habitasse a lobortis suspendisse! Adipiscing vivamus natoque phasellus in ac taciti convallis non etiam', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS433e9MrbYQxjK9YgSElDnrcgyO4pHDzoRNg&s', uploadDate: '2024-11-07', rating: 4.6 },
    { id: 10, season: 'Season 4', show: 'Queen of Tears', episodeName: 'E-2', description: 'Lorem ipsum odor amet, consectetuer adipiscing elit. Curae sollicitudin in platea, feugiat penatibus mus. Nibh natoque sed etiam sagittis habitasse a lobortis suspendisse! Adipiscing vivamus natoque phasellus in ac taciti convallis non etiam', image: 'https://economictimes.indiatimes.com/thumb/msid-108406888,width-1600,height-900,resizemode-4,imgsize-32282/queen-of-tears-see-what-we-know-about-release-schedule-plot-cast-crew-episode-count-and-more.jpg?from=mdr', uploadDate: '2024-11-06', rating: 4.0 },
  ]);

  const [filters, setFilters] = useState({
    search: '',
    showName: [],
    rating: [],
  });

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

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const totalStars = 5;

    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {[...Array(fullStars)].map((_, i) => (
          <StarIcon key={`full-${i}`} style={{ color: 'gold' }} />
        ))}
        {halfStar && <StarIcon style={{ color: 'gold' }} />}
        {[...Array(totalStars - fullStars - (halfStar ? 1 : 0))].map((_, i) => (
          <StarBorderIcon key={`empty-${i}`} style={{ color: 'gold' }} />
        ))}
      </div>
    );
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'season', headerName: 'Season', width: 150 },
    { field: 'show', headerName: 'Show', width: 150 },
    { field: 'episodeName', headerName: 'Episode Name', width: 180 },
    { field: 'description', headerName: 'Description', width: 250 },
    { field: 'image', headerName: 'Image', width: 100, renderCell: (params) => <img src={params.value} alt="episode" style={{ width: '50px', height: '50px' }} /> },
    { field: 'uploadDate', headerName: 'Upload Date', width: 150 },
    { field: 'views', headerName: 'Views', width: 120 },
    {
      field: 'rating',
      headerName: 'Rating',
      width: 180,
      renderCell: (params) => renderStars(params.value),
    },
  ];

  return (
    <div>
      <ScreenHeader label="Manage Episodes" />

      <Grid container spacing={2}>
        <Grid item xs={2}>
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
              >
                {['A Man On the Inside', 'Navarasam', 'Kaala Paani', 'Queen of Tears'].map((show) => (
                  <MenuItem key={show} value={show}>
                    <Checkbox checked={filters.showName.indexOf(show) > -1} />
                    <ListItemText primary={show} />
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
