// Importing essential libraries
import React, { useContext } from 'react';
import { Grid, Typography, Paper, makeStyles } from '@material-ui/core';
import { SocketContext } from '../SocketContext';

// VideoPlayer Styles
const useStyles = makeStyles((theme) => ({
  video: {
    [theme.breakpoints.down('xs')]: {
      width: '300px',
    },
  },
  userVideo:{
    [theme.breakpoints.down('xs')]: {
      width: '300px',
    },

  },
  gridContainer: {
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  paper: {
    padding: '10px',
    border: '2px solid black',
    margin: '10px',
  },
}));



const VideoPlayer = () => {
  // importing variables from SocketContext
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);
  const classes = useStyles();

  return (
    // Video grid for the caller
    <Grid container className={classes.gridContainer}>
      {stream && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography style={{color: 'black'}} variant="h5" gutterBottom>{name || 'Name'}</Typography>
            <video playsInline muted ref={myVideo} autoPlay className={classes.video} />
          </Grid>
        </Paper>
      )}
      {/*  Video grid for the reciever when the call starts */}
      {callAccepted && !callEnded && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography style={{color: 'black'}} variant="h5" gutterBottom>{call.name || 'Name'}</Typography>
            <video playsInline ref={userVideo} autoPlay className={classes.userVideo} />
          </Grid>
        </Paper>
      )}
    </Grid>
  );
};

export default VideoPlayer;