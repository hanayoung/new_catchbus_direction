import React, { useState, useEffect, useRef, useContext } from 'react'
import styled from 'styled-components/native';
import { DOMParser } from 'xmldom';
import PropTypes from 'prop-types';
import { TouchableOpacity, FlatList, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import axios from 'axios';
import AlertContext, { AlertConsumer } from '../src/context/Alert';


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


const RealTime = () => {

    const [alert, setAlert] = useState([]);
    const { dispatch } = useContext(AlertContext);
    const [check, setCheck] = useState(false);
    const [one, setOne] = useState([]);
    const [result, setResult] = useState({});
    const [isRunning, setIsRunning] = useState(false);
    const [delay, setDelay] = useState(100000000);

    
    const get = async () => {
      const loadedResult = await AsyncStorage.getItem('results');
     // console.log(">>>>loaded ok?", loadedResult);
      let obj = JSON.parse(loadedResult); //string to object
      for(value in obj) {
        if(obj[value].selected === true){
          //if(obj[value].routename != one.routename){
            //console.log("have to be changed")
            //setCheck(true);
          //}
          setOne(obj[value]);
        }
      }
    };
 
    const stationId = one.stationId;
    const routeId = one.routeid;
    const staOrder = one.staOrder;

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
      //console.log("innnnnnn");
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
            setResult(tmpnode);

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
  }, 1000000)

  useInterval(() => {
    const date = new Date();
    get()
    predictRealTime()
    //console.log(date, "this realtime", result);
    //console.log("isRunning",isRunning)
    //console.log(result)
    delaymanager()
    setAlert(result)
    dispatch(result)
  }, isRunning ? delay : null);

}


export default RealTime;