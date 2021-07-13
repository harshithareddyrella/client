// importing essential libraries
import React, {createContext, useState, useRef, useEffect} from 'react';
import {io} from 'socket.io-client';
import Peer from 'simple-peer';
import cred from './cred';

const SocketContext = createContext();

// storing server
// const socket = io('http://localhost:8000');
const socket = io('https://engage-server.herokuapp.com/');

const ContextProvider = ({children}) =>{ 
    // defining necessary variables  
    const [stream,setStream] = useState();
    const [me,setMe] = useState('');
    const [call,setCall] = useState({});
    const [callAccepted,setCallAccepted]=useState(false);
    const [callEnded,setCallEnded] = useState(false);
    const [name,setname] = useState('');
    const [isAudio,setIsAudio] = useState(true);
    const [isVideo,setIsVideo] = useState(true);
    const [idToCall,setIdToCall]=useState('');
    const [isCalling,setIsCalling] = useState(false);

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    // useEffect 
    useEffect(()=>{
        // to set the user's stream
        navigator.mediaDevices.getUserMedia({video:true,audio:true})
            .then((currentStream)=>{
                setStream(currentStream);
                myVideo.current.srcObject = currentStream;
            });
        // set user's ID
        socket.on('me',(id)=>{
            setMe(id)});
        
        // set call details 
        socket.on('callUser',({from,name:callerName,signal})=>{
            setCall({isReceivingCall:true,from,name:callerName,signal});
        });

    },[]);

    // function to handle call answer
    const answerCall=()=>{
        setCallAccepted(true);
        setIdToCall(me);
        // creating a reference in firebase database
        const chatsRef = cred.database().ref('chats');
        const chat = {messages:[]};
        chatsRef.child(me).set(chat);

        // create peer-peer connection to watch both streams
        const peer = new Peer({initiator:false,trickle:false,stream});
        peer.on('signal',(data)=>{
            socket.emit('answerCall',{signal:data,to:call.from});
        });
        peer.on('stream',(currentStream)=>{
            userVideo.current.srcObject = currentStream;
        });
        peer.signal(call.signal);

        connectionRef.current = peer;
    };

    // function to call a user with a ID
    const callUser =(id) =>{
        setIsCalling(true);
        // setIdToCall(id);

        // creating peer-peer connection
        const peer = new Peer({initiator:true,trickle:false,stream});
        peer.on('signal',(data)=>{
            socket.emit('callUser',{userToCall:id, signalData:data,from:me,name});
        });
        peer.on('stream',(currentStream)=>{
            userVideo.current.srcObject = currentStream;
        });

        socket.on('callAccepted',(signal)=>{
            setCallAccepted(true);

            peer.signal(signal);
        });
        connectionRef.current = peer;

    };

    // function to leave a call
    const leaveCall = () =>{
        // set call ended as true
        setCallEnded(true);
        // destroy peer-peer connection
        connectionRef.current.destroy();
        // reload page
        window.location.reload();
    }
    // function to mute audio
    const muteAudio = () =>{
        // invert the state of a user's audio
        stream.getAudioTracks()[0].enabled = !isAudio;
        setIsAudio(!isAudio);
    }

    // function to off video
    const muteVideo = () =>{
        // invert the state of a user's video
        stream.getVideoTracks()[0].enabled = !isVideo;
        setIsVideo(!isVideo);
        
    }
    return(
        // variables that can be used in children
        <SocketContext.Provider value={{
            call,
            callAccepted,
            myVideo,
            userVideo,
            stream,
            name,
            setname,
            callEnded,
            me,
            callUser,
            leaveCall,
            answerCall,
            muteAudio,
            muteVideo,
            isAudio,
            isVideo,
            idToCall,
            setIdToCall,
            isCalling,
            setIsCalling,
        }}
        >
            {children}
        </SocketContext.Provider>
    );
};

export{ContextProvider,SocketContext};
