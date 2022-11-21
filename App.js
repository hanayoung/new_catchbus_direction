import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './navigations/StackNavigation';
import { StationProvider } from './src/context/Station';
import { BusProvider } from './src/context/Bus';
import Notification from './modules/Notification'
import { TrainProvider } from './src/context/Train';

const App = () => {

    return (
        <StationProvider>
            <BusProvider>
                <TrainProvider>
                    <NavigationContainer>
                        <StackNavigation />
                        <Notification />
                    </NavigationContainer>
                </TrainProvider>
            </BusProvider>
        </StationProvider>
    )
}

export default App;
