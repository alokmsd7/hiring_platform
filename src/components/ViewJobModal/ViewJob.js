import React,{useState} from "react";
import "./viewJobs.css"; 
import {Box,CircularProgress,
    Grid,MuiFilledInput,Select,MenuItem,Dialog,DialogTitle,MuiDialogActions, DialogContent, FilledInput , Typography,Button, DialogActions,IconButton} from '@mui/material'
import {format} from 'date-fns'
export default (props)=>{
    return(
        <Dialog open={!!Object.keys(props.job).length} fullWidth>
<DialogTitle>
  <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
 {props.job.title} At {props.job.companyName}  <IconButton onClick={props.closeModal} >
    ✕
        </IconButton>
    </Box>
    </DialogTitle>
    <DialogContent>
<Box>
    <Box className={"info"} display={"flex"}>
<Typography variant="caption">Posted on: </Typography>
<Typography variant="body2">{props.job.postedOn && format(props.job.postedOn,"dd/MMM/yyyy HH:MM")}</Typography>
</Box>
</Box>
<Box>
    <Box className={"info"} display={"flex"}>
<Typography variant="caption">Job Type: </Typography>
<Typography variant="body2">{props.job.type}</Typography>
</Box>
</Box>
<Box>
    <Box className={"info"} display={"flex"}>
<Typography variant="caption">Job description: </Typography>
<Typography variant="body2">{props.job.description}</Typography>
</Box>
</Box>
<Box>
    <Box className={"info"} display={"flex"}>
<Typography variant="caption">Company Name: </Typography>
<Typography variant="body2">{props.job.companyName}</Typography>
</Box>
</Box>
<Box>
    <Box className={"info"} display={"flex"}>
<Typography variant="caption">Company Website: </Typography>
<Typography variant="body2">{props.job.CompanyUrl}</Typography>
</Box>
</Box>


<Box>
    <Box className={"info"} ml={0.5} display={"flex"}>
        <Typography variant="caption">Skills: </Typography>
        <Grid container alignItems={"center"}>
            {props.job.skills &&
            props.job.skills.map((skill) => (
                <Grid item key={skill} className="skill">
                    {skill}
                </Grid>
            ))}
        </Grid>
    </Box>
</Box>



    </DialogContent>
    <DialogActions>
        <Button variant="outlined" component="a" href={props.job.link} target="_blank">Apply</Button>
    </DialogActions>

        </Dialog>
)
    }
    