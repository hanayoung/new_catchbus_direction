import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FavList from '../screens/FavList';
import SearchStation from '../screens/SearchStation';
import SearchBus from '../screens/SearchBus';
import BusRoute from '../screens/BusRoute';
import AjouList from '../screens/AjouList';
import BusList from '../modules/BusList';
import History from '../screens/History';

import Icon from 'react-native-vector-icons/AntDesign';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const SearchStack = ({ navigation, item, setItem, storage, setStorage }) => {
    return (
        <Stack.Navigator initialRouteName="SearchStation" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SearchStation">
                {({ navigation }) => <SearchStation navigation={navigation} item={item} setItem={setItem} storage={storage} setStorage={setStorage} />}
            </Stack.Screen>
            <Stack.Screen name="SearchBus">
                {({ navigation }) => <SearchBus storage={storage} setStorage={setStorage} navigation={navigation} item={item} />}
            </Stack.Screen>
            <Stack.Screen name = "BusList" component = {BusList}/>
            <Stack.Screen name = "BusRoute" component = {BusRoute}/>
        </Stack.Navigator>
    )
}

const SettingStack = ({ navigation }) => {
    return (
        <Stack.Navigator initialRouteName="History" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="History" component={History} />
        </Stack.Navigator>
    )
}


const TabNavigation = () => {
    const [isReady, setIsReady] = useState(false);
    const [storage, setStorage] = useState([]);
    const [item, setItem] = useState([]);
    const [choice, setChoice] = useState({});

    const _loadResult = async () => {
        const loadedResult = await AsyncStorage.getItem('results');
        setStorage(JSON.parse(loadedResult));
    };


    return isReady ? (
        <Tab.Navigator initialRouteName='Main'
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'Search') {
                iconName = 'search1';
                return <Icon name={iconName} size={size}  color={color}/>;
              } else if (route.name === 'FavList'){
                iconName = focused ? 'star' : 'staro';
                return <Icon name={iconName} size={size}  color={color}/>;
              } else if (route.name === 'BusRoute'){
                iconName = 'route';
                return <FontIcon name={iconName} size={size}  color={color}/>;
              } else if (route.name === 'AjouList'){
                iconName = 'bus';
                return <FontIcon name={iconName} size={size}  color={color}/>;
              } else if (route.name === 'Settings'){
                iconName = focused ? 'settings' : 'settings-outline';
                return <Ionicons name={iconName} size={size}  color={color}/>;
              }
  
              // You can return any component that you like here!
              return <Icon name={iconName} size={size}  color={color}/>;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'black',
            inactiveTintColor: 'gray',
          }}>
            <Tab.Screen name="Search">
                {({ navigation }) => <SearchStack navigation={navigation} item={item} setItem={setItem} storage={storage} setStorage={setStorage} />}
            </Tab.Screen>
            <Tab.Screen name="FavList">
                {({ navigation }) => <FavList navigation={navigation} storage={storage} setStorage={setStorage} choice={choice} setChoice={setChoice} />}
            </Tab.Screen>
            <Tab.Screen name="BusRoute" component={BusRoute} />
            <Tab.Screen name="AjouList" component={AjouList} />
            <Tab.Screen name="Settings" component={SettingStack} />
        </Tab.Navigator>
    ) : (
        <AppLoading
            startAsync={_loadResult}
            onFinish={() => setIsReady(true)}
            onError={console.error}
        />
    )
}

export default TabNavigation;