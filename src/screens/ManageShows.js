import React, { useState, useEffect } from "react";
import ScreenHeader from "../components/ScreenHeader";
import { message } from "react-message-popup";
import { useNavigate } from "react-router-dom";

const ManageShows = () => {
  const [shows, setShows] = useState([]);
  const navigate = useNavigate();

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

  
  const fetchSeriesForId = async() =>{
    try{  
      const accessToken = localStorage.getItem('auth');
      console.log("Access Token:", accessToken);

      const fetchSeries = await fetch('http://localhost:3000/api/shows/getSeriesList',{
        method:'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      })

      if(!fetchSeries.ok){
        const errorText = await fetchSeries.text(); // If API returns non-JSON error
        throw new Error(errorText || "Failed to upload content");
      }

      const seriesListJSON = await fetchSeries.json();
      setShows([...seriesListJSON.data]);
    }
    catch(error){
       message.error('Something went Wrong while fetching series list');
    }
  }

  useEffect(()=>{
    fetchSeriesForId();
  },[])

  return (
    <div style={{ padding: "20px" }}>
      <ScreenHeader label="Manage Shows" />
      <div className="row">
        <div className="col-12">
          <div className="row">
            {
              shows.map((show)=>{
                return(
                  <div className="col-2 mt-3">
                    <div
                      className="position-relative w-100 hover-effect"
                      onClick={()=> navigate(`/seriesDetails/${show.ShowId}`)}
                      style={{
                        paddingBottom: '150%',
                        overflow: 'hidden',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                        transition: 'transform 0.3s ease'
                      }}
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/original/${show.thumbnailUrl}`}
                        alt={''}
                        className="position-absolute w-100 h-100"
                        style={{
                          objectFit: 'cover',
                          filter: 'brightness(50%)',
                        }}
                      />
                      <h6
                        className="position-absolute text-center text-white"
                        style={{
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          fontWeight: 'bold',
                        }}
                      >
                        {show.SeriesName}
                      </h6>
                    </div>        
                  </div>
                )
              })
            }
          
          </div>
        </div>
      </div>
   
    </div>
  );
};

export default ManageShows;
