import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import List from '../screens/List';
import Main from '../screens/Main';
import Item from '../screens/Item';
import Settings from '../screens/Settings';

const Stack = createStackNavigator();

const StackNavigation = () => {
    return (
        <Stack.Navigator initialRouteName = "Home">
            <Stack.Screen name = "Main" component = {Main}/>
            <Stack.Screen name = "List" component = {List}/> 
            <Stack.Screen name = "Item" component = {Item}/>
            <Stack.Screen name = "Settings" component = {Settings}/>
        </Stack.Navigator>
    )
}

export default StackNavigation;