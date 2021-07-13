// Importing essential libraries
import React, { useContext, useEffect, useState } from 'react';
import { Container, makeStyles, Paper, Grid, TextField} from '@material-ui/core';
import { SocketContext } from '../SocketContext';
import cred from '../cred';

// styles
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

const ChatBox = () => {
    // declaring essemtial variables and importing few from SocketContext
    const [message, setMessage] = useState(0);
    const {name} = useContext(SocketContext);
    const classes = useStyles();
    const [Messages,setMessages] = useState([]);
    const {callAccepted,idToCall,me} = useContext(SocketContext);

    // useEffect to locally store the messages belonging to a particular ID from firebase database
    useEffect(()=>{
        if(idToCall !== ""){
            const messagesRef = cred.database().ref('chats').child(idToCall||me).child("messages");
            messagesRef.on('value',(snapshot)=>{
                const Messages_ = snapshot.val();
                const messages_ = [];
                for(let idx in Messages_){
                    messages_.push(Messages_[idx]);
                }
                if(Messages_ !== null){
                    setMessages(messages_);
                }                
            });

        }
    },[callAccepted, idToCall, me]);

    // function to send a message 
    const sendMsg = (e) => {
        e.preventDefault();
        const date = new Date();
        const [hours, minutes] = [date.getHours(), date.getMinutes()];
        const chat = {name, message, hours, minutes};
        const messagesRef = cred.database().ref('chats').child(idToCall||me).child("messages");
        // pushing a new message into messagesRef
        messagesRef.push(chat);
        document.getElementById("Messageform").reset();
    }
    return (
        <div className="chatbox">
        {/* when call is ongoing */}
        {/* {callAccepted && !callEnded && ( */}
        <Container className={classes.container}>
            <Paper elevation={10} className={classes.paper}>
                {/* form to send messages */}
                <form className={classes.root} id= "Messageform" noValidate onSubmit={sendMsg} autoComplete="off">
                <ul>
                    {Messages.map(function(message) {
                    return (
                        // to show chat conversation
                        <div className="chats">
                            <li style={{ color: 'white' }} key={message}><h3 style={{ color: 'black' }}>{message.name}</h3><br/> <p style={{ color: 'black' }}>{message.message}</p> 
                            <p style={{ color: 'black',float:'right' }}>{message.hours < 10 ? 0 : ""}{message.hours}:{message.minutes < 10 ? 0 : ""}{message.minutes}</p></li>
                        </div>    
                    );
                    })}
                </ul>
                {/* textfield to type a message to send */}
                    <Grid container className={classes.gridContainer}>
                        <Grid item xs={12} md={6} className={classes.padding}>
                            <TextField label="Message" onChange={(e)=>setMessage(e.target.value)} fullWidth></TextField>
                        </Grid>
                        {/*  button to send message on clicking */}
                        <Grid item xs={12} md={6} className={classes.padding}>
                            <button variant="contained" color="primary" fullWidth className={classes.margin}>
                                Send
                            </button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>  
        </Container>
             {/* )} */}
            </div>
    
    );
};
 
export default ChatBox;