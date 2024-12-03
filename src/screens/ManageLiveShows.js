import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  FormControl,
  InputLabel,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ScreenHeader from "../components/ScreenHeader";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const ManageLiveShows = () => {
  // Sample Data
  const [liveShows, setLiveShows] = useState([
    {
      id: 1,
      image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTnz9XO_DTyfa-ETnHLpMENST7czss5yYQjTDMf0WYim-Kb4Pzqx9Wh2hnS9UFyrq7F7szW",
      name: "Big Boss OTT",
      description: "Bigg Boss OTT is a digital spin-off of the popular Indian Hindi-language reality show Bigg Boss franchise",
      url: "https://example.com/live-show-1",
      views: 30000,
      rating: 4,
      dateAdded: "2024-11-15",
    },
    {
      id: 2,
      image: "https://sportshub.cbsistatic.com/i/r/2024/11/16/72d392b1-8917-4c9b-ab38-6ebd118bf686/thumbnail/770x433/2df94eb343bbd6e91d8c54f3bd2380f0/mike-tyson-jake-paul-action-2.jpg",
      name: "Jake Paul Vs Mike Tyson",
      description: "Jake Paul vs. Mike Tyson was a professional boxing match between YouTuber-turned-professional boxer Jake Paul and former undisputed heavyweight world champion Mike Tyson",
      url: "https://example.com/live-show-2",
      views: 20000,
      rating: 3,
      dateAdded: "2024-11-14",
    },
  ]);

  // Filters State
  const [filters, setFilters] = useState({
    search: "",
    showName: [],
  });

  const handleSearchChange = (e) => {
    setFilters({ ...filters, search: e.target.value });
  };

  const handleShowNameChange = (event) => {
    const value = event.target.value;
    setFilters({
      ...filters,
      showName: typeof value === "string" ? value.split(",") : value,
    });
  };

  const applyFilters = () => {
    let filteredShows = liveShows.filter((show) => {
      let matches = true;
      if (filters.search && !show.name.toLowerCase().includes(filters.search.toLowerCase())) {
        matches = false;
      }
      if (filters.showName.length > 0 && !filters.showName.includes(show.name)) {
        matches = false;
      }
      return matches;
    });
    setLiveShows(filteredShows);
  };

  // Helper function to render star ratings
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? <StarIcon key={i} color="primary" /> : <StarBorderIcon key={i} />);
    }
    return stars;
  };

  // Columns for the Data Grid
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "image",
      headerName: "Image",
      width: 100,
      renderCell: (params) => (
        <img src={params.value} alt="live show" style={{ width: "50px", height: "50px" }} />
      ),
    },
    { field: "name", headerName: "Name", width: 200 },
    { field: "description", headerName: "Description", width: 300 },
    {
      field: "url",
      headerName: "URL",
      width: 200,
      renderCell: (params) => (
        <a href={params.value} target="_blank" rel="noopener noreferrer">
          {params.value}
        </a>
      ),
    },
    { field: "views", headerName: "Views", width: 120 },
    {
      field: "rating",
      headerName: "Rating",
      width: 150,
      renderCell: (params) => <div style={{ display: "flex", gap: "2px" }}>{renderStars(params.value)}</div>,
    },
    { field: "dateAdded", headerName: "Date Added", width: 150 },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <ScreenHeader label="Manage Live Shows" />

      <Grid container spacing={2}>
        {/* Filters Section */}
        <Grid item xs={2}>
          <Typography variant="h6" gutterBottom>
            Filters
          </Typography>

          {/* Search Box */}
          <Typography variant="body2">Search</Typography>
          <TextField
            label="Search Shows"
            variant="outlined"
            fullWidth
            value={filters.search}
            onChange={handleSearchChange}
            style={{ marginBottom: "10px" }}
          />

          {/* Show Name Filter */}
          <Typography variant="body2" style={{ marginTop: "10px" }}>
            Show Name
          </Typography>
          <FormControl fullWidth>
            <InputLabel>Show Name</InputLabel>
            <Select
              multiple
              value={filters.showName}
              onChange={handleShowNameChange}
              renderValue={(selected) => selected.join(", ")}
            >
              {["Big Boss OTT", "Jake Paul Vs Mike Tyson"].map((show) => (
                <MenuItem key={show} value={show}>
                  <Checkbox checked={filters.showName.indexOf(show) > -1} />
                  <ListItemText primary={show} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            style={{
              backgroundColor: "black",
              color: "white",
              marginTop: "20px",
              width: "100%",
            }}
            onClick={applyFilters}
          >
            Apply Filters
          </Button>
        </Grid>

        {/* Table Section */}
        <Grid item xs={10}>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid rows={liveShows} columns={columns} pageSize={5} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ManageLiveShows;
