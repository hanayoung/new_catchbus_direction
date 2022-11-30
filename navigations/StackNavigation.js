import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FavList from '../screens/FavList';
import SearchStation from '../screens/SearchStation';
import SearchBus from '../screens/SearchBus';
import BusRoute from '../screens/BusRoute';
import AjouList from '../screens/AjouList';
import BusList from '../modules/BusList';
import History from '../screens/History';
import TrainMain from '../screens/TrainMain';
import TrainOption from '../screens/TrainOption';
import Main from '../screens/Main';

import Icon from 'react-native-vector-icons/AntDesign';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const SearchStack = ({ navigation, storage, setStorage }) => {
  return (
    <Stack.Navigator initialRouteName="SearchStation" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SearchStation">
        {({ navigation }) => <SearchStation navigation={navigation} storage={storage} setStorage={setStorage} />}
      </Stack.Screen>
      <Stack.Screen name="SearchBus">
        {({ navigation }) => <SearchBus storage={storage} setStorage={setStorage} navigation={navigation} />}
      </Stack.Screen>
      <Stack.Screen name="BusList" component={BusList} />
      <Stack.Screen name="BusRoute" component={BusRoute} />
    </Stack.Navigator>
  )
}

const SettingStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="Setting" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Setting" component={Settings} />
      <Stack.Screen name="History" component={History} />
    </Stack.Navigator>
  )
}

const TrainStack = ({ navigation, trainsto, saveResult }) => {
  return(
    <Stack.Navigator initialRouteName="Train" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TrainMain" component={TrainMain} />
      <Stack.Screen name="TrainOption">
        {({ navigation }) => <TrainOption trainsto={trainsto} saveResult={saveResult} />}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

const TabNavigation = () => {
  const [isReady, setIsReady] = useState(false);
  const [storage, setStorage] = useState([]);
  const [item, setItem] = useState([]);
  const [choice, setChoice] = useState({});
  const [trainsto, setTrainsto] = useState([]);

  const _loadResult = async () => {
    const loadedResult = await AsyncStorage.getItem('results');
    setStorage(JSON.parse(loadedResult));
    const loadedTrain = await AsyncStorage.getItem('train');
    setTrainsto(JSON.parse(loadedTrain));
  };

  const saveResult = async result => {
    try {
      await AsyncStorage.setItem('train', JSON.stringify(result));
      setTrainsto(result);
    } catch (e) {
      console.error(e);
    }
  };

  return isReady ? (
    console.log("train", trainsto),
    <Tab.Navigator initialRouteName='Main'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Search') {
            iconName = 'search1';
            return <Icon name={iconName} size={size} color={color} />;
          } else if (route.name === 'FavList') {
            iconName = focused ? 'star' : 'staro';
            return <Icon name={iconName} size={size} color={color} />;
          } else if (route.name === 'BusRoute') {
            iconName = 'route';
            return <FontIcon name={iconName} size={size} color={color} />;
          } else if (route.name === 'AjouBusList') {
            iconName = 'bus';
            return <FontIcon name={iconName} size={size} color={color} />;
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Train') {
            iconName = focused ? 'train-sharp' : 'train-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Main') {
            iconName = focused ? 'alarm-sharp' : 'alarm-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: 'gray',
        activeBackgroundColor: '#B0C4DE',
        inactiveBackgroundColor: '#B0C4DE',
        hideOnKeyboard: true,
      }}>
      <Tab.Screen name="Search">
        {({ navigation }) => <SearchStack navigation={navigation} storage={storage} setStorage={setStorage} />}
      </Tab.Screen>
      <Tab.Screen name="FavList">
        {({ navigation }) => <FavList navigation={navigation} storage={storage} setStorage={setStorage} choice={choice} setChoice={setChoice} trainsto={trainsto} saveResult={saveResult} />}
      </Tab.Screen>
      <Tab.Screen name="Main" component={Main} />
      <Tab.Screen name="AjouBusList" component={AjouList} />
      <Tab.Screen name="Train">
        {({ navigation }) => <TrainStack trainsto={trainsto} saveResult={saveResult} />}
      </Tab.Screen>
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