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
  Menu,
  IconButton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import StarIcon from "@mui/icons-material/Star";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ScreenHeader from "../components/ScreenHeader";

const ManageShows = () => {
  const [shows, setShows] = useState([
    {
      id: 1,
      image: "https://www.rollingstone.com/wp-content/uploads/2024/11/AMOTI_102_Unit_00465R.jpg?w=1581&h=1054&crop=1",
      name: "A Man on the Inside",
      description: "A retired professor gets a new lease on life when a private investigator hires him to go undercover inside a San Francisco retirement home",
      rating: 3,
      views: 1200,
      dateAdded: "2024-11-15",
    },
    {
      id: 2,
      image: "https://upload.wikimedia.org/wikipedia/en/2/2f/Kaala_Paani_poster.png",
      name: "Dark Waters",
      description: "Individuals with intertwined destinies find themselves in a fight for their lives as they battle nature's wrath",
      rating: 4,
      views: 540,
      dateAdded: "2024-11-14",
    },
    {
      id: 3,
      image: "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p26780072_b_v8_af.jpg",
      name: "Queen Of Tears",
      description: "The queen of department stores and the prince of supermarkets weather a marital crisis, until love miraculously begins to bloom again",
      rating: 2,
      views: 220,
      dateAdded: "2024-11-13",
    },
    {
      id: 4,
      image: "https://upload.wikimedia.org/wikipedia/en/e/ed/Navarasa_web_series.jpg",
      name: "Navarasa",
      rating: 5,
      views: 3000,
      description: "The nine human emotions of the Indian aesthetic theory are explored in this anthology series",
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
    let filteredShows = shows.filter((show) => {
      let matches = true;
      if (filters.search && !show.name.toLowerCase().includes(filters.search.toLowerCase())) {
        matches = false;
      }
      if (filters.showName.length > 0 && !filters.showName.includes(show.name)) {
        matches = false;
      }
      return matches;
    });
    setShows(filteredShows);
  };

  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);

  const handleMenuOpen = (event, id) => {
    setMenuAnchor(event.currentTarget);
    setSelectedRowId(id);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedRowId(null);
  };

  const handleEdit = () => {
    alert(`Edit show with ID: ${selectedRowId}`);
    handleMenuClose();
  };

  const handleDelete = () => {
    alert(`Delete show with ID: ${selectedRowId}`);
    handleMenuClose();
  };

  // Columns for the Data Grid
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "image",
      headerName: "Image",
      width: 100,
      renderCell: (params) => (
        <img src={params.value} alt="show" style={{ width: "50px", height: "50px" }} />
      ),
    },
    { field: "name", headerName: "Name", width: 200 },
    { field: "description", headerName: "Description", width: 300 },
    {
      field: "rating",
      headerName: "Rating",
      width: 150,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          {Array.from({ length: params.value }, (_, i) => (
            <StarIcon key={i} style={{ color: "gold" }} />
          ))}
        </div>
      ),
    },
    {
      field: "views",
      headerName: "Views",
      width: 100,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <VisibilityIcon style={{ marginRight: "5px", color: "gray" }} />
          {params.value}
        </div>
      ),
    },
    { field: "dateAdded", headerName: "Date Added", width: 150 },
    {
      field: "actions",
      headerName: "",
      width: 100,
      renderCell: (params) => (
        <IconButton onClick={(event) => handleMenuOpen(event, params.row.id)}>
          <MoreVertIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <ScreenHeader label="Manage Shows" />

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
              {["Show 1", "Show 2", "Show 3", "Show 4"].map((show) => (
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
            <DataGrid rows={shows} columns={columns} pageSize={5} />
          </div>
        </Grid>
      </Grid>

      {/* Menu for Actions */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </div>
  );
};

export default ManageShows;
