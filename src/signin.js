import {useState,useEffect,useContext} from "react";
import {withRouter} from 'react-router-dom';
import cred from './cred';
import { srcContext } from "./srcContext";

const Signin = (props) => {  
    const [Users,setUsers] = useState('');
    const {isSignedin,setIsSignedin,setIsSignedup,setName,setIsHome,setIsSignin,setIsSignup} = useContext(srcContext); 
    var found = false;
    useEffect(()=>{
        setIsHome(false);
        setIsSignin(true);
        setIsSignup(false);
    });
    useEffect(()=>{
        // console.log(Name);
        if(isSignedin===true){
            props.history.push("/");   
             
        }    
    },[isSignedin,props]);

    useEffect(()=>{     
        const userRef = cred.database().ref('users');
        userRef.on('value',(snapshot)=>{
            const Users_ = snapshot.val();
            let users = [];
            for(let id in Users_){
                users.push(Users_[id]);
            }
            // console.log(users);
            setUsers(users);
            
        });

    },[]);
    
    const [Username,setUsername] = useState('');
    const [Password,setPassword] = useState('');
    const [error,setError] = useState('');

    const handleSignin = (e) => {
        e.preventDefault();
        for (let index = 0; index < Users.length; index++) {
            const element = Users[index];
            if(element.Username===Username){
                if(element.Password===Password){
                    
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
        if(found===false){
            setError("invalid");

        }
        
        
    }
    
    return (
        <div className="signin">
        
        <h2>Sign in</h2>
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