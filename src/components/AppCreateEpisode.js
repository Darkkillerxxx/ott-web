import { useState,forwardRef,useImperativeHandle, useEffect } from "react";
import AppCard from "./AppCard";
import { AppText } from "./AppText";
import { message } from "react-message-popup";
import { useNavigate, useParams } from 'react-router-dom';


const AppCreateEpisodes = forwardRef(({ setLoading, setFormProgress, setEpisodeId },ref)=>{

    const navigate = useNavigate();
    const [episodeNumber,setEpisodeNumber] = useState(null); 
    const [stillPath,setStillPath] = useState(null);
    const [imageType,setImageType] = useState('');
    const { seasonNumber, seriesId, seasonId } = useParams();
    
    const handleSubmit = async () => {
        console.log("Submission started...");
        setLoading(true);
    
        const form = document.getElementById("episodesForm");
        const formData = new FormData(form);
        formData.append('seriesId',seriesId);
        formData.append('seasonId',seasonId);
    
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
    
        const accessToken = localStorage.getItem('auth');
        console.log("Access Token:", accessToken);

        try {
             const response = await fetch("http://localhost:3000/api/shows/uploadEpisode", {
                 method: "POST",
                 headers: {
                     'Authorization': `Bearer ${accessToken}`,
                 },
                 body: formData,
             });
    
             if (!response.ok) {
                 const errorText = await response.text(); // If API returns non-JSON error
                 throw new Error(errorText || "Failed to upload content");
             }
    
             const data = await response.json();
             setEpisodeId(data.episodesId);
             
             setFormProgress(50);
             console.log("Success:", data);
    
             message.success(data.message || "Episode uploaded successfully", 5000);
        } catch (error) {
            console.error("Error occurred:", error);
            message.error(error.message || "An unexpected error occurred", 5000);
        } finally {
            setLoading(false); // Re-enable the button
        }
    };

    const fetchEpisodeDetails = async(event) =>{
        event.preventDefault();
        const result = await fetch(`https://api.themoviedb.org/3/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}`,{
            method: "GET",
            headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDRjM2ZmZmUwZmYzM2MxN2YzMTllNTBhZWNlZTRjMSIsIm5iZiI6MTcyNDE1ODg2MC45OTMsInN1YiI6IjY2YzQ5MzhjNmZjOTZhZTZmYTFiMTM0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.M4Rifyv_DZlpSohQeQy64Lt5yAO63mqBKolkuvt8alU`,
            },
        });

        if(!result.ok){
            message.error('Something went Wrong please try again');
            return;
        }

        const episode = await result.json();
        let directors = [];
        console.log(episode);
        
        document.getElementById('title').value = episode?.name?.replace(/'/g, '');
        document.getElementById('description').value = episode?.overview?.replace(/'/g, '');;
        setImageType('Url');
        setStillPath(episode?.still_path);
    }

    useImperativeHandle(ref, () => ({
            handleSubmit
    }));

    useEffect(() => {
        if (imageType === 'Url') {
            const stillImageInput = document.getElementById('stillImageUrl');
    
            if (stillImageInput) {
                stillImageInput.value = stillPath;
            }
        }
    }, [imageType, stillPath]);

    return(
        <AppCard title="Add Episodes">
        <form id="episodesForm" name="seriesForm">
            <div className="row">
                <div className="row mt-3">
                    <div className="col-3">
                        <AppText>Select Third Party Platform</AppText>
                            <select
                                className="form-select"
                                id="tpp"
                                name="tpp"
                            >
                                <option value="tmdb">TMDB</option>
                            </select>
                    </div>

                    <div className="col-7">
                        <AppText>Enter Episode Number</AppText>
                        <input onChange={(e)=>setEpisodeNumber(e.target.value)} type="text" className="form-control" placeholder="Enter Episode Number" id="extId" name="extId"/>
                    </div>
                    
                    <div className="col-2">
                        <button onClick={(e)=>fetchEpisodeDetails(e)} className="btn" style={{backgroundColor:'black',color:'white',marginTop:25,width:'100%'}}>Fetch Details</button>
                    </div>
                </div>

                <div className="col-12 mb-3 mt-3">
                    <AppText>Episode Name</AppText>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Episode Name"
                        id="title"
                        name="title"
                    />
                </div>

                <div className="col-12 mb-3">
                    <AppText>About the Episode</AppText>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        placeholder="About the Episode"
                    />
                </div>

                <div className="col-4 mb-3">
                    <AppText>Availibility Type</AppText>
                    <select name="availabilityType" id="availabilityType" className="form-select">
                        <option value="">Select Availibility Type</option>
                        <option value="Free">Free</option>
                        <option value="Subcription">Subscription</option>
                        <option value="Rent">Rent</option>
                    </select>
                </div>

                <div className="col-4 mb-3">
                    <AppText>Still Image Type</AppText>
                    <select
                        onChange={(e)=> setImageType(e.target.value)}
                        className="form-select"
                    >
                        <option value="">Select Image Type</option>
                        <option value="Url">Url</option>
                        <option value="File">File</option>
                    </select>
                </div>

                {imageType === 'Url' ? (
                    <>
                        <div className="col-4 mb-3">
                            <AppText>Still Image URL</AppText>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Still Image URL"
                                id="stillImageUrl"
                                name="stillImageUrl"
                            />
                        </div>
                    </>
                ) : imageType === 'File' ? (
                    <>
                        <div className="col-4 mb-3">
                            <AppText>Still Image File</AppText>
                            <input
                                type="file"
                                className="form-control"
                                id="stillImageFile"
                                name="stillImageFile"
                            />
                        </div>
                    </>
                ) : null}

                {/* <div className="col-4 mb-3">
                    <AppText>File Type</AppText>
                    <select
                        onChange={(e)=> setFileTypeType(e.target.value)}
                        className="form-select"
                    >
                        <option value="">Select Video Type</option>
                        <option value="Url">Url</option>
                        <option value="File">File</option>
                    </select>
                </div>

                {fileType === 'Url' ? (
                    <>
                        <div className="col-4 mb-3">
                            <AppText>Episode Video URL</AppText>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Still Image URL"
                                id="stillImageUrl"
                                name="stillImageUrl"
                            />
                        </div>
                    </>
                ) : fileType === 'File' ? (
                    <>
                        <div className="col-4 mb-3">
                            <AppText>Episode File</AppText>
                            <input
                                type="file"
                                className="form-control"
                                id="episodeVideo"
                                name="episodeVideo"
                            />
                        </div>
                    </>
                ) : null} */}
            </div>
        </form>
      
    </AppCard>
    )
}) 

export default AppCreateEpisodes;