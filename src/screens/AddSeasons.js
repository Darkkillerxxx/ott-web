import React, { useState } from "react";
import ScreenHeader from "../components/ScreenHeader"; // Import ScreenHeader component

const CreateSeasonsForm = () => {
  const [showName, setShowName] = useState("");
  const [seasonName, setSeasonName] = useState("");
  const [seasonDate, setSeasonDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log({
      showName,
      seasonName,
      seasonDate,
      description,
    });
  };

  return (
    <div className="container" style={{ marginTop: "20px" }}>
      {/* ScreenHeader */}
      <ScreenHeader label="Manage Contents" />

      <div className="card" style={{ padding: "20px", marginTop: "20px" }}>
        <h4 className="card-title text-center mb-4">Create Season</h4>
        <form onSubmit={handleSubmit}>
          {/* Show Name Picklist */}
          <div className="row mb-4">
            <div className="col-12">
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
          </div>

          {/* Season Name */}
          <div className="row mb-4">
            <div className="col-12">
              <label htmlFor="seasonName" className="form-label">
                Season Name
              </label>
              <input
                type="text"
                id="seasonName"
                className="form-control"
                value={seasonName}
                onChange={(e) => setSeasonName(e.target.value)}
              />
            </div>
          </div>

          {/* Season Date */}
          <div className="row mb-4">
            <div className="col-12">
              <label htmlFor="seasonDate" className="form-label">
                Season Date
              </label>
              <input
                type="date"
                id="seasonDate"
                className="form-control"
                value={seasonDate}
                onChange={(e) => setSeasonDate(e.target.value)}
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

export default CreateSeasonsForm;
