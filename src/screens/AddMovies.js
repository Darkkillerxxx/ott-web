import { useEffect, useState,useRef  } from "react";
import AppCard from "../components/AppCard";
import { AppText } from "../components/AppText";
import ScreenHeader from "../components/ScreenHeader";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { Spinner } from "react-bootstrap"; // Import the spinner from react-bootstrap (or any spinner component you prefer)
import { message } from 'react-message-popup'
import AppMovieInfo from "../components/AppMovieInfo";
import AppMovieContent from "../components/AppMovieContent";


const AddMovie = () => {
    const childRef1 = useRef();
    const childRef2 = useRef();

    const [formProgress, setFormProgress] = useState(0);
    const [loading, setLoading] = useState(false);
    const [showId, setShowId] = useState(150001);

    return (
        <div className="p-2">
            <ScreenHeader label="Add New Movie" />
            <div style={{ padding: "25px" }}>
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
                    <AppMovieInfo setShowId={setShowId} setLoading={setLoading} setFormProgress={setFormProgress} ref={childRef1}/>
                ) : formProgress === 50 ? (
                    <AppMovieContent setLoading={setLoading} setFormProgress={setFormProgress} showId={showId} ref={childRef2}/>
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
                        <strong>Success!</strong> The movie has been successfully uploaded.
                    </div>
                </div>
                }

                  <div className="d-flex justify-content-between mt-3">
                    {
                        formProgress != 100 ?
                        <>
                             <button
                                className="btn btn-secondary"
                                onClick={() => setFormProgress(formProgress === 50 ? 0 : formProgress - 50)}
                                disabled={formProgress === 0}
                            >
                                Previous
                            </button>
                            <button
                                id="submitButton"
                                className="btn btn-primary"
                                onClick={(e) => {
                                    if (formProgress === 50) {
                                        childRef2.current.handleSubmit();
                                    } else {
                                        childRef1.current.handleNext();
                                    }
                                }}
                                disabled={formProgress === 100 || loading} // Disable while loading or at max progress
                            >
                                {loading ? (
                                    <Spinner animation="border" size="sm" />
                                ) : (
                                    'Next'
                                )}
                            </button>
                        </>
                        :
                        null
                    }
                   

                </div>
            </div>
        </div>
    );
};

export default AddMovie;
