import React from 'react';
import { Typography, AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Call from './Call';
import VideoPlayer from './components/VideoPlayer';

import ChatBox from './components/ChatBox';
import { ContextProvider } from './SocketContext';


const useStyles = makeStyles((theme)=>({
    appBar: {
        borderRadius: 15,
        margin: '30px 100px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '600px',
        border: '2px solid black',
        color: "black",
    
        [theme.breakpoints.down('xs')]: {
          width: '90%',
        },
      },
    image: {
        marginLeft: '15px',
      },
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      },

}));

const Meeting = () =>{
    const classes = useStyles();
    return(
      <ContextProvider>
          <div className={classes.wrapper}>
            <AppBar className={classes.appBar} position = "static">
                <Typography variant="h2" align="center">Video Chat</Typography>
            </AppBar>
            <VideoPlayer/>
            <ChatBox/>
            <Call/>
        </div>
      </ContextProvider>
        
    );
};

export default Meeting;