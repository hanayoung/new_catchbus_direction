import React, { useState, useEffect, useRef, useContext } from 'react'
import styled from 'styled-components/native';
import { DOMParser } from 'xmldom';
import PropTypes from 'prop-types';
import { TouchableOpacity, FlatList, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import axios from 'axios';
import AlertContext, { AlertConsumer } from '../src/context/Alert';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

const Content_name = styled.Text`
flex: 1;
font-size: 14px;
`;

const Content_locate = styled.Text`
flex: 1;
font-size: 15px;
`;

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
    },
});

const BACKGROUND_TASK_NAME = 'myTask';

TaskManager.defineTask(BACKGROUND_TASK_NAME, async () => {
  try {    
    // Fetch data from API
    await get();
    console.log("background in working!");
    // await predictRealTimeBackground();
    await Notifications.scheduleNotificationAsync({
      // 화면에 뜨는 내용
      content:{
       title:`alarm`,
       body:`alarm is working!`,
      },
      trigger: { 
       seconds: 1, // 0은 안 먹히고 1도 한 5초? 후에 뜸
       channelId:'default', 
     },
   });

    // Process the data
    console.log("background work is working");

    // Return a value to indicate the success of the task
    return {
      resultCode: TaskManager.TaskResult.Success,
    };
  } catch (error) {
    console.log('Failed to execute background task:', error);

    // Return a value to indicate the failure of the task
    return {
      resultCode: TaskManager.TaskResult.Failure,
    };
  }
});

const RealTime = () => {

    const [alert, setAlert] = useState([]);
    const { dispatch } = useContext(AlertContext);
    const [check, setCheck] = useState(false);
    const [one, setOne] = useState([]);
    const [result, setResult] = useState({});
    const [isRunning, setIsRunning] = useState(false);
    const [delay, setDelay] = useState(10000);

    const [stationId, setStationId] = useState(0);
    const [routeId, setRouteId] = useState(0);
    const [staOrder, setStaOrder] = useState(0);

    const handleone = (one) => {
      setOne(one),
      setStationId(one.stationId),
      setRouteId(one.routeid),
      setStaOrder(one.staOrder);
    }

    const handleresult = (result) => {
      console.log("here ok", result)
      setResult(result)
      setAlert(result)
      dispatch(result)
    }

    const get = async () => {
      const loadedResult = await AsyncStorage.getItem('results');
      //console.log(">>>>loaded ok?", loadedResult);
      let obj = JSON.parse(loadedResult); //string to object
      let flag = 0;
      for(value in obj) {
        if(obj[value].selected === true){
          flag = 1; // 3. 아무것도 핀 없을 때 판단
          if(obj[value].routename != one.routename){
            setCheck(1)
            //console.log("will be turn", one.routename, "to", obj[value].routename)
            //1. 새로운 핀 설정 감지
            handleone(obj[value])
            setCheck(1)
          }
          else setCheck(2); //2. 전이랑 같은 핀 감지
        }
      }
      if (flag == 0){
        setCheck(3); // 3. 아무 핀 없을 때
      }
    };
    //console.log(">>>>>>>>>>>>check if the param is ok", stationId, routeId, staOrder);

    function useInterval(callback, delay) {
    
      const savedCallback = useRef(); // 최근에 들어온 callback을 저장할 ref를 하나 만든다.

      useEffect(() => {
        savedCallback.current = callback; // callback이 바뀔 때마다 ref를 업데이트 해준다.
      }, [callback]);

      useEffect(() => {
        function tick() {
          savedCallback.current(); // tick이 실행되면 callback 함수를 실행시킨다.
        }
          let id = setInterval(tick, delay); // delay에 맞추어 interval을 새로 실행시킨다.
          return () => clearInterval(id); // unmount될 때 clearInterval을 해준다.
      }, [delay]); // delay가 바뀔 때마다 새로 실행된다.
    }

    const delaymanager = async () => {
      //if(check == true){ setDelay(1000), console.log("!!!!"), setCheck(false)}
      if(result.predict1 > 10) setDelay(100000)
      else if(result.predict1 == 5) setDelay(50000)
      else if(result.predict1 == 3) setDelay(10000)
    }

     // 여기서부터 버스 도착 정보 검색, (Input; stationID, Output: 노선 정보와 기타 도착 정보)
    const predictRealTime = async () => {
    //getBusArrivalList, input param : stationId (ID)
    try {
      //console.log("in predict time", one.routename)
      setIsRunning(true);
      const API_KEY = 'UkgvlYP2LDE6M%2Blz55Fb0XVdmswp%2Fh8uAUZEzUbby3OYNo80KGGV1wtqyFG5IY0uwwF0LtSDR%2FIwPGVRJCnPyw%3D%3D';
      const url = 'http://apis.data.go.kr/6410000/busarrivalservice/getBusArrivalItem'; 
      let queryParams = `?serviceKey=${API_KEY}&stationId=${stationId}&routeId=${routeId}&staOrder=${staOrder}`;
      let getData=await axios.get(url+queryParams);
      let xmlParser=new DOMParser();
      let xmlDoc=xmlParser.parseFromString(getData.data,"text/xml");
      //var queryParams = '?' + encodeURIComponent('serviceKey') + '='+'UkgvlYP2LDE6M%2Blz55Fb0XVdmswp%2Fh8uAUZEzUbby3OYNo80KGGV1wtqyFG5IY0uwwF0LtSDR%2FIwPGVRJCnPyw%3D%3D';
      //queryParams += '&stationId=' + encodeURIComponent(stationId) + '&routeId=' + encodeURIComponent(routeId) + '&staOrder=' + encodeURIComponent(staOrder); // xhr.open('GET', url + queryParams); 
            var tmpnode = new Object();
            tmpnode.predict1 = xmlDoc.getElementsByTagName("predictTime1")[0].textContent;
            tmpnode.loc1 = xmlDoc.getElementsByTagName("locationNo1")[0].textContent;
            tmpnode.remain1 = xmlDoc.getElementsByTagName("remainSeatCnt1")[0].textContent;
            tmpnode.predict2 = xmlDoc.getElementsByTagName("predictTime2")[0].textContent;
            tmpnode.loc2 = xmlDoc.getElementsByTagName("locationNo2")[0].textContent;
            tmpnode.remain2 = xmlDoc.getElementsByTagName("remainSeatCnt2")[0].textContent;
            tmpnode.staOrder = xmlDoc.getElementsByTagName("staOrder")[0].textContent;
            tmpnode.stationName = one.stationName;
            tmpnode.routeName = one.routename;
            handleresult(tmpnode);
          //  console.log("result", result);
    }
    catch (err) {
      if(result.predict1==undefined) result.predict1 = null;
      if(result.predict2==undefined) result.predict2 = null;
    }
    if (result.length == 0) {
     // console.log("result is empty");
    }
  };
  //
  // 렌더링 핸들링

  useInterval(() => {
    get();
    if(check == 1){ // pin changed
      predictRealTime()
    }
  }, 1000)

  useInterval(() => {
    const date = new Date();
    get()
    if(check == 2){ // delay manager
      predictRealTime()
      delaymanager();
    }
    else if(check == 3){
      //console.log("no pin")
      setAlert([])
      dispatch([])
    }
    //console.log(date, "this realtime", result);
    //console.log("isRunning",isRunning)
    //console.log(result)
  }, isRunning ? delay : null);

  useEffect(() => {
    BackgroundFetch.registerTaskAsync(BACKGROUND_TASK_NAME, {
      minimumInterval: 60, // Execute the task at least once per minute
    });
  }, []);

  useEffect(() => {
    TaskManager.getTaskOptionsAsync(BACKGROUND_TASK_NAME)
      .then((options) => {
        if (options?.error) {
          console.log('Failed to get task options:', options.error);
        } else if (options?.lastTimestamp) {
          console.log(`Task executed in the background at ${options.lastTimestamp}`);
        }
      })
      .catch((error) => {
        console.log('Failed to get task options:', error);
      });
  }, []);
}
// 제대로 task 등록되는지 확인할 것


export default RealTime;