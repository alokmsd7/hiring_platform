import React, { useState } from "react";
import {Box,CircularProgress,
  Grid,MuiFilledInput,Select,MenuItem,Dialog,DialogTitle,MuiDialogActions, DialogContent, FilledInput , Typography,Button, DialogActions,IconButton} from '@mui/material'

import './NewJob.css';

const initState={ title: "",
type: "Fulltime",
companyName: "",
companyUrl: "",
location: "Remote",
link: "",
description: "",
skills: [],};

export default (props) => {
const [loading,setLoading]=useState(false);

  const [jobDetails, setJobDetails] = useState(initState);

  const handleChange = (e) => {
    setJobDetails((oldState) => ({
      ...oldState,
      [e.target.name]: e.target.value,
    }));
  };

  const addRemoveSkill = (skill) =>
    jobDetails.skills.includes(skill)
      ? setJobDetails((oldState) => ({
          ...oldState,
          skills: oldState.skills.filter((s) => s !== skill),
        }))
      : setJobDetails((oldState) => ({
          ...oldState,
          skills: oldState.skills.concat(skill),
        }));

  const handleSubmit = async () => {
    for(const field in jobDetails){
      if(typeof jobDetails[field]==="string" && !jobDetails[field]) return;
    }
    if(!jobDetails.skills.length)return;
    setLoading(true);
    await props.postJob(jobDetails);
    closeModal();
  };

  const closeModal=()=>{
    setJobDetails(initState);
    setLoading(false);
    props.closeModal();
  }









const skills=["JavaScript","React","NodeJs","VueJs","Firebase","MongoDb","SQL",];


console.log(jobDetails);

return(
<Dialog open={props.newJobModal} fullWidth >
<DialogTitle>
  <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
    Post Job <IconButton onClick={closeModal}>
    ✕
        </IconButton>
    </Box>
    </DialogTitle>
<DialogContent>
<Grid container spacing={2}>
  <Grid item xs={6}>
    <FilledInput onChange={handleChange} name="title" value={jobDetails.title} autoComplete="off" placeholder="Job title *" disableUnderline fullWidth />
  </Grid>
  <Grid item xs={6}>
  <Select onChange={handleChange}  name="type" value={jobDetails.type} disableUnderline variant="filled"  fullWidth>
            <MenuItem value="Full Time">Full Time</MenuItem>
            <MenuItem value="Part Time">Part Time</MenuItem>
            <MenuItem value="Contract">Contract</MenuItem>
          </Select>
  </Grid>
  <Grid item xs={6}>
    <FilledInput onChange={handleChange} name="companyName" value={jobDetails.companyName} autoComplete="off" placeholder="Company Name *" disableUnderline fullWidth />
  </Grid>
  <Grid item xs={6}>
    <FilledInput onChange={handleChange} name="companyUrl" value={jobDetails.companyUrl} autoComplete="off" placeholder="Company Website *" disableUnderline fullWidth />
  </Grid>
  <Grid item xs={6}>
  <Select name="location" defaultValue="Remote" value={jobDetails.location} disableUnderline variant="filled"  fullWidth>
            <MenuItem value="Remote">Remote</MenuItem>
            <MenuItem value="In Office">In office</MenuItem>
          </Select>
  </Grid>
  <Grid item xs={6}>
    <FilledInput onChange={handleChange}  name="link" value={jobDetails.link} autoComplete="off" placeholder="Job Link *" disableUnderline fullWidth />
  </Grid>
  <Grid item xs={12}>
    <FilledInput onChange={handleChange} name="description" value={jobDetails.description} autoComplete="off" placeholder="Job Description *" disableUnderline fullWidth multiline rows={4} />
  </Grid>
</Grid>
<Box mt={2}>
 <Typography>Skills*</Typography>  
 <Box display={"flex"} >
    {skills.map(skill =><Box onClick={() => addRemoveSkill(skill)}  className={`skil ${jobDetails.skills.includes(skill) && 'included'}`}  key={skill}>{skill}</Box>)}
    </Box> 
</Box>



</DialogContent>
<DialogActions>
    <Box 
    color={"red"} 
    width={"100%"} 
    display={"flex"} 
    justifyContent={"space-between"}
    alignItems={"center"}>
        <Typography>*Required fields</Typography>
        <Button 
        onClick={handleSubmit} 
        variant="contained" 
        disableElevation >
          {loading?(
          <CircularProgress />
          ):(  "Post Job" )}
        
         
        </Button>
    </Box>
</DialogActions>

</Dialog>





)

    
}