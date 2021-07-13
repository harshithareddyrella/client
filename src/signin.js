// Importing essential libraries
import {useState,useEffect,useContext} from "react";
import {withRouter} from 'react-router-dom';
import cred from './cred';
import { srcContext } from "./srcContext";

const Signin = (props) => { 
    // using variables from srcContext and declaring 
    const [Users,setUsers] = useState('');
    const {isSignedin,setIsSignedin,setIsSignedup,setName,setIsHome,setIsSignin,setIsSignup} = useContext(srcContext); 
    var found = false;

    // useEffect to set the position of the user
    useEffect(()=>{
        setIsHome(false);
        setIsSignin(true);
        setIsSignup(false);
    });
    //  useEffect to redirect after signing in
    useEffect(()=>{
        if(isSignedin===true){
            props.history.push("/");   
             
        }    
    },[isSignedin,props]);

    // useEffect to get the users data and str=oring locally from firebase database
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
    
    //  variables to store user data
    const [Username,setUsername] = useState('');
    const [Password,setPassword] = useState('');
    const [error,setError] = useState('');

    // function to be executed after signin
    const handleSignin = (e) => {
        e.preventDefault();
        // checking if the data provided from the user is correct
        for (let index = 0; index < Users.length; index++) {
            const element = Users[index];
            if(element.Username===Username){
                if(element.Password===Password){
                    // if the provided data is correct, user getes signed in 
                    setError("success");
                    found = true;
                    setIsSignedin(true);
                    setIsSignedup(true);
                    setName(element.Name);
                    
                    break;
                }
                else{
                    break;
                }
            }
            
        }
        // else error message pops 
        if(found===false){
            setError("invalid");

        }
        
        
    }
    
    return (       
        <div className="signin">
        <h2>Sign in</h2>
        {/* //  form for the user to fill in data */}
        <form onSubmit = {handleSignin}>
            <label>Username:</label>
            <input
                type="text"
                required
                onChange={(e)=>setUsername(e.target.value)}
            />
            <label>Password:</label>
            <input
                type="password"
                required
                onChange={(e)=>setPassword(e.target.value)}
            />
            {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
            {/* button to signin on clicking */}
            <button>Sign in</button>
        </form>
        <br/>
        <h4 className="change">Not a user? 
            <a href="/signup">Sign up</a>
        </h4>
    </div>        
     );
}
 
export default withRouter(Signin);