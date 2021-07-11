import {useContext,useEffect} from "react";
import { srcContext } from "./srcContext";

const Navbar = (props) => {
    const {isSignedin,isSignedup, isHome, isSignin, isSignup} = useContext(srcContext);

    useEffect(()=>{
        
        if(isHome){
            document.getElementById("home").classList.add("active");
            if(!isSignedin){
                document.getElementById("signin").classList.remove("active");
                document.getElementById("signup").classList.remove("active");
            }
        }
        if(isSignin){
            document.getElementById("home").classList.remove("active");
            if(!isSignedin){
                document.getElementById("signin").classList.add("active");
                document.getElementById("signup").classList.remove("active");
            }
            
        }
        if(isSignup){
            document.getElementById("home").classList.remove("active");
            if(!isSignedin){
                document.getElementById("signin").classList.remove("active");
                document.getElementById("signup").classList.add("active");
            }
        }
    })
    
    return (
         
            <nav className="navbar">
                <h1>Speak-a-boo</h1>
                <div className="links">
                    <a href="/" id="home">Home</a>
                    {isSignedin && <a href="/" >Sign out</a>}
                    {!isSignedin && <a href="/signin" id="signin">Sign In</a>}
                    {!isSignedup && <a href="/signup" id="signup">Sign up</a>}
                    
                </div>
            </nav>
        
     );
}
 

export default Navbar;