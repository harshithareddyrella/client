import React , {useState,createContext} from 'react';
// import {SocketContext} from './SocketContext';
const srcContext = createContext();

const SrcContextProvider = ({children}) =>{
    const [isSignedin,setIsSignedin] = useState(false);
    const [isSignedup,setIsSignedup] = useState(false);
    const [Name,setName] = useState('');
    const [isHome,setIsHome] = useState(true);
    const [isSignin,setIsSignin] = useState(false);
    const [isSignup,setIsSignup] = useState(false);
    // const {name,setname} = useContext(SocketContext);

    return(
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