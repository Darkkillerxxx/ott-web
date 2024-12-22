import { useState,forwardRef, useImperativeHandle } from "react";
import { message } from 'react-message-popup'
import { AppText } from "./AppText";
import AppCard from "./AppCard";


const AppContent = forwardRef(({showId, setLoading, setFormProgress,isUploadingMovie = true,episodeId},ref)=>{
    const [trailerType, setTrailerType] = useState(null);
    const [videoType, setVideoType] = useState(null);

    const handleSubmit = async(e) => {
        // Get the form element
        const form = document.getElementById("fileForm");
    
        // Create a FormData object to gather the input data
        const formData = new FormData(form);
        isUploadingMovie ? formData.append('showId', showId) : formData.append('episodeId',episodeId);
    
        // Make an API call using fetch
        setLoading(true);
        const accessToken = await localStorage.getItem('auth')
        console.log(46,accessToken);

        fetch("http://localhost:3000/api/shows/uploadContent", {
            method: "POST",
            headers:{
                'Authorization':`Bearer ${accessToken}` 
            },
            body: formData,
        })
            .then((response) => {
                if (response.ok) {
                    return response.json(); // Assuming your API returns JSON
                }
                message.error('Failed To Uplaod Content',5000)
                throw new Error("Failed to upload content");
            })
            .then((data) => {
                console.log("Success:", data);
                setFormProgress(100)
                message.success(data.message,5000)

                // Handle success (e.g., show a success message, reset the form, or update the UI)
            })
            .catch((error) => {
                message.error(error.message,5000)
                console.error("Error:", error);
                // Handle error (e.g., show an error message)
            })
            .finally(() => {
                setLoading(false); // Re-enable the button
            });
    };
    
    useImperativeHandle(ref, () => ({
        handleSubmit
    }));

    return(
        <AppCard title={ isUploadingMovie ? "Movie Contents" : "Episode Contents"}>
        <form id='fileForm' action="http://localhost:3000/api/shows/uploadContent" method="post" enctype="multipart/form-data">
            <div className="row">
                {
                    isUploadingMovie ?
                    <> 
                        <div className="col-3 mb-3">
                            <AppText>Trailer Type</AppText>
                            <select
                                className="form-select"
                                onChange={(e) => setTrailerType(e.target.value)}
                                aria-label="Default select example"
                            >
                                <option selected>Select Trailer Type</option>
                                <option value="1">Server Video</option>
                                <option value="2">External URL</option>
                                <option value="3">Youtube</option>
                            </select>
                        </div>

                        {trailerType === "1" ? (
                            <div className="col-9">
                                <AppText>Upload Server File</AppText>
                                <input
                                    className="form-control"
                                    type="file"
                                    id="trailerFile"
                                    name='trailerFile'
                                />
                            </div>
                        ) : trailerType === "2" ? (
                            <div className="col-9">
                                <AppText>External Server URL</AppText>
                                <input
                                    type="text"
                                    name="trailerExt"
                                    className="form-control"
                                    placeholder="Enter External URL"
                                />
                            </div>
                        ) : trailerType === "3" ? (
                            <div className="col-9">
                                <AppText>Enter Youtube Id</AppText>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Youtube Id"
                                    name="trailerYoutubeId"
                                />
                            </div>
                        ) : null}
                    </>
                    :
                    null
                }
               

                <div className="col-3 mb-3">
                    <AppText>Video</AppText>
                    <select
                        className="form-select"
                        onChange={(e) => setVideoType(e.target.value)}
                        aria-label="Default select example"
                    >
                        <option selected>Select Video Type</option>
                        <option value="1">Server Video</option>
                        <option value="2">External URL</option>
                        <option value="3">Youtube</option>
                    </select>
                </div>

                {videoType === "1" ? (
                    <>
                        <div className="col-3">
                            <AppText>Upload Server File (360p)</AppText>
                            <input
                                className="form-control"
                                type="file"
                                id="file360p"
                                name="file360p"
                            />
                        </div>
                        <div className="col-3">
                            <AppText>Upload Server File (480p)</AppText>
                            <input
                                className="form-control"
                                type="file"
                                id="file480p"
                                name="file480p"
                            />
                        </div>
                        <div className="col-3">
                            <AppText>Upload Server File (720p)</AppText>
                            <input
                                className="form-control"
                                type="file"
                                id="file720p"
                                name="file720p"
                            />
                        </div>
                    </>
                ) : videoType === "2" ? (
                    <div className="col-9">
                        <AppText>External Server URL</AppText>
                        <input
                            type="text"
                            id="fileExternalURL"
                            className="form-control"
                            placeholder="Enter External URL"
                            name="fileExternalURL"
                        />
                    </div>
                ) : videoType === "3" ? (
                    <>
                        <div className="col-3">
                            <AppText>Enter Youtube Id (360p)</AppText>
                            <input
                                type="text"
                                id="fileYoutube360pId"
                                className="form-control"
                                placeholder="Enter Youtube Id"
                                name="fileYoutube360pId"
                            />
                        </div>
                        <div className="col-3">
                            <AppText>Enter Youtube Id (480p)</AppText>
                            <input
                                type="text"
                                id="fileYoutube480pId"
                                className="form-control"
                                placeholder="Enter Youtube Id"
                                name="fileYoutube480pId"
                            />
                        </div>
                        <div className="col-3">
                            <AppText>Enter Youtube Id (720p)</AppText>
                            <input
                                type="text"
                                id="fileYoutube720pId"
                                className="form-control"
                                placeholder="Enter Youtube Id"
                                name="fileYoutube720pId"
                            />
                        </div>
                    </>
                ) : null}

                {
                    isUploadingMovie ?
                    <>
                        <div className="col-3 mb-3">
                            <AppText>Movie Thumbnail Image</AppText>
                            <input
                                className="form-control"
                                type="file"
                                id="thumbnailImage"
                                name="thumbnailImage"
                            />
                        </div>

                        <div className="col-3 mb-3">
                            <AppText>Movie Thumbnail Image</AppText>
                            <input
                                className="form-control"
                                type="file"
                                id="thumbnailImage"
                                name="thumbnailImage"
                            />
                        </div>

                        <div className="col-3 mb-3">
                            <AppText>Movie Landscape Image</AppText>
                            <input
                                className="form-control"
                                type="file"
                                id="movieImage"
                                name="movieImage"
                            />
                        </div>
                    </>
                    :
                    null
                }
            </div>
        </form>
    </AppCard>
    )
}) 


export default AppContent