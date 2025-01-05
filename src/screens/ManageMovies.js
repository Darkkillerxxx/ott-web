import React, { useState, useEffect } from "react";
import ScreenHeader from "../components/ScreenHeader";
import { message } from "react-message-popup";
import { useNavigate } from "react-router-dom";

const ManageMovies = () => {
  const [movies, setMovies] = useState([]);
  const [search,setSearch] = useState('');

  const navigate = useNavigate();

  
  const fetchMoviesForId = async() =>{
    try{  
      const accessToken = localStorage.getItem('auth');
      console.log("Access Token:", accessToken);

      const fetchMovies = await fetch(`http://localhost:3000/api/shows/getMoviesList/${search}`,{
        method:'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      })

      if(!fetchMovies.ok){
        const errorText = await fetchMovies.text(); // If API returns non-JSON error
        throw new Error(errorText || "Failed to upload content");
      }

      const moviesListJSON = await fetchMovies.json();
      setMovies([...moviesListJSON.data]);
    }
    catch(error){
       message.error('Something went Wrong while fetching series list');
    }
  }

  useEffect(()=>{
    fetchMoviesForId();
  },[])

  return (
    <div style={{ padding: "20px" }}>
      <ScreenHeader label="Manage Shows" />
      <div className="row">
        <div className="col-12">
          <div className="row">
            <div className="col-10">
              <input className="form-control" placeholder="Search Shows" onChange={(e)=>setSearch(e.target.value)}></input>
            </div>
            <div className="col-2">
              <button className="btn btn-dark w-100" onClick={()=>fetchMoviesForId()}>Search Shows</button>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="row">
            {
              movies.map((show)=>{
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

export default ManageMovies;
