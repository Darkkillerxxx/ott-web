import { useState,useRef } from "react";
import ScreenHeader from "../components/ScreenHeader";
import { message } from 'react-message-popup';
import AppSeriesInfo from "../components/AppSeriesInfo";

const AddShows = () => {
    const [loading,setLoading] = useState(false);
    const childRef1 = useRef();

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
