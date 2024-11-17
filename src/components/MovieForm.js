import React, { useState } from "react";

const MovieForm = () => {
  const [selectedOption, setSelectedOption] = useState("Movie");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const getLabel = (field) => {
    if (field === "name") {
      return selectedOption === "Movie" ? "Movie Name" : "Show Name";
    } else if (field === "date") {
      return selectedOption === "Movie" ? "Release Date" : "First Aired Date";
    }
    return field;
  };

  return (
    <div className="card" style={{ padding: "20px", marginTop: "20px" }}>
      <h4 className="card-title text-center mb-4">Add Content</h4>
      <form>
        {/* Content Type Selection */}
        <div className="row mb-4">
          <div className="col-12">
            <label htmlFor="contentType" className="form-label">
              Content Type
            </label>
            <select
              className="form-select"
              id="contentType"
              value={selectedOption}
              onChange={handleOptionChange}
            >
              <option value="Movie">Movie</option>
              <option value="Show">Show</option>
              <option value="Live">Live</option>
            </select>
          </div>
        </div>

        {/* Shared Fields for Movie and Show */}
        {selectedOption !== "Live" && (
          <>
            <div className="row mb-4">
              <div className="col-12">
                <label htmlFor="name" className="form-label">
                  {getLabel("name")}
                </label>
                <input type="text" className="form-control" id="name" />
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-12">
                <label htmlFor="description" className="form-label">
                  Short Description
                </label>
                <textarea className="form-control" id="description" rows="3"></textarea>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-6">
                <label htmlFor="photo" className="form-label">
                  Photo Upload
                </label>
                <input type="file" className="form-control" id="photo" />
              </div>

              <div className="col-6">
                <label htmlFor="date" className="form-label">
                  {getLabel("date")}
                </label>
                <input type="date" className="form-control" id="date" />
              </div>
            </div>

            {/* Additional Fields for Movie and Show */}
            <div className="row mb-4">
              <div className="col-6">
                <label htmlFor="actors" className="form-label">
                  Actors
                </label>
                <input type="text" className="form-control" id="actors" />
              </div>

              <div className="col-6">
                <label htmlFor="director" className="form-label">
                  Director
                </label>
                <input type="text" className="form-control" id="director" />
              </div>
            </div>
          </>
        )}

        {/* Live Form Fields */}
        {selectedOption === "Live" && (
          <>
            <div className="row mb-4">
              <div className="col-12">
                <label htmlFor="name" className="form-label">
                  Show Name
                </label>
                <input type="text" className="form-control" id="name" />
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-12">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea className="form-control" id="description" rows="3"></textarea>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-12">
                <label htmlFor="url" className="form-label">
                  URL
                </label>
                <input type="text" className="form-control" id="url" />
              </div>
            </div>
          </>
        )}

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
  );
};

export default MovieForm;
