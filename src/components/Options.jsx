import React,{useState,useContext,useEffect} from 'react'
import { Button,TextField,Grid,Typography, Container, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { Assignment, Phone, PhoneDisabled } from '@material-ui/icons';
import { srcContext } from '../srcContext';
import {SocketContext} from '../SocketContext';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    gridContainer: {
      width: '100%',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
      },
    },
    container: {
      width: '600px',
      margin: '35px 0',
      padding: 0,
      [theme.breakpoints.down('xs')]: {
        width: '80%',
      },
    },
    margin: {
      marginTop: 20,
    },
    padding: {
      padding: 20,
    },
    paper: {
      padding: '10px 20px',
      border: '2px solid black',
    },
   }));

const Options = ({children}) => {
    const {me,callAccepted,name,setname,callEnded,leaveCall,callUser,muteAudio,muteVideo,isAudio,isVideo} = useContext(SocketContext);
    const {Name,isSignedin} = useContext(srcContext);
    // console.log(Name);
    const [idToCall,setIdToCall]=useState('');
    const classes = useStyles();
    useEffect(() => {
      // console.log(isSignedin);
      // console.log(Name);
      if(isSignedin===true){
        setname(Name);
      }
    }, [isSignedin,Name,setname]);

    return ( 
        <Container className={classes.container}>
            <Paper elevation={10} className={classes.paper}>
                <form className={classes.root} noValidate autoComplete="off">
                    <Grid container className={classes.gridContainer}>
                        <Grid item xs={12} md={6} className={classes.padding}>
                          {isAudio ? (
                                  <Button variant="contained" color="secondary" startIcon={<PhoneDisabled fontSize="large" />} fullWidth onClick={muteAudio} className={classes.margin}>
                                      Mute Audio
                                  </Button>
                                  ) : (
                                  <Button variant="contained" color="primary" startIcon={<Phone fontSize="large" />} fullWidth onClick={muteAudio} className={classes.margin}>
                                      Unmute Audio
                                  </Button>
                          )}
                            <Typography style={{color: 'black'}} gutterBottom variant="h6">Account Info</Typography>
                            {isSignedin ?(
                              <TextField label="Name" value={Name} fullWidth></TextField>
                            ):(
                              <TextField label="Name" value={name} onChange={(e)=>setname(e.target.value)} fullWidth></TextField>
                            )}
                            
                            {/* {console.log(me)} */}
                            <CopyToClipboard text={me} className={classes.margin}>
                                <Button variant="contained" color="primary" fullWidth startIcon ={<Assignment fontSize="large"/>}>
                                    Copy this id and share with friends
                                </Button>
                            </CopyToClipboard>
                        </Grid>
                        <Grid item xs={12} md={6} className={classes.padding}>
                          {isVideo ? (
                                    <Button variant="contained" color="secondary" startIcon={<PhoneDisabled fontSize="large" />} fullWidth onClick={muteVideo} className={classes.margin}>
                                        Turn off Video
                                    </Button>
                                    ) : (
                                    <Button variant="contained" color="primary" startIcon={<Phone fontSize="large" />} fullWidth onClick={muteVideo} className={classes.margin}>
                                        Turn on Video
                                    </Button>
                            )}
                            <Typography style={{color: 'black'}} gutterBottom variant="h6">Make a call</Typography>
                            <TextField label="ID to call" value={idToCall} onChange={(e)=>setIdToCall(e.target.value)} fullWidth/>
                            {callAccepted && !callEnded ? (
                                <Button variant="contained" color="secondary" startIcon={<PhoneDisabled fontSize="large" />} fullWidth onClick={leaveCall} className={classes.margin}>
                                    Hang Up
                                </Button>
                                ) : (
                                <Button variant="contained" color="primary" startIcon={<Phone fontSize="large" />} fullWidth onClick={() => callUser(idToCall)} className={classes.margin}>
                                    Call
                                </Button>
                        )}
                        </Grid>

                    </Grid>
                </form>
                {children}
            </Paper>
           
           
        </Container>
            
        
     );
};
 
export default Options ;