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

const ManageLiveShows = () => {
  // Sample Data
  const [liveShows, setLiveShows] = useState([
    {
      id: 1,
      image: "https://via.placeholder.com/50",
      name: "Live Show 1",
      description: "Description of Live Show 1",
      url: "https://example.com/live-show-1",
      dateAdded: "2024-11-15",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/50",
      name: "Live Show 2",
      description: "Description of Live Show 2",
      url: "https://example.com/live-show-2",
      dateAdded: "2024-11-14",
    },
    {
      id: 3,
      image: "https://via.placeholder.com/50",
      name: "Live Show 3",
      description: "Description of Live Show 3",
      url: "https://example.com/live-show-3",
      dateAdded: "2024-11-13",
    },
    {
      id: 4,
      image: "https://via.placeholder.com/50",
      name: "Live Show 4",
      description: "Description of Live Show 4",
      url: "https://example.com/live-show-4",
      dateAdded: "2024-11-12",
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
    // Filter logic (if required to filter data)
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
    { field: "dateAdded", headerName: "Date Added", width: 150 },
  ];

  return (
    <div style={{ padding: "20px" }}>
        <ScreenHeader label="Manage Live Shows"/>

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
              {["Live Show 1", "Live Show 2", "Live Show 3", "Live Show 4"].map((show) => (
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
