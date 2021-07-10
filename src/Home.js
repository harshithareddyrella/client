// import firebase from "firebase";
// import { PinDropSharp } from '@material-ui/icons';
import {useContext} from 'react';
import {withRouter} from 'react-router-dom';
import {srcContext} from './srcContext';

const Home = (props) => {
    // const firebaseApp = firebase.apps[0];
    const {Name} = useContext(srcContext);
    const startMeeting=(()=>{
        props.history.push("/Meeting");
    });
    return ( 
        <div className="home">
            <h1>Hi {Name}, Welcome to MS teams Home Page</h1>
            <h2>About MS Teams</h2>
            <p>Connect with anyone with video and audio. 
                <br />
                Available for everyone and bringing you all closer:D
            </p>
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