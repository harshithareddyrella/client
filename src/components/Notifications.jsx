// Importing essential libraries
import React,{useContext} from 'react';
import {Button} from '@material-ui/core';
import {SocketContext} from '../SocketContext';

const Notifications = () => {
    // importing variables from SocketContext
    const { answerCall, call, callAccepted,isCalling} = useContext(SocketContext);
    return ( 
        <>
        {/* Notification while calling a user */}
        {isCalling && !callAccepted && <h1 style={{color: 'black', textAlign:'center'}}>calling...</h1>}
        {/* Notification when a user recieves a call */}
        {call.isReceivingCall && !callAccepted && (
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            
            <h1 style={{color: 'black'}}>{call.name} is calling:</h1>
            {/* button to answer the call */}
            <Button variant="contained" color="primary" onClick={answerCall}>
                Answer
            </Button>
        </div>
        )}       
    </>  
    );
};
 
export default Notifications;