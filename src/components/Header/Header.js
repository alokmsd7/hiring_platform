import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  CircularProgress,
  IconButton,  // Import IconButton
} from "@mui/material";
import SearchBar from "../SearchBar/SearchBar";
import JobCard from "../JobCards/JobCard";
import NewJob from "../NewJob/NewJob";
import { dbm } from "../../firebase";
import {
  Firestore,
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
  where,
  query,
} from "firebase/firestore";
import ViewJob from "../ViewJobModal/ViewJob";


export default (props) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newJobModal, setNewJobModal] = useState(false);
  const [customSearch, setCustomSearch] = useState(false);
  const [viewJob, setViewJob] = useState({

  });


  const getDocuments = async () => {
    try {
      setCustomSearch(false);
      setLoading(true);
      const collectionRef = collection(dbm, "jobs");
      const snapshot = await getDocs(collectionRef);

      const tempJobs = snapshot.docs.map((doc) => {
        const jobData = doc.data();
        return {
          ...jobData,
          id: doc.id,
          postedOn: jobData.postedOn?.toDate(),
        };
      });

      setJobs(tempJobs);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching documents:", error);
      setLoading(false);
    }
  };

  const postJob = async (newJobData) => {
    try {
      // Add current timestamp to the new job data
      const jobDataWithTimestamp = {
        ...newJobData,
        postedOn: serverTimestamp(),
      };

      // Assuming "jobs" is the collection where you want to add the new job
      const collectionRef = collection(dbm, "jobs");

      // Add a new document to the "jobs" collection with the updated data
      const docRef = await addDoc(collectionRef, jobDataWithTimestamp);

      // Call getDocuments to update the state with the new data
      getDocuments();

      console.log("New job added with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding new job:", error);
    }
  };

  const fetchJobCustom = async (jobSearch) => {
    setLoading(true);
    setCustomSearch(true);
    try {
      // Assuming "jobs" is the collection where your jobs are stored
      const collectionRef = collection(dbm, "jobs");

      // Build the query based on the jobSearch criteria
      const queryForJobSearch = query(
        collectionRef,
        where("location", "==", jobSearch.location),
        where("type", "==", jobSearch.type)
      );

      // Execute the query and get the snapshot
      const snapshot = await getDocs(queryForJobSearch);

      // Map the documents to the format you want, similar to getDocuments
      const tempJobs = snapshot.docs.map((doc) => {
        const jobData = doc.data();
        return {
          ...jobData,
          id: doc.id,
          postedOn: jobData.postedOn?.toDate(),
        };
      });

      // Update the state with the new data
      setJobs(tempJobs);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching custom documents:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getDocuments();
  }, []);

  return (
    <>
      <Box py={5} bgcolor={"#0B0B15"} color={"white"} textAlign="center">
        <Grid container justify="center">
          <Grid item xs={10}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h5" m={2}>
                Hirist: Your Job Listing Partner
              </Typography>
              <Button
                onClick={() => setNewJobModal(true)}
                variant="contained"
                color="primary"
              
              >
                Post a Job
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <NewJob
        closeModal={() => setNewJobModal(false)}
        newJobModal={newJobModal}
        postJob={postJob}
      />
      <ViewJob job={viewJob} closeModal={()=> setViewJob({})} />
      <Box mb={3}>
        <SearchBar fetchJobCustom={fetchJobCustom} />
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            {customSearch && (
              <Box my={2} display={"flex"} justifyContent={"flex-end"}>
                {" "}
                <Button onClick={getDocuments}>
                  <IconButton>
                    ✕
                  </IconButton>
                  Custom Search
                </Button>{" "}
              </Box>
            )}
            {jobs.map((job) => (
              <JobCard open={()=>setViewJob(job)} key={job.id} {...job} />
            ))}
          </>
        )}
      </Box>
    </>
  );
};
