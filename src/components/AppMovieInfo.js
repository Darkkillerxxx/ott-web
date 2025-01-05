import { useState,forwardRef, useImperativeHandle, useEffect } from "react";
import message$, { message } from 'react-message-popup'

import { AppText } from "./AppText";
import AppCard from "./AppCard";

const AppMovieInfo = forwardRef(({ setShowId, setLoading, setFormProgress, onFetchThirdPartyDetails, tmdbData },ref) => {
    const [movieName, setMovieName] = useState('');
    const [aboutMovie, setAboutMovie] = useState('');
    const [genre, setGenre] = useState('');
    const [language, setLanguage] = useState('');
    const [movieType, setMovieType] = useState('');
    const [cast, setCast] = useState('');
    const [producer, setProducer] = useState('');
    const [director, setDirector] = useState('');
    const [duration, setDuration] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [trailerType, setTrailerType] = useState(null);
    const [videoType, setVideoType] = useState(null);
    const [externalIds,setExternalIds] = useState();
    // const [tmdbData,setTmdbData] = useState(null);
    const [movieVideoAndData,setMovieVideoAndData] = useState(null);

    const handleNext = async () => {
            setLoading(true);
            // Validate and collect data from the first step
            const movieData = {
                name: movieName,
                description: aboutMovie,
                genre,
                language,
                type: movieType,
                cast,
                producer,
                director,
                duration,
                releaseDate,
            };
            console.log('Movie Data:', movieData);
            // Make API call to upsertMovies
            try {
                const accessToken = await localStorage.getItem('auth')
                console.log(46,accessToken);

                const response = await fetch('http://localhost:3000/api/shows/addMovie', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization':`Bearer ${accessToken}` 
                    },
                    body: JSON.stringify({
                        ...{
                            name: movieName,
                            description: aboutMovie,
                            genre,
                            language,
                            type: movieType,
                            cast,
                            producer,
                            director,
                            duration,
                            releaseDate,
                        }
                    }),
                });

                const data = await response.json();
                if (!data.code != 200 && !response.ok) {
                    setLoading(false);
                    message.error(data.message,5000)
                    throw new Error(data.message || 'Something went wrong');
                }

                if(data.showId != null){
                    console.log('81',data.showId);
                    setShowId(data.showId)
                }

                console.log('API Response:', data);
                message.success(data.message,5000)
                setLoading(false);
                setFormProgress(50)
            } catch (error) {
                setLoading(false);
                message.error(error.message,5000);
                console.error('API Error:', error.message);
            }
    };

    useEffect(()=>{
        if(tmdbData){
            console.log(92,tmdbData);

            setMovieName(tmdbData.title);
            setAboutMovie(tmdbData.overview);
            
            const movieGenre = [];
            tmdbData?.genres?.forEach((genre)=>{
                movieGenre.push(genre.name);
            })

            setGenre(movieGenre.toString());
            
            
            const movieLanguage = [];
            tmdbData?.spoken_languages?.forEach((language)=>{
                movieLanguage.push(language?.english_name);
            })

            setLanguage(movieLanguage.toString());
            
            const productionCompany = [];
            
            tmdbData?.production_companies?.forEach((prodCompany) => {
                productionCompany.push(prodCompany.name);
            })

            setProducer(productionCompany.toString());
            setReleaseDate(tmdbData?.release_date);

            
            const directors = []
            const cast = [];

            tmdbData?.cast?.forEach((actors)=>{
                cast.push(actors.name);
            })

            tmdbData?.crew?.forEach((crew)=>{
                if(crew.department === 'Directing' && crew.job === "Director"){
                    directors.push(crew.name);
                }
            })

            setCast(cast.toString());
            setDirector(directors.toString());

        }
    },[tmdbData]);

    useImperativeHandle(ref, () => ({
        handleNext
      }));

    const onFetchTMDBDetails = async() =>{
        onFetchThirdPartyDetails(externalIds);
    }
    
    return(
        <AppCard title={'Movie Information'}>
                        <div className="row">
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
                                <input onChange={(e)=>setExternalIds(e.target.value)} type="text" className="form-control" placeholder="Enter Id" id="extId" name="extId"/>
                            </div>
                                
                            <div className="col-2">
                                <button onClick={(e)=> onFetchTMDBDetails()} className="btn" style={{backgroundColor:'black',color:'white',marginTop:25,width:'100%'}}>Fetch Details</button>
                            </div>
                        

                            <div className="col-12 mb-3 mt-3">
                                <AppText>Movie Name</AppText>
                                <input type="text" onChange={(e) => setMovieName(e.target.value)} value={movieName} className="form-control" placeholder="Movie Name" aria-label="Movie Fenre" />
                            </div>

                            <div className="col-12 mb-3">
                                <AppText>About the Movie</AppText>
                                <textarea onChange={(e) => setAboutMovie(e.target.value)} value={aboutMovie} className="form-control" placeholder="About the Movie" aria-label="Movie Description" />
                            </div>

                            <div className="col-4 mb-3">
                                <AppText>Genre</AppText>
                                <input type="text" onChange={(e) => setGenre(e.target.value)} value={genre} className="form-control" placeholder="Movie Genre" aria-label="Movie Genre" />
                            </div>

                            <div className="col-4 mb-3">
                                <AppText>Movie Language</AppText>
                                <input type="text" onChange={(e) => setLanguage(e.target.value)} value={language} className="form-control" placeholder="Set Movie Language" aria-label="Set Movie Language"/>
                            </div>

                            <div className="col-4 mb-3">
                                <AppText>Movie Type</AppText>
                                <select className="form-select" onChange={(e) => setMovieType(e.target.value)} aria-label="Default select example">
                                    <option selected>Select Movie Type</option>
                                    <option value="Hollywood">Hollywood</option>
                                    <option value="Bollywood">Bollywood</option>
                                </select>
                            </div>

                            <div className="col-4 mb-3">
                                <AppText>Cast</AppText>
                                <input type="text" onChange={(e) => setCast(e.target.value)} value={cast} className="form-control" placeholder="Enter Cast" aria-label="Movie Cast" />
                            </div>

                            <div className="col-4 mb-3">
                                <AppText>Producer</AppText>
                                <input type="text" onChange={(e) => setProducer(e.target.value)} value={producer} className="form-control" placeholder="Enter Producer" aria-label="Movie Producer" />
                            </div>

                            <div className="col-4 mb-3">
                                <AppText>Director</AppText>
                                <input type="text" onChange={(e) => setDirector(e.target.value)} value={director} className="form-control" placeholder="Enter Director" aria-label="Movie Director" />
                            </div>

                            <div className="col-4 mb-3">
                                <AppText>Duration in mins</AppText>
                                <input type="text" onChange={(e) => setDuration(e.target.value)} className="form-control" placeholder="Enter Duration" aria-label="Movie Duration" />
                            </div>

                            <div className="col-4 mb-3">
                                <AppText>Release date</AppText>
                                <input type="date" onChange={(e) => setReleaseDate(e.target.value)} value={releaseDate} className="form-control" aria-label="Release Date" />
                            </div>
                        </div>
                    </AppCard>
    )
}) 


export default AppMovieInfo