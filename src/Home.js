// import firebase from "firebase";
// import { PinDropSharp } from '@material-ui/icons';
import {useContext, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {srcContext} from './srcContext';

const Home = (props) => {
    // const firebaseApp = firebase.apps[0];
    const {Name,setIsHome,setIsSignin,setIsSignup} = useContext(srcContext);
    useEffect(()=>{
        setIsHome(true);
        setIsSignin(false);
        setIsSignup(false);
    });
    const startMeeting=(()=>{
        props.history.push("/Meeting");
    });
    return ( 

        <div className="home">
            <h1>Hi {Name}, Welcome to Speak-a-boo Home Page</h1>
            {/* <h2>About Speak-a-boo</h2> */}
            <br/>
            <h4>Connect with anyONE of your friends with video and audio. 
                <br />
                Available for everyone and bringing you both closer:D
            </h4>
            <br />
            <button href='/Meeting' style={{
                    color:"white",
                    fontSize:'25px',
                    backgroundColor:'#f1356d',
                    // borderRadius:'16px'
                    textDecorationLine:"none"    
                }} onClick = {startMeeting}>Start Instant call</button>
            {/* <code>
                <pre>{JSON.stringify(firebaseApp.options, null, 2)}</pre>
            </code> */}
            
        </div>
     );
}
 
export default withRouter(Home);