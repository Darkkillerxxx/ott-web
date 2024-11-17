import React, { useState } from 'react';
import { Paper, Menu, MenuItem, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ScreenHeader from '../components/ScreenHeader';

const ManageEpisodes = () => {
  const [tableDataToShow, setTableDataToShow] = useState([
    {
      id: 1,
      episodeName: 'Episode 1',
      season: 'Season 1',
      show: 'Show 1',
      image: 'https://via.placeholder.com/50',
      description: 'Description of Episode 1',
      rating: 4.5,
      uploadDate: '2024-11-16',
    },
    {
      id: 2,
      episodeName: 'Episode 2',
      season: 'Season 1',
      show: 'Show 1',
      image: 'https://via.placeholder.com/50',
      description: 'Description of Episode 2',
      rating: 4.0,
      uploadDate: '2024-11-15',
    },
  ]);

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
    alert(`Edit row with ID: ${selectedRowId}`);
    handleMenuClose();
  };

  const handleDelete = () => {
    alert(`Delete row with ID: ${selectedRowId}`);
    handleMenuClose();
  };

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    {
      field: 'episodeName',
      headerName: 'Episode Name',
      flex: 2,
    },
    { field: 'season', headerName: 'Season', flex: 2 },
    { field: 'show', headerName: 'Show', flex: 2 },
    { field: 'description', headerName: 'Description', flex: 3 },
    { field: 'rating', headerName: 'Rating', flex: 1 },
    { field: 'uploadDate', headerName: 'Upload Date', flex: 2 },
    {
      field: 'actions',
      headerName: '',
      flex: 1,
      renderCell: (params) => (
        <MoreVertIcon
          onClick={(event) => handleMenuOpen(event, params.id)}
          style={{ cursor: 'pointer' }}
        />
      ),
    },
  ];

  return (
    <div className="container">
      <ScreenHeader label="Manage Episodes" />
      <Paper sx={{ width: '100%', marginTop: 5 }}>
        <DataGrid
          rows={tableDataToShow}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          sx={{
            height: 400,
            width: '100%',
            border: 0,
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#28323e", // Customize header background
              color: "#fff", // Customize header text color
              fontWeight: "bold", // Bold text
            },
            "& .MuiDataGrid-cell": {
              padding: "10px", // Add padding to the cells
            },
          }}
        />
      </Paper>
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

export default ManageEpisodes;
