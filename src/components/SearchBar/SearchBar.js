import React, { useState } from "react";
import { Box, Button, Select, MenuItem,CircularProgress } from "@mui/material";
import "./SearchBar.css"; // Import the CSS file

const SearchBar = (props) => {
  const [loading,setLoading]=useState(false);
  const [jobSearch, setJobSearch] = useState({
    type: "Full Time",
    location: "Remote",
  });

  const handleChange = (e) => {
    setJobSearch((oldState) => ({
      ...oldState,
      [e.target.name]: e.target.value,
    }));
  };
  const search=async()=>{
    setLoading(true);
    await props.fetchJobCustom(jobSearch);
    setLoading(false);

  }

 

  return (
    <div className="search-bar-container">
      <div className="search-bar-wrapper">
        <Box className="search-bar-box">
          <Select
            onChange={handleChange}
            value={jobSearch.type}
            name="type"
            disableUnderline
            variant="filled"
            fullWidth
          >
            <MenuItem value="Full Time">Full Time</MenuItem>
            <MenuItem value="Part Time">Part Time</MenuItem>
            <MenuItem value="Contract">Contract</MenuItem>
          </Select>
        </Box>
        <Box className="search-bar-box">
          <Select
            onChange={handleChange}
            value={jobSearch.location}
            name="location"
            disableUnderline
            variant="filled"
            fullWidth
          >
            <MenuItem value="Remote">Remote</MenuItem>
            <MenuItem value="In Office">In office</MenuItem>
          </Select>
        </Box>
        <Box className="search-button">
          <Button
          disabled={loading}
            variant="contained"
            color="primary"
            disableElevation
            fullWidth
            onClick={search}
          >
         {loading?(
          <CircularProgress />
          ):(  "Search" )}
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default SearchBar;
