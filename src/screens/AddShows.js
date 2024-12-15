import { useState,useRef } from "react";
import ScreenHeader from "../components/ScreenHeader";
import { message } from 'react-message-popup';
import AppSeriesInfo from "../components/AppSeriesInfo";

const AddShows = () => {
    const [loading,setLoading] = useState(false);
    const childRef1 = useRef();

    const handleCreateSeries = async () => {
        // setLoading(true);
        // setError(null);
        // setSuccess(false);

        // try {
        //     const accessToken = await localStorage.getItem('auth');

        //     // Construct form data if files are selected
        //     const formData = new FormData();
        //     formData.append('title', seriesName);
        //     formData.append('description', seriesDescription);
        //     formData.append('genre', genre);
        //     formData.append('language', language);
        //     formData.append('cast', cast);
        //     formData.append('producer', producer);
        //     formData.append('director', director);
        //     formData.append('pilotAirDate', pilotAirDate);
        //     formData.append('imageType', imageType);

        //     if (imageType === 'Url') {
        //         formData.append('thumbnailUrl', thumbnailUrl);
        //         formData.append('landscapeUrl', landscapeUrl);
        //     } else {
        //         formData.append('thumbnailFile', thumbnailFile);
        //         formData.append('landscapeFile', landscapeFile);
        //     }

        //     const response = await fetch('http://localhost:3000/api/shows/createSeries', {
        //         method: 'POST',
        //         headers: {
        //             'Authorization': `Bearer ${accessToken}`
        //         },
        //         body: formData,
        //     });

        //     const data = await response.json();

        //     if (response.ok) {
        //         message.success('Successfully Created Series', 5000);
        //         setSuccess(true);
        //     } else {
        //         message.error(data.message || 'Failed to create series', 5000);
        //         setError(data.message || 'Failed to create series');
        //     }
        // } catch (error) {
        //     message.error(error.message || 'Failed to create series', 5000);
        //     setError('Error occurred while creating the series');
        // } finally {
        //     setLoading(false);
        // }
    };

    return (
        <div className="p-5">
            <ScreenHeader label="Create Series" />
            <AppSeriesInfo setLoading={setLoading} ref={childRef1}/>
            <div className="col-12 text-end">
                <button
                    className="btn btn-primary"
                    style={{backgroundColor:'black'}}
                    onClick={()=>childRef1.current.handleSubmit()}
                    disabled={loading}
                >
                    {loading ? (
                        <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                        ></span>
                    ) : (
                        'Create Series'
                    )}
                </button>
            </div>
        </div>
    );
};

export default AddShows;
