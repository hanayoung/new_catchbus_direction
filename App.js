import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './navigations/StackNavigation';
import { StationProvider } from './src/context/Station'; 


const App = () => {

    return (
        <StationProvider>
        <NavigationContainer>
            <StackNavigation/>
        </NavigationContainer>
        </StationProvider>
    )
}

export default App;
