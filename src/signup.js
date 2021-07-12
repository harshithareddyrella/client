//  Importing essential libraries
import { useState,useEffect,useContext} from "react";
import { withRouter} from 'react-router-dom';
import cred from './cred';
import { srcContext } from "./srcContext";

const Signup = (props) => {
    // declaring variables
    const [Username,setUsername] = useState('');
    const [Password,setPassword] = useState('');
    const [error,setError] = useState('');
    let valid = true;
    const [Users,setUsers] = useState('');
    // using SocketContect variables
    const {setIsSignedup,setIsSignedin,Name,setName,setIsHome,setIsSignin,setIsSignup} = useContext(srcContext);

    // useEffect to set the position of the user
    useEffect(()=>{
        setIsHome(false);
        setIsSignin(false);
        setIsSignup(true);
    });
    
    // useEfeect to locally store users data from firebase database
    useEffect(()=>{
        const userRef = cred.database().ref('users');
        userRef.on('value',(snapshot)=>{
            const Users_ = snapshot.val();
            let users = [];
            for(let id in Users_){
                users.push(Users_[id]);
            }
            setUsers(users);
        });
    },[]);

    // function to be executed after requesting signup
    const handleSignup = (e) => {
        e.preventDefault();
        const User = {Name,Username,Password};
        // check if the username already exists in the data
        for (let index = 0; index < Users.length; index++) {
            const element = Users[index];
            if(element.Username===Username){
                // set error message if username is not available
                setError("Username exists. Try other one");
                valid = false;
                break;
            }    
        }
        // if valid user data
        if(valid===true){
            // add this data to firebase users database
            let userRef = cred.database().ref('users');
            userRef.push(User);
            // redirect to home page
            props.history.push("/");
            setIsSignedup(true);
            setIsSignedin(true);
            setName(User.Name);
        }    
    }

    return ( 
        <div className="signup">
            <h2>Sign up</h2>
            {/* form for the user to fill in data */}
            <form onSubmit={handleSignup}>
                <label>Name:</label>
                <input
                    type="text"
                    required
                    value = {Name}
                    onChange = {(e)=>setName(e.target.value)}
                />
                <label>Username:</label>
                <input
                    type="text"
                    required
                    value = {Username}
                    onChange = {(e)=>setUsername(e.target.value)}
                />
                <label>Password:</label>
                <input
                    type="password"
                    required
                    value = {Password}
                    onChange = {(e)=>setPassword(e.target.value)}
                />
                {/* show error message if there is error */}
                {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
                <button>Sign up</button>
            </form>
            <br/>
            <h4 className="change">Already a user?  
                <a href="/signin">Sign in</a>
            </h4>
        </div>
     );
}

 
export default withRouter(Signup);