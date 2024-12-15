import React, { useEffect, useState } from "react";
import AppCard from "../components/AppCard";
import { AppText } from "../components/AppText";
import ScreenHeader from "../components/ScreenHeader";
import { message } from "react-message-popup";

const CreateSeasonForm = () => {
    // State variables for input fields
    const [seriesName, setSeriesName] = useState("");
    const [seriesDescription, setSeriesDescription] = useState("");
    const [pilotAirDate, setPilotAirDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    // State for the fetched series
    const [seriesList, setSeriesList] = useState([]);
    const [selectedSeries, setSelectedSeries] = useState(""); // For picklist selection

    // Fetch all series on component load
    useEffect(() => {
        const fetchSeries = async () => {
            try {
                const accessToken = await localStorage.getItem("auth");

                const response = await fetch(
                    "http://localhost:3000/api/shows/fetchSeries",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    console.log(38,data);
                    setSeriesList(data.data); // Assuming data.data contains the array of series
                } else {
                    const errorData = await response.json();
                    message.error(errorData.message || "Failed to fetch series", 5000);
                }
            } catch (error) {
                message.error(error.message || "Failed to fetch series", 5000);
            }
        };

        fetchSeries();
    }, []);

    // Change handlers for each field
    const handleSeriesNameChange = (e) => setSeriesName(e.target.value);
    const handleSeriesDescriptionChange = (e) => setSeriesDescription(e.target.value);
    const handlePilotAirDateChange = (e) => setPilotAirDate(e.target.value);
    const handleSelectedSeriesChange = (e) => setSelectedSeries(e.target.value);

    // Function to handle form submission
    const handleCreateSeason = async () => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const accessToken = await localStorage.getItem("auth");

            const response = await fetch(
                "http://localhost:3000/api/shows/createSeries",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({
                        seriesId: selectedSeries, // Include selected series ID
                        title: seriesName,
                        description: seriesDescription,
                        pilotAirDate,
                    }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                message.success("Successfully Created Season", 5000);
                setSuccess(true);
            } else {
                message.error(data.message || "Failed to create season", 5000);
                setError(data.message || "Failed to create season");
            }
        } catch (error) {
            message.error(error.message || "Failed to create season", 5000);
            setError("Error occurred while creating the season");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-5">
            <ScreenHeader label="Add Seasons" />
            <AppCard title={"Create Seasons"}>
                <div className="row">
                    <div className="col-6 mb-3">
                        <AppText>Select Series</AppText>
                        <select
                            className="form-control"
                            value={selectedSeries}
                            onChange={handleSelectedSeriesChange}
                        >
                            <option value="">Select a series</option>
                            {seriesList?.map((series) => (
                                <option key={series.id} value={series.id}>
                                    {series.SeriesName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-6">
                        <AppText>Season Name</AppText>
                        <input
                            type="text"
                            value={seriesName}
                            onChange={handleSeriesNameChange}
                            className="form-control"
                            placeholder="Season Name"
                            aria-label="Season Name"
                        />
                    </div>

                    <div className="col-12 mb-3">
                        <AppText>About the Season</AppText>
                        <textarea
                            value={seriesDescription}
                            onChange={handleSeriesDescriptionChange}
                            className="form-control"
                            placeholder="About the Season"
                            aria-label="Season Description"
                        />
                    </div>

                    <div className="col-4 mb-3">
                        <AppText>Release Date</AppText>
                        <input
                            type="date"
                            value={pilotAirDate}
                            onChange={handlePilotAirDateChange}
                            className="form-control"
                            aria-label="Release Date"
                        />
                    </div>
                </div>
            </AppCard>
            <div className="col-12 text-end">
                <button
                    className="btn btn-primary"
                    onClick={handleCreateSeason}
                    disabled={loading}
                >
                    {loading ? (
                        <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                        ></span>
                    ) : (
                        "Create Season"
                    )}
                </button>
            </div>
        </div>
    );
};

export default CreateSeasonForm;
