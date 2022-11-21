import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './navigations/StackNavigation';
import { StationProvider } from './src/context/Station'; 
import { BusProvider } from './src/context/Bus';
import Notification from './modules/Notification'

const App = () => {

    return (
        <StationProvider>
        <BusProvider>
        <NavigationContainer>
            <StackNavigation/>
            <Notification/>
        </NavigationContainer>
        </BusProvider>
        </StationProvider>
    )
}

export default App;
