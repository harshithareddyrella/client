import React from 'react';
import Notifications from './components/Notifications';
import Options from './components/Options';
import { SrcContextProvider } from './srcContext';

const Call = () => {
    return (
        <SrcContextProvider>
            <Options>
                <Notifications/>
            </Options>
        </SrcContextProvider>
     );
}
 
export default Call;
