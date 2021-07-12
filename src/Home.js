// Importing essential libraries
import {useContext, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {srcContext} from './srcContext';

const Home = (props) => {
    // using variables from srcContext
    const {Name,setIsHome,setIsSignin,setIsSignup} = useContext(srcContext);

    // useEffect to set the position of the user
    useEffect(()=>{
        setIsHome(true);
        setIsSignin(false);
        setIsSignup(false);
    });
    // function to start meeting
    const startMeeting=(()=>{
        setIsHome(false);
        props.history.push("/Meeting");
    });

    return ( 
        // text to be shown in home page
        <div className="home">
            <h1>Hi {Name}, Welcome to Speak-a-boo Home Page</h1>
            <br/>
            <h4>Connect with anyONE of your friends with video and audio. 
                <br />
                Available for everyone and bringing you both closer:D
            </h4>
            <br />
            {/* button to go to meeting page on clicking */}
            <button onClick = {startMeeting}>Start Instant Meeting</button>            
        </div>
     );
}
 
export default withRouter(Home);