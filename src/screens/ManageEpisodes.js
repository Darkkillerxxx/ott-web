import React, { useEffect, useRef, useState } from 'react';
import { ProgressBar, Step } from "react-step-progress-bar";
import ScreenHeader from '../components/ScreenHeader';
import AppCreateEpisodes from '../components/AppCreateEpisode';
import AppContent from '../components/AppContent';
import { AppTextBold } from '../components/AppTextBold';
import { AppText } from '../components/AppText';
import { useParams } from 'react-router-dom';
import { message } from 'react-message-popup';

const ManageEpisodes = () => {
  const [loading,setLoading] = useState(false);
  const [formProgress,setFormProgress] = useState(0);
  const [showEpisodesList,setShowEpisodesList] = useState(true);
  const [episodeId,setEpisodeId] = useState(null);
  const [episodeList,setEpisodeList] = useState([]);
  const { seasonId } = useParams()

  const childRef1 = useRef();
  const childRef2 = useRef();

  const fetchEpisodesList = async() =>{
    try{
        const accessToken = localStorage.getItem('auth');
        console.log("Access Token:", accessToken);

        const episodeListResult = await fetch(`http://localhost:3000/api/shows/getEpisodeListForSeason/${seasonId}`,
            {
                method:"GET",
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            }
        );   
        if (!episodeListResult.ok) {
            const errorText = await episodeListResult.text(); // If API returns non-JSON error
            throw new Error(errorText || "Failed to upload content");
        } 

        const episodeListJson = await episodeListResult.json();
        setEpisodeList([...episodeListJson.data])
    }
    catch(error){
        message.error('Something went Wrong while fetching episodes list');
    }
  }

  const deleteEpisode = async (episodeId) => {
    try {
        const accessToken = localStorage.getItem('auth');
        console.log("Access Token:", accessToken);

        // Call the DELETE API to remove the episode
        const deleteResult = await fetch(`http://localhost:3000/api/shows/deleteEpisode/${episodeId}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });

        if (!deleteResult.ok) {
            const errorText = await deleteResult.text(); // Handle non-JSON errors
            throw new Error(errorText || "Failed to delete episode");
        }

        const deleteResponseJson = await deleteResult.json();
        console.log("Delete Response:", deleteResponseJson);

        // Notify the user and refresh the episodes list
        message.success('Episode deleted successfully!');
        fetchEpisodesList(); // Refresh the episode list
    } catch (error) {
        console.error('Error while deleting the episode:', error);
        message.error('Something went wrong while deleting the episode');
    }
};


  useEffect(()=>{
    if(showEpisodesList){
        fetchEpisodesList();
    }
  },[showEpisodesList])

  return (
    <div className='container mt-5'>
      <ScreenHeader label="Manage Episodes" />
        <div className='w-100 d-flex justify-content-center mb-4'>
            <button type="button" class={`btn ${showEpisodesList ? 'btn-dark' : 'btn-outline-dark'} rounded-0`} onClick={()=>setShowEpisodesList(true)}>Show Episodes</button>
            <button type="button" class={`btn ${!showEpisodesList ? 'btn-dark' : 'btn-outline-dark'} rounded-0`} onClick={()=>setShowEpisodesList(false)}>Add Episodes</button>
        </div>

        {
            showEpisodesList ? 
                episodeList.map((episode)=>{
                    return(
                        <div className='w-100 d-flex p-2' style={{borderBottom: '1px solid #edeef0'}}>
                            <img src={`https://image.tmdb.org/t/p/original/${episode.stillImageUrl}`} className='border' style={{width:250,height:150,marginRight:50}} /> 
                            <div>
                                <AppTextBold>{episode.title}</AppTextBold>
                                <AppText style={{marginTop:10}}>{episode.description}</AppText>
                                <div className='d-flex' style={{marginTop:10}}>
                                    <button className='btn btn-danger' onClick={()=>deleteEpisode(episode.id)} style={{marginLeft:10}}>Delete Episode</button>
                                </div>
                            </div>
                        </div>
                    )
                })
            :
            <>    
                <ProgressBar
                    percent={formProgress}
                    filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
                        >
                            <Step transition="scale">
                                {({ accomplished }) => (
                                    <div
                                        style={{
                                            width: 30,
                                            height: 30,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            borderRadius: "50%",
                                            background: accomplished ? "#fefb72" : "#ddd",
                                            color: accomplished ? "#000" : "#aaa",
                                            fontWeight: "bold",
                                            filter: `grayscale(${accomplished ? 0 : 80}%)`,
                                        }}
                                    >
                                        1
                                    </div>
                                )}
                            </Step>
                            <Step transition="scale">
                                {({ accomplished }) => (
                                    <div
                                        style={{
                                            width: 30,
                                            height: 30,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            borderRadius: "50%",
                                            background: accomplished ? "#fefb72" : "#ddd",
                                            color: accomplished ? "#000" : "#aaa",
                                            fontWeight: "bold",
                                            filter: `grayscale(${accomplished ? 0 : 80}%)`,
                                        }}
                                    >
                                        2
                                    </div>
                                )}
                            </Step>
                            <Step transition="scale">
                                {({ accomplished }) => (
                                    <div
                                        style={{
                                            width: 30,
                                            height: 30,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            borderRadius: "50%",
                                            background: accomplished ? "#fefb72" : "#ddd",
                                            color: accomplished ? "#000" : "#aaa",
                                            fontWeight: "bold",
                                            filter: `grayscale(${accomplished ? 0 : 80}%)`,
                                        }}
                                    >
                                        3
                                    </div>
                                )}
                            </Step>
                        </ProgressBar>

                        {formProgress === 0 ? (
                            <AppCreateEpisodes setLoading={setLoading} setFormProgress={setFormProgress} ref={childRef1} setEpisodeId={setEpisodeId}/>
                        ) : formProgress === 50 ? (
                            <AppContent setLoading={setLoading} setFormProgress={setFormProgress}  isUploadingMovie={false} episodeId={episodeId} ref={childRef2}/>
                        ) : 
                        <div className="alert alert-success d-flex align-items-center mt-5" role="alert">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                className="bi bi-check-circle-fill me-2"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    d="M16 8a8 8 0 1 1-8-8 8 8 0 0 1 8 8zM11.854 5.146a.5.5 0 0 0-.708 0L7 8.793 4.854 6.646a.5.5 0 1 0-.708.708L7 9.207l5-5a.5.5 0 0 0 0-.708z"
                                />
                            </svg>
                            <div>
                                <strong>Success!</strong> The Episode has been successfully uploaded.
                            </div>
                        </div>
                        }
            </>     
        }

      <div className="col-12 text-end">
        {
            showEpisodesList ?
            null
            :
            <button
                className="btn btn-primary"
                style={{backgroundColor:'black'}}
                onClick={()=>
                    formProgress === 0 ? childRef1.current.handleSubmit() : childRef2.current.handleSubmit()
                }
                disabled={loading}
            >
                {loading ? (
                    <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                    ></span>
                ) : (
                    'Add Episode'
                )}
            </button>
        }
           
        </div>
    </div>
  );
};

export default ManageEpisodes;
