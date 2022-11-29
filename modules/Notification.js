import { StyleSheet, Text, View,Button } from 'react-native';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef, useContext } from 'react';
import * as Permissions from "expo-permissions";
import * as Device from 'expo-device';
import AlertContext, { AlertConsumer } from '../src/context/Alert';
import AsyncStorage from '@react-native-async-storage/async-storage';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false, 
    shouldSetBadge: false,
  }),
});

function GetNotification(){ 
const [time,setTime]=useState();
const [expoPushToken, setExpoPushToken] = useState('');
const [notification, setNotification] = useState(false);
const notificationListener = useRef();
const responseListener = useRef();



  const { alert } = useContext(AlertContext);
  //console.log("alert",alert);


const routeName = alert.routeName;
const stationName = alert.stationName;
const predict1 = alert.predict1;

function useInterval(callback, delay) {
  const savedCallback = useRef();
  // Remember the latest function.
  useEffect(() => {
      savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
      function tick() {
      savedCallback.current();
  }
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
}, [delay]);
}

useInterval(() => {
  get();
}, 100000000)

useEffect(() => {
  // Permission for iOS
  Permissions.getAsync(Permissions.NOTIFICATIONS)
    .then(statusObj => {
      // Check if we already have permission
      if (statusObj.status !== "granted") {
        // If permission is not there, ask for the same
        return Permissions.askAsync(Permissions.NOTIFICATIONS)
      }
      return statusObj
    })
    .then(statusObj => {
      // If permission is still not given throw error
      if (statusObj.status !== "granted") {
        throw new Error("Permission not granted")
      }
    })
    .catch(err => {
      return null
    })
}, []) //ios에서도 하려면 필요한 권한 설정 부분, 

useEffect(() => {
  registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

  notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
    setNotification(notification);
  });

  responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {

  });

  return () => {
    Notifications.removeNotificationSubscription(notificationListener.current);
    Notifications.removeNotificationSubscription(responseListener.current);
  };
}, []);
// useInterval(()=>{
//   console.log("iiiiiinnnnnnnn");
//   console.log(alert.predict1)
//     setTime(Number((alert.predict1)*60));
//    // setTime(Number(stor.predict1)*60) // 일단 원하는 분 이전일 때 바로 알림이 뜨는지 확인 (time =1 이런 게 먹히는지 확인해보기 )
//     //console.log("result in Nottttti second",result)
//     schedulePushNotification();
// },60000);
useEffect(()=>{
  if(alert.name!=undefined){
    //  console.log("one",one);
    // console.log("alert Noti setTime",alert);
    setTime((Number((alert.predict1)*60)));
  }
},[alert])
useInterval(()=>{
  //console.log("iiiiiinnnnnnnn");
    //setTime(Number(result.predict1)*60);
   // setTime(Number(stor.predict1)*60) // 일단 원하는 분 이전일 때 바로 알림이 뜨는지 확인 (time =1 이런 게 먹히는지 확인해보기 )
    //console.log("result in Nottttti second",result)
    schedulePushNotification();
},60000);

useEffect(()=>{
  if(alert.name!=undefined){
   // console.log("alert in Noti schedulePushNotification ",alert);
    schedulePushNotification();
  }
},[time]);

async function schedulePushNotification() {

 //console.log("alert.name",alert.routename)
 if(time==300){
  //console.log("time",time)
 }
 //console.log("time",time)
 else if(time<600){
await Notifications.scheduleNotificationAsync({
   // 화면에 뜨는 내용
   content:{
    title:`${alert.routename} is Coming!`,
    body:`${(time/60)} 분 후에 도착 !`,
   },
   trigger: { 
    seconds: 1, // 0은 안 먹히고 1도 한 5초? 후에 뜸
    channelId:'default', 
  },
});
}
else if(time>300){
  //console.log("time",time);
  
}
// else{
//   setTime(Number(time)-30);
//   setTimeout(()=>schedulePushNotification(),300000);
// }
}

async function registerForPushNotificationsAsync() {
let token;

if (Platform.OS === 'android') {
  await Notifications.setNotificationChannelAsync('default', { 
    name: 'default',
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [0, 250, 250, 250], 
    lightColor: '#FF231F7C',
  });
}

if (Device.isDevice) { 
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!');
    return;
  }
  token = (await Notifications.getExpoPushTokenAsync()).data;
//  console.log(token);
} else {
  alert('Must use physical device for Push Notifications');
}

return token;
}

}
export default GetNotification;