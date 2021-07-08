import React,{useContext} from 'react';
import {Button} from '@material-ui/core';

import {SocketContext} from '../SocketContext';

const Notifications = () => {
    const { answerCall, call, callAccepted} = useContext(SocketContext);
    // console.log(call.isReceivingCall);
    return ( 
        <>
        
        {/* <div>
            Notification
        </div> */}
        
        {call.isReceivingCall && !callAccepted && (
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <h1 style={{color: 'black'}}>{call.name} is calling:</h1>
            <Button variant="contained" color="primary" onClick={answerCall}>
                Answer
            </Button>
        </div>
        )}
        
    </>
    
    );
};
 
export default Notifications;