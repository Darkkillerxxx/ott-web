// columns.js
export const showColumns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'showName', headerName: 'Show Name', width: 200 },
    { field: 'releaseDate', headerName: 'Release Date', width: 150 },
    { field: 'description', headerName: 'Description', width: 300 },
    { field: 'actions', headerName: 'Actions', width: 150, renderCell: (params) => (
        <div>
          <button onClick={() => {}} style={{ marginRight: '5px' }}>
            Edit
          </button>
          <button onClick={() => {}}>
            Delete
          </button>
        </div>
      ),
    },
  ];
  