import { useState,forwardRef,useImperativeHandle, useEffect } from "react";
import AppCard from "./AppCard";
import { AppText } from "./AppText";
import { message } from "react-message-popup";
import { useNavigate } from 'react-router-dom';


const AppSeriesInfo = forwardRef(({ setLoading },ref)=>{

    const navigate = useNavigate();
    const [externalId,setExternalId] = useState(null); 
    const [backDropPath,setBackDropPath] = useState(null);
    const [posterPath,setPosterPath] = useState(null);
    const [imageType,setImageType] = useState('');
    const [seasons,setSeasons] = useState([])

    const handleSubmit = async () => {
        console.log("Submission started...");
        setLoading(true);
    
        const form = document.getElementById("seriesForm");
        const formData = new FormData(form);
    
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
    
        const accessToken = localStorage.getItem('auth');
        console.log("Access Token:", accessToken);

        try {
            const response = await fetch("http://localhost:3000/api/shows/createSeries", {
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
            console.log("Success:", data);
    
            message.success(data.message || "Series uploaded successfully", 5000);
            await createSeasons(data.seriesId);
            navigate(`/seriesDetails/${data.showId}`);
        } catch (error) {
            console.error("Error occurred:", error);
            message.error(error.message || "An unexpected error occurred", 5000);
        } finally {
            setLoading(false); // Re-enable the button
        }
    };

    const createSeasons = async(seriesId) =>{
        try{
            if(seasons.length > 0){
                const seasonsPayload = []

                seasons.forEach((season,index)=>{
                    seasonsPayload.push({
                        seasonNumber:index + 1,
                        title:season?.name?.replace(/'/g, ''),
                        releaseDate:season.air_date,
                        seriesId:seriesId,
                        description:season?.overview?.replace(/'/g, ''),
                        imageUrl:season.poster_path,
                        noOfEpisodes:season.episode_count,
                    })
                })

                const accessToken = localStorage.getItem('auth');
                console.log("Access Token:", accessToken);
                const response = await fetch(`http://localhost:3000/api/shows/createSeasonBulk`,{
                    method: "POST",
                    headers: {
                        'Authorization':`Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                    body:JSON.stringify({
                        seasons:seasonsPayload
                    })
                });
    
                if(!response.ok){
                    message.error('Something went wrong while inserting seasons',5000)
                }
            }

            
        }
        catch(error){
            message.error(error.message,5000);
        }   
    }

    const fetchSeriesDetails = async(event) =>{
        event.preventDefault();
        const result = await fetch(`https://api.themoviedb.org/3/tv/${externalId}`,{
            method: "GET",
            headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDRjM2ZmZmUwZmYzM2MxN2YzMTllNTBhZWNlZTRjMSIsIm5iZiI6MTcyNDE1ODg2MC45OTMsInN1YiI6IjY2YzQ5MzhjNmZjOTZhZTZmYTFiMTM0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.M4Rifyv_DZlpSohQeQy64Lt5yAO63mqBKolkuvt8alU`,
            },
        });

        if(!result.ok){
            message.error('Something went Wrong please try again');
            return;
        }

        const series = await result.json();
        let directors = [];
        console.log(series);
        
        document.getElementById('title').value = series?.name?.replace(/'/g, '');
        document.getElementById('description').value = series?.overview?.replace(/'/g, '');;

        if(series.genre && series.genre.length > 0){
            document.getElementById('genre').value = series?.genre[0].name;
        }

        document.getElementById('pilotAirDate').value = series?.first_air_date;
        if(series?.created_by && series?.created_by.length > 0){
            series.created_by.forEach(element => {
                directors.push(element.name);
            });
        }

        document.getElementById('director').value = directors.toString();
        setSeasons([...series?.seasons])
        console.log(series?.backdrop_path);
        setImageType('Url');
        setBackDropPath(series?.backdrop_path);
        setPosterPath(series?.poster_path);
        fetchCredits();
    }

    const fetchCredits = async() =>{
        const result = await fetch(`https://api.themoviedb.org/3/tv/${externalId}/credits`,{
            method: "GET",
            headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDRjM2ZmZmUwZmYzM2MxN2YzMTllNTBhZWNlZTRjMSIsIm5iZiI6MTcyNDE1ODg2MC45OTMsInN1YiI6IjY2YzQ5MzhjNmZjOTZhZTZmYTFiMTM0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.M4Rifyv_DZlpSohQeQy64Lt5yAO63mqBKolkuvt8alU`,
            },
        });

        if(!result.ok){
            message.error('Something went Wrong please try again');
            return;
        }

        const credits = await result.json();
        let cast = [];

        if(credits?.cast && credits.cast.length > 0){
            credits.cast.forEach((element)=>{
                cast.push(element.name)
            })
        }
        
        document.getElementById('cast').value = cast.toString();
    }

    useImperativeHandle(ref, () => ({
            handleSubmit
    }));

    useEffect(() => {
        if (imageType === 'Url') {
            const thumbnailInput = document.getElementById('thumbnailUrl');
            const landscapeInput = document.getElementById('landscapeUrl');
    
            if (thumbnailInput && landscapeInput) {
                thumbnailInput.value = posterPath;
                landscapeInput.value = backDropPath;
            }
        }
    }, [imageType, posterPath, backDropPath]);

    return(
        <AppCard title="Add Series">
        <form id="seriesForm" name="seriesForm">
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
                        <AppText>Enter Id</AppText>
                        <input onChange={(e)=>setExternalId(e.target.value)} type="text" className="form-control" placeholder="Enter Id" id="extId" name="extId"/>
                    </div>
                    
                    <div className="col-2">
                        <button onClick={(e)=>fetchSeriesDetails(e)} className="btn" style={{backgroundColor:'black',color:'white',marginTop:25,width:'100%'}}>Fetch Details</button>
                    </div>
                </div>

                <div className="col-12 mb-3 mt-3">
                    <AppText>Series Name</AppText>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Series Name"
                        id="title"
                        name="title"
                    />
                </div>

                <div className="col-12 mb-3">
                    <AppText>About the Series</AppText>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        placeholder="About the Series"
                    />
                </div>

                <div className="col-4 mb-3">
                    <AppText>Genre</AppText>
                    <select
                        className="form-select"
                        id="genre"
                        name="genre"
                    >
                        <option value="">Select Genre</option>
                        <option value="Horror">Horror</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Drama">Drama</option>
                        <option value="Action">Action</option>
                    </select>
                </div>

                <div className="col-4 mb-3">
                    <AppText>Series Language</AppText>
                    <select
                        className="form-select"
                        id="language"
                        name="language"
                    >
                        <option value="">Select Language</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Marathi">Marathi</option>
                        <option value="English">English</option>
                    </select>
                </div>

                <div className="col-4 mb-3">
                    <AppText>Cast</AppText>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Cast"
                        id="cast"
                        name="cast"
                    />
                </div>

                <div className="col-4 mb-3">
                    <AppText>Producer</AppText>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Producer"
                        id="producer"
                        name="producer"
                    />
                </div>

                <div className="col-4 mb-3">
                    <AppText>Director</AppText>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Director"
                        id="director"
                        name="director"
                    />
                </div>

                <div className="col-4 mb-3">
                    <AppText>Pilot Air Date</AppText>
                    <input
                        type="date"
                        className="form-control"
                        id="pilotAirDate"
                        name="pilotAirDate"
                    />
                </div>

                <div className="col-4 mb-3">
                    <AppText>Image Type</AppText>
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
                            <AppText>Thumbnail URL</AppText>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Thumbnail URL"
                                id="thumbnailUrl"
                                name="thumbnailUrl"
                            />
                        </div>
                        <div className="col-4 mb-3">
                            <AppText>Landscape URL</AppText>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Landscape URL"
                                id="landscapeUrl"
                                name="landscapeUrl"
                            />
                        </div>
                    </>
                ) : imageType === 'File' ? (
                    <>
                        <div className="col-4 mb-3">
                            <AppText>Thumbnail File</AppText>
                            <input
                                type="file"
                                className="form-control"
                                id="thumbnailFile"
                                name="thumbnailFile"
                            />
                        </div>
                        <div className="col-4 mb-3">
                            <AppText>Landscape File</AppText>
                            <input
                                type="file"
                                className="form-control"
                                id="landscapeFile"
                                name="landscapeFile"
                            />
                        </div>
                    </>
                ) : null}
            </div>
        </form>
      
    </AppCard>
    )
}) 

export default AppSeriesInfo;