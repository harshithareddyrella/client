// Import essential libraries
import React , {useState,createContext} from 'react';

// creating srcContext
const srcContext = createContext();

const SrcContextProvider = ({children}) =>{
    // declaring necessary variables
    const [isSignedin,setIsSignedin] = useState(false);
    const [isSignedup,setIsSignedup] = useState(false);
    const [Name,setName] = useState('');
    const [isHome,setIsHome] = useState(false);
    const [isSignin,setIsSignin] = useState(false);
    const [isSignup,setIsSignup] = useState(false);

    return(
        // variables that can be used by its children
        <srcContext.Provider value={{isSignedin,
        setIsSignedin,
        isSignedup,
        setIsSignedup,
        Name,
        setName,
        isHome,setIsHome,
        isSignin,setIsSignin,
        isSignup,setIsSignup,
    }}>
            {children}
        </srcContext.Provider>
    );
};

export{SrcContextProvider,srcContext};