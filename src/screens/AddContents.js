import React, { useState } from "react";
import ScreenHeader from "../components/ScreenHeader"; // Import ScreenHeader component

const AddContentForm = () => {
  const [showName, setShowName] = useState("");
  const [season, setSeason] = useState("");
  const [episodeName, setEpisodeName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log({
      showName,
      season,
      episodeName,
      description,
      file,
    });
  };

  return (
    <div className="container" style={{ marginTop: "20px" }}>
      {/* ScreenHeader */}
      <ScreenHeader label="Manage Contents" />

      <div className="card" style={{ padding: "20px", marginTop: "20px" }}>
        <h4 className="card-title text-center mb-4">Add Content</h4>
        <form onSubmit={handleSubmit}>
          {/* Show Name */}
          <div className="row mb-4">
            <div className="col-6">
              <label htmlFor="showName" className="form-label">
                Show Name
              </label>
              <select
                id="showName"
                className="form-select"
                value={showName}
                onChange={(e) => setShowName(e.target.value)}
              >
                <option value="">Select Show</option>
                <option value="show1">Show 1</option>
                <option value="show2">Show 2</option>
                <option value="show3">Show 3</option>
                {/* Add more options as required */}
              </select>
            </div>

            {/* Season */}
            <div className="col-6">
              <label htmlFor="season" className="form-label">
                Season
              </label>
              <select
                id="season"
                className="form-select"
                value={season}
                onChange={(e) => setSeason(e.target.value)}
              >
                <option value="">Select Season</option>
                <option value="season1">Season 1</option>
                <option value="season2">Season 2</option>
                <option value="season3">Season 3</option>
                {/* Add more options as required */}
              </select>
            </div>
          </div>

          {/* Episode Name */}
          <div className="row mb-4">
            <div className="col-12">
              <label htmlFor="episodeName" className="form-label">
                Episode Name
              </label>
              <input
                type="text"
                id="episodeName"
                className="form-control"
                value={episodeName}
                onChange={(e) => setEpisodeName(e.target.value)}
              />
            </div>
          </div>

          {/* Description */}
          <div className="row mb-4">
            <div className="col-12">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                id="description"
                className="form-control"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>

          {/* Add File */}
          <div className="row mb-4">
            <div className="col-12">
              <label htmlFor="file" className="form-label">
                Add File
              </label>
              <input
                type="file"
                id="file"
                className="form-control"
                onChange={handleFileChange}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="row">
            <div className="col-12 text-end mt-4">
              <button
                type="submit"
                className="btn"
                style={{
                  width: "auto",
                  padding: "10px 20px",
                  backgroundColor: "#28323e",
                  color: "white",
                  borderRadius: "5px",
                  fontWeight: "bold",
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContentForm;
