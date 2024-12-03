import { useEffect, useState } from "react";
import AppCard from "../components/AppCard";
import { AppText } from "../components/AppText";
import ScreenHeader from "../components/ScreenHeader";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { Spinner } from 'react-bootstrap'; // Import the spinner from react-bootstrap (or any spinner component you prefer)


const AddMovie = () => {
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
    const [formProgress, setFormProgress] = useState(0);
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        console.log(username);
    }, [username]);

    const handleNext = async () => {
        if (formProgress === 0) {
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
                setLoading(true);
                const accessToken = await localStorage.getItem('auth')
                console.log(46,accessToken);

                const response = await fetch('http://localhost:3000/api/shows/upsertMovie', {
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
                    throw new Error(data.message || 'Something went wrong');
                }

                console.log('API Response:', data);
                alert('Movie Details Uploaded To The Server')
            } catch (error) {
                console.error('API Error:', error);
                // Handle error (e.g., show an error message)
            }
            setLoading(false);
            // Move to the next step
            setFormProgress(50);
        } else if (formProgress === 50) {
            // Validate and collect data from the second step
            const movieContentData = {
                trailerType,
                videoType,
                // Collect additional data for files or URLs as needed
            };
        }
    };

    return (
        <div className="p-2">
            <ScreenHeader label='Add New Movie' />
            <div style={{ padding: '25px' }}>
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
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '50%',
                                    background: accomplished ? '#fefb72' : '#ddd',
                                    color: accomplished ? '#000' : '#aaa',
                                    fontWeight: 'bold',
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
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '50%',
                                    background: accomplished ? '#fefb72' : '#ddd',
                                    color: accomplished ? '#000' : '#aaa',
                                    fontWeight: 'bold',
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
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '50%',
                                    background: accomplished ? '#fefb72' : '#ddd',
                                    color: accomplished ? '#000' : '#aaa',
                                    fontWeight: 'bold',
                                    filter: `grayscale(${accomplished ? 0 : 80}%)`,
                                }}
                            >
                                3
                            </div>
                        )}
                    </Step>
                </ProgressBar>

                {formProgress === 0 ? (
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
                ) : formProgress === 50 ? (
                    <AppCard title={'Movie Contents'}>
                        <div className="row">
                            <div className="col-3 mb-3">
                                <AppText>Trailer Type</AppText>
                                <select className="form-select" onChange={(e) => setTrailerType(e.target.value)} aria-label="Default select example">
                                    <option selected>Select Trailer Type</option>
                                    <option value="1">Server Video</option>
                                    <option value="2">External URL</option>
                                    <option value="3">Youtube</option>
                                </select>
                            </div>

                            {trailerType === '1' ? (
                                <div className="col-9">
                                    <AppText>Upload Server File</AppText>
                                    <input className="form-control" type="file" id="formFileMultiple" multiple />
                                </div>
                            ) : trailerType === '2' ? (
                                <div className="col-9">
                                    <AppText>External Server URL</AppText>
                                    <input type="text" className="form-control" placeholder="Enter External URL" />
                                </div>
                            ) : trailerType === '3' ? (
                                <div className="col-9">
                                    <AppText>Enter Youtube Id</AppText>
                                    <input type="text" className="form-control" placeholder="Enter Youtube Id" />
                                </div>
                            ) : null}

                            <div className="col-3 mb-3">
                                <AppText>Video</AppText>
                                <select className="form-select" onChange={(e) => setVideoType(e.target.value)} aria-label="Default select example">
                                    <option selected>Select Video Type</option>
                                    <option value="1">Server Video</option>
                                    <option value="2">External URL</option>
                                    <option value="3">Youtube</option>
                                </select>
                            </div>

                            {videoType === '1' ? (
                                <>
                                    <div className="col-3">
                                        <AppText>Upload Server File (360p)</AppText>
                                        <input className="form-control" type="file" id="formFileMultiple" multiple />
                                    </div>
                                    <div className="col-3">
                                        <AppText>Upload Server File (480p)</AppText>
                                        <input className="form-control" type="file" id="formFileMultiple" multiple />
                                    </div>
                                    <div className="col-3">
                                        <AppText>Upload Server File (720p)</AppText>
                                        <input className="form-control" type="file" id="formFileMultiple" multiple />
                                    </div>
                                </>
                            ) : videoType === '2' ? (
                                <div className="col-9">
                                    <AppText>External Server URL</AppText>
                                    <input type="text" className="form-control" placeholder="Enter External URL" />
                                </div>
                            ) : videoType === '3' ? (
                                <>
                                    <div className="col-3">
                                        <AppText>Enter Youtube Id (360p)</AppText>
                                        <input type="text" className="form-control" placeholder="Enter Youtube Id" />
                                    </div>
                                    <div className="col-3">
                                        <AppText>Enter Youtube Id (480p)</AppText>
                                        <input type="text" className="form-control" placeholder="Enter Youtube Id" />
                                    </div>
                                    <div className="col-3">
                                        <AppText>Enter Youtube Id (720p)</AppText>
                                        <input type="text" className="form-control" placeholder="Enter Youtube Id" />
                                    </div>
                                </>
                            ) : null}

                            <div className="col-3 mb-3">
                                <AppText>Movie Thumbnail Image</AppText>
                                <input className="form-control" type="file" id="formFileMultiple" />
                            </div>

                            <div className="col-3 mb-3">
                                <AppText>Movie Landscape Image</AppText>
                                <input className="form-control" type="file" id="formFileMultiple" />
                            </div>
                        </div>
                    </AppCard>
                ) : null}

                <div className="d-flex justify-content-between mt-3">
                    <button
                        className="btn btn-secondary"
                        onClick={() => setFormProgress(formProgress === 50 ? 0 : formProgress - 50)}
                        disabled={formProgress === 0}
                    >
                        Previous
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={handleNext}
                        disabled={formProgress === 100}
                    >
                        {loading ? (
                            <Spinner animation="border" size="sm" /> // Show spinner while loading
                        ) : (
                            'Next'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddMovie;