import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import './JobCard.css'
import { differenceInMinutes } from 'date-fns'

const MyComponent = (props) => {
  return (
    <Box p={2} className="Wrapper">
      <Grid container alignItems={"center"}>
        
        <Grid item xs>
          <Typography variant="subtitle1">{props.title}</Typography>
          <Typography className="company" variant="subtitle1">{props.companyName}</Typography>
        </Grid>
        <Grid item xs display={"flex"}>
          {props.skills && props.skills.map((skill) => (
            <Grid key={skill} className="skill" m={1} item>
              {skill}
            </Grid>
          ))}
        </Grid>
        <Grid item container direction={"column"}  xs>
<Grid item>
<Typography variant="caption">
  {differenceInMinutes(Date.now(), props.postedOn) ?? 'N/A'} min ago | {props.type ?? 'N/A'} | {props.location ?? 'N/A'}
</Typography>

</Grid>
<Grid item>
    <Box mt={2}>
    <Button onClick={props.open} variant="outlined">Check</Button>
    </Box>
</Grid>
</Grid>
      </Grid>
    </Box>
  );
};

export default MyComponent;
