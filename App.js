import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './navigations/StackNavigation';
import { StationProvider } from './src/context/Station'; 
import { BusProvider } from './src/context/Bus';
import { AlertProvider } from './src/context/Alert';
import Notification from './modules/Notification'

const App = () => {

    return (
        <StationProvider>
        <BusProvider>
        <AlertProvider>
        <NavigationContainer>
            <StackNavigation/>
            <Notification/>
        </NavigationContainer>
        </AlertProvider>
        </BusProvider>
        </StationProvider>
    )
}

export default App;
