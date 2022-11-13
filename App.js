import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './navigations/StackNavigation';
import { StationProvider } from './src/context/Station'; 
import { BusProvider } from './src/context/Bus';

const App = () => {

    return (
        <StationProvider>
        <BusProvider>
        <NavigationContainer>
            <StackNavigation/>
        </NavigationContainer>
        </BusProvider>
        </StationProvider>
    )
}

export default App;
