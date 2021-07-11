import React, { useContext, useEffect, useState } from 'react';
import { Container, makeStyles, Paper, Grid, TextField} from '@material-ui/core';
import { SocketContext } from '../SocketContext';
import cred from '../cred';

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
    const [message, setMessage] = useState(0);
    const {name} = useContext(SocketContext);
    // // console.log(call.isReceivingCall);
    const classes = useStyles();
    const [Messages,setMessages] = useState([]);
    const {callAccepted,callEnded,idToCall} = useContext(SocketContext);

    useEffect(()=>{
        if(idToCall !== ""){
            const messagesRef = cred.database().ref('chats').child(idToCall).child("messages");
            messagesRef.on('value',(snapshot)=>{
                const Messages_ = snapshot.val();
                const messages_ = [];
                // var obj = JSON.parse(Messages_);
                // console.log(obj);
                // var values = Object.keys(obj).map(function (key) { return obj[key]; });
                // console.log(values);
                for(let idx in Messages_){
                    messages_.push(Messages_[idx]);
                }
                console.log(messages_);
                if(Messages_ !== null){
                    setMessages(messages_);
                }                
            });

        }
    },[idToCall]);

    const setMsg = (msg) => {
        // console.log(msg);
        setMessage(msg);
    }

    const sendMsg = (e) => {
        e.preventDefault();
        const date = new Date();
        const [hours, minutes] = [date.getHours(), date.getMinutes()];
        // console.log(name, message, hours, minutes);
        const chat = {name, message, hours, minutes};
        const messagesRef = cred.database().ref('chats').child(idToCall).child("messages");
        messagesRef.push(chat);
        document.getElementById("Messageform").reset();
    }
    return (
        <div className="chatbox">
            {callAccepted && !callEnded && (
        <Container className={classes.container}>
            <Paper elevation={10} className={classes.paper}>
                <form className={classes.root} id= "Messageform" noValidate onSubmit={sendMsg} autoComplete="off">
                <ul>
                    {Messages.map(function(message) {
                    return (
                        <li style={{ color: 'black' }} key={message}>{message.name} {message.message} {message.hours < 10 ? 0 : ""}{message.hours}:{message.minutes < 10 ? 0 : ""}{message.minutes}</li>
                    );
                    })}
                </ul>
                    <Grid container className={classes.gridContainer}>
                        <Grid item xs={12} md={6} className={classes.padding}>
                            {/* <Typography gutterBottom variant="h6">Account Info</Typography> */}
                            <TextField label="Message" onChange={(e)=>setMsg(e.target.value)} fullWidth></TextField>
                            {/* {console.log(me)} */}
                            {/* <CopyToClipboard text={me} className={classes.margin}>
                                <Button variant="contained" color="primary" fullWidth startIcon ={<Assignment fontSize="large"/>}>
                                    Copy this id and share with friends
                                </Button>
                            </CopyToClipboard> */}
                        </Grid>
                        <Grid item xs={12} md={6} className={classes.padding}>
                            {/* <Typography gutterBottom variant="h6">Make a call</Typography> */}
                            {/* <TextField label="ID to call" value={idToCall} onChange={(e)=>setIdToCall(e.target.value)} fullWidth/> */}
                            {/* {callAccepted && !callEnded && (
                                // <Button variant="contained" color="secondary" startIcon={<PhoneDisabled fontSize="large" />} fullWidth onClick={leaveCall} className={classes.margin}>
                                //     Hang Up
                                // </Button>
                                // ) : (
                                // <Button variant="contained" color="primary" startIcon={<Phone fontSize="large" />} fullWidth onClick={() => callUser(idToCall)} className={classes.margin}>
                                //     Call
                                // </Button>
                                <Button variant="contained" color="primary" fullWidth onClick={() => sendMsg()} className={classes.margin}>
                                Send
                            </Button>
                            )} */}
                            <button variant="contained" color="primary" fullWidth className={classes.margin}>
                                Send
                            </button>
                        </Grid>
                        

                    </Grid>
                </form>
            </Paper>
           
           
        </Container>
             )}
            </div>
    
    );
};
 
export default ChatBox;