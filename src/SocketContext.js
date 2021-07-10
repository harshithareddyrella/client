import React, {createContext, useState, useRef, useEffect} from 'react';
import {io} from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();

// const socket = io('http://localhost:8000');
const socket = io('https://engage-videochat-app.herokuapp.com/');

const ContextProvider = ({children}) =>{   
    const [stream,setStream] = useState();
    const [me,setMe] = useState('');
    const [call,setCall] = useState({});
    const [callAccepted,setCallAccepted]=useState(false);
    const [callEnded,setCallEnded] = useState(false);
    const [name,setname] = useState('');
    const [isAudio,setIsAudio] = useState(true);
    const [isVideo,setIsVideo] = useState(true);

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    useEffect(()=>{
        navigator.mediaDevices.getUserMedia({video:true,audio:true})
            .then((currentStream)=>{
                setStream(currentStream);
                myVideo.current.srcObject = currentStream;
            });
        socket.on('me',(id)=>{
            // console.log(id);
            setMe(id)});

        socket.on('callUser',({from,name:callerName,signal})=>{
            // console.log("hi");
            setCall({isReceivingCall:true,from,name:callerName,signal});
        });

    },[]);
    const answerCall=()=>{
        setCallAccepted(true);
        const peer = new Peer({initiator:false,trickle:false,stream});
        peer.on('signal',(data)=>{
            // console.log(data);
            socket.emit('answerCall',{signal:data,to:call.from});
        });
        peer.on('stream',(currentStream)=>{
            userVideo.current.srcObject = currentStream;
        });
        peer.signal(call.signal);

        connectionRef.current = peer;
    };

    const callUser =(id) =>{
        // setCallAccepted(true);
        // console.log(id);
        const peer = new Peer({initiator:true,trickle:false,stream});
        peer.on('signal',(data)=>{
            // console.log(data);
            socket.emit('callUser',{userToCall:id, signalData:data,from:me,name});
        });
        peer.on('stream',(currentStream)=>{
            userVideo.current.srcObject = currentStream;
        });

        socket.on('callAccepted',(signal)=>{
            // console.log("hi");
            setCallAccepted(true);

            peer.signal(signal);
        });
        connectionRef.current = peer;

    };

    const leaveCall = () =>{
        setCallEnded(true);

        connectionRef.current.destroy();
        window.location.reload();

    }
    const muteAudio = () =>{
        stream.getAudioTracks()[0].enabled = !isAudio;
        // console.log(isAudio);
        setIsAudio(!isAudio);
        

    }
    const muteVideo = () =>{
        stream.getVideoTracks()[0].enabled = !isVideo;
        // console.log(isVideo);
        setIsVideo(!isVideo);
        // console.log(isVideo);
        
    }
    return(
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
        }}
        >
            {children}
        </SocketContext.Provider>
    );
};

export{ContextProvider,SocketContext};