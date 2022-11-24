import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './navigations/StackNavigation';
import { StationProvider } from './src/context/Station';
import { BusProvider } from './src/context/Bus';
import { AlertProvider } from './src/context/Alert';
import Notification from './modules/Notification'
import { TrainProvider } from './src/context/Train';

const App = () => {

    return (
        <StationProvider>
        <BusProvider>
        <AlertProvider>
        <TrainProvider>
        <NavigationContainer>
            <StackNavigation/>
            <Notification/>
        </NavigationContainer>
        </TrainProvider>
        </AlertProvider>
        </BusProvider>
        </StationProvider>
    )
}

export default App;
