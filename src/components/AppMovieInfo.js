import { useState,forwardRef, useImperativeHandle } from "react";
import { message } from 'react-message-popup'

import { AppText } from "./AppText";
import AppCard from "./AppCard";

const AppMovieInfo = forwardRef(({ setShowId, setLoading, setFormProgress },ref) => {
    const [username, setUsername] = useState('');
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

    const handleNext = async () => {
            setLoading(true);
            // Validate and collect data from the first step
            const movieData = {
                name: username,
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
                            name: username,
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

    useImperativeHandle(ref, () => ({
        handleNext
      }));
    
    return(
        <AppCard title={'Movie Information'}>
                        <div className="row">
                            <div className="col-12 mb-3 mt-3">
                                <AppText>Movie Name</AppText>
                                <input type="text" onChange={(e) => setUsername(e.target.value)} className="form-control" placeholder="Movie Name" aria-label="Movie Name" />
                            </div>

                            <div className="col-12 mb-3">
                                <AppText>About the Movie</AppText>
                                <textarea onChange={(e) => setAboutMovie(e.target.value)} className="form-control" placeholder="About the Movie" aria-label="Movie Description" />
                            </div>

                            <div className="col-4 mb-3">
                                <AppText>Genre</AppText>
                                <select className="form-select" onChange={(e) => setGenre(e.target.value)} aria-label="Default select example">
                                    <option selected>Select Genre</option>
                                    <option value="Horror">Horror</option>
                                    <option value="Comedy">Comedy</option>
                                    <option value="Drama">Drama</option>
                                </select>
                            </div>

                            <div className="col-4 mb-3">
                                <AppText>Movie Language</AppText>
                                <select className="form-select" onChange={(e) => setLanguage(e.target.value)} aria-label="Default select example">
                                    <option selected>Select Language</option>
                                    <option value="Hindi">Hindi</option>
                                    <option value="Marathi">Marathi</option>
                                    <option value="English">English</option>
                                </select>
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
                                <input type="text" onChange={(e) => setCast(e.target.value)} className="form-control" placeholder="Enter Cast" aria-label="Movie Cast" />
                            </div>

                            <div className="col-4 mb-3">
                                <AppText>Producer</AppText>
                                <input type="text" onChange={(e) => setProducer(e.target.value)} className="form-control" placeholder="Enter Producer" aria-label="Movie Producer" />
                            </div>

                            <div className="col-4 mb-3">
                                <AppText>Director</AppText>
                                <input type="text" onChange={(e) => setDirector(e.target.value)} className="form-control" placeholder="Enter Director" aria-label="Movie Director" />
                            </div>

                            <div className="col-4 mb-3">
                                <AppText>Duration in mins</AppText>
                                <input type="text" onChange={(e) => setDuration(e.target.value)} className="form-control" placeholder="Enter Duration" aria-label="Movie Duration" />
                            </div>

                            <div className="col-4 mb-3">
                                <AppText>Release date</AppText>
                                <input type="date" onChange={(e) => setReleaseDate(e.target.value)} className="form-control" aria-label="Release Date" />
                            </div>
                        </div>
                    </AppCard>
    )
}) 


export default AppMovieInfo