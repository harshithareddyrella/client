import {useContext} from "react";
import { srcContext } from "./srcContext";

const Navbar = (props) => {
    const {isSignedin,isSignedup} = useContext(srcContext);
    
    return (
         
            <nav className="navbar">
                <h1>Getting started</h1>
                <div className="links">
                    {isSignedin && <a href="/">Sign out</a>}
                    {!isSignedin && <a href="/signin">Sign In</a>}
                    {!isSignedup && <a href="/signup" style={{
                            color:"white",
                            backgroundColor:'#f1356d',
                            borderRadius:'8px'
                        }}>Sign up</a>}
                    
                </div>
            </nav>
        
     );
}
 

export default Navbar;