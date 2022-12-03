import React, { useState, useEffect, useMemo, useContext,useRef } from 'react'
import styled from 'styled-components/native';
import { DOMParser } from 'xmldom';
import { FlatList, StyleSheet, Text } from 'react-native';
import Bus from '../modules/Bus';
import Notification from '../modules/Notification';
import StationContext, { StationConsumer } from './context/Station';
import axios from 'axios';

const Container = styled.View`
flex : 1;
justify-content: center;
align-items: center;
`;
const StyledText = styled.Text`
font-size : 30px;
margin-bottom: 10px;
`;
const DetailText = styled.Text`
font-size : 15px;
margin-bottom : 10px;
`;

function SearchBus({storage,setStorage}) {

  //1. screens/SearchBus의 자식, screens/SearchBus로부터 stationID 받음
  function useInterval(callback, delay) {
    
    const savedCallback = useRef(); // 최근에 들어온 callback을 저장할 ref를 하나 만든다.

    useEffect(() => {
      savedCallback.current = callback; // callback이 바뀔 때마다 ref를 업데이트 해준다.
    }, [callback]);

    useEffect(() => {
      function tick() {
        savedCallback.current(); // tick이 실행되면 callback 함수를 실행시킨다.
      }
      if(delay!==null){
        let id = setInterval(tick, delay); // delay에 맞추어 interval을 새로 실행시킨다.
        return () => clearInterval(id); // unmount될 때 clearInterval을 해준다.
      }
      }, [delay]); // delay가 바뀔 때마다 새로 실행된다.
};

const [result, setResult] = useState([]); //도착정보 저장
const [routeInfo, setRouteInfo] = useState([]); //노선정보 저장
const [merge, setMerge] = useState([]); //두 배열 합치기
const [isRunning, setIsRunning] = useState(false);
const [delay, setDelay] = useState(150000);
const [routearray, setRouteArray] = useState([]);
const [ok, setOk] = useState(false);
const [endStation, setEndStation]=useState([]);
const [resultCode, setResultCode] = useState(0); // 결과코드 0: 정상 운행, 4: 운행 종료
const [way,setWay]=useState([]);

  const { station } = useContext(StationContext);

 // console.log("from context", station.id);

  const handleRouteInfo = (item) => {
    setRouteInfo(routeInfo => [...routeInfo, item]);
  }
  const handleEndStation = (item) => {
    setEndStation(endStation=>[...endStation,item]);
  }
  const handleRouteArray = () => {
    const length = routearray.length;
    for(let i = 0; i < length; i++){
   // console.log("passing before", routearray[i]);
     searchRouteName(routearray[i]);
      }
    }

  // 여기서부터 루트아이디 핸들링, 검색, Input : routeId (from busSearch), Output: 노선 번호/유형/종점정보
  const searchRouteName = async (routeId) => {
    try {
      findTurnYn(routeId);
      const API_KEY = 'UkgvlYP2LDE6M%2Blz55Fb0XVdmswp%2Fh8uAUZEzUbby3OYNo80KGGV1wtqyFG5IY0uwwF0LtSDR%2FIwPGVRJCnPyw%3D%3D';
      const url = 'http://apis.data.go.kr/6410000/busrouteservice/getBusRouteInfoItem'; 
      var queryParams = `?serviceKey=${API_KEY}&routeId=${routeId}`;// xhr.open('GET', url + queryParams);    
      var data = await axios.get(url+queryParams);
      let xmlParser = new DOMParser();
      let xmlDoc = xmlParser.parseFromString(data.data, "text/xml");
      var route = new Object();
      route.paramID = routeId;
      route.routeName = xmlDoc.getElementsByTagName("routeName")[0].textContent;
      route.routeType = xmlDoc.getElementsByTagName("routeTypeName")[0].textContent;
      route.startName = xmlDoc.getElementsByTagName("startStationName")[0].textContent;
      route.endName = xmlDoc.getElementsByTagName("endStationName")[0].textContent;
      route.region = xmlDoc.getElementsByTagName("regionName")[0].textContent;
      route.startStationId=xmlDoc.getElementsByTagName("startStationId")[0].textContent;
      route.endStationId=xmlDoc.getElementsByTagName("endStationId")[0].textContent;
    //  console.log("start handleRouteInfo ",new Date());
      handleRouteInfo(route);
        }
    catch (err) {

    }
  }

  // 여기서부터 버스 도착 정보 검색, (Input; stationID, Output: 노선 정보와 기타 도착 정보)
  const searchBus = async () => {
    //getBusArrivalList, input param : stationId (ID)
  //  console.log("searchBus start",new Date());
    //getBusArrivalList, input param : stationId (ID)
    try {
    //  console.log("before ");
      setIsRunning(true);
    //  console.log("in");
      const API_KEY = 'UkgvlYP2LDE6M%2Blz55Fb0XVdmswp%2Fh8uAUZEzUbby3OYNo80KGGV1wtqyFG5IY0uwwF0LtSDR%2FIwPGVRJCnPyw%3D%3D';
      const url = 'http://apis.data.go.kr/6410000/busarrivalservice/getBusArrivalList'; 
      var queryParams = `?serviceKey=${API_KEY}&stationId=${station.id}`; // xhr.open('GET', url + queryParams); 
      var getData = await axios.get(url+queryParams);
    //  console.log("getData",getData);
      let xmlParser = new DOMParser();
      let xmlDoc = xmlParser.parseFromString(getData.data, "text/xml");  

      if(xmlDoc.getElementsByTagName("resultCode")[0].childNodes[0].nodeValue== 4){
      //  console.log("버스 집갔음");
      console.log("4");
        setResultCode(4);
      }
      else if(xmlDoc.getElementsByTagName("resultCode")[0].childNodes[0].nodeValue==23){
        console.log("23");
        setResultCode(23);
      }
      let i = 0;
      let array = [];
      let routearray = [];
     // console.log("searchBus -ing",new Date());
      while (1) {
        var tmpnode = new Object();
        tmpnode.routeId = xmlDoc.getElementsByTagName("routeId")[i].textContent;
        routearray.push(tmpnode.routeId);
        tmpnode.clicked = false;
        tmpnode.predict1 = xmlDoc.getElementsByTagName("predictTime1")[i].textContent;
       // tmpnode.loc1 = xmlDoc.getElementsByTagName("locationNo1")[i].textContent;
        //tmpnode.remain1 = xmlDoc.getElementsByTagName("remainSeatCnt1")[i].textContent;
        tmpnode.predict2 = xmlDoc.getElementsByTagName("predictTime2")[i].textContent;
      //  tmpnode.loc2 = xmlDoc.getElementsByTagName("locationNo2")[i].textContent;
      //  tmpnode.remain2 = xmlDoc.getElementsByTagName("remainSeatCnt2")[i].textContent;
        tmpnode.staOrder = xmlDoc.getElementsByTagName("staOrder")[i].textContent;
        tmpnode.endName=undefined;
        tmpnode.breakFlag=undefined;
        array.push(tmpnode);
        for (var routeId in storage) {
          if (tmpnode.routeId == routeId)
            tmpnode.clicked = true;
        }
        i++;
        if (xmlDoc.getElementsByTagName("routeId")[i] == undefined) { 
       //   console.log("break,setRouteArray",i, new Date());
          setRouteArray(routearray);
          break; 
        }
      }
      setResult(array);
      setOk(true);
    }
    catch (err) {
    //  console.error(err);
    }
  };
  const findTurnYn=async(routeId)=>{
    try {
      const API_KEY = 'UkgvlYP2LDE6M%2Blz55Fb0XVdmswp%2Fh8uAUZEzUbby3OYNo80KGGV1wtqyFG5IY0uwwF0LtSDR%2FIwPGVRJCnPyw%3D%3D';
      const url = 'http://apis.data.go.kr/6410000/busrouteservice/getBusRouteStationList'; 
      var queryParams = `?serviceKey=${API_KEY}&routeId=${routeId}`; // xhr.open('GET', url + queryParams);    
      var data = await axios.get(url+queryParams);
      let xmlParser = new DOMParser();
      let xmlDoc = xmlParser.parseFromString(data.data, "text/xml");
      var route = new Object();
      route.paramID = routeId;
      route.turnYn="Y";
      let i=0;
      while(1){
        if(xmlDoc.getElementsByTagName("turnYn")[i].textContent=="Y"){
            route.stationSeq=xmlDoc.getElementsByTagName("stationSeq")[i].textContent;
          handleEndStation(route);
          //console.log("break findTurnYn",new Date());
            break;
        }
        else i++;
      }     
    }
    catch (err) {
    //  console.log(err);
    }
  }
  const findDirection=async()=>{
   // console.log("findDirection start",new Date());
    for(let i=0;i<result.length;i++){
      for(let j=0;j<endStation.length;j++){
        if(endStation[j].paramID==result[i].routeId){
          if(Number(endStation[j].stationSeq)<Number(result[i].staOrder)){
            result[i].stationDirectionId=1;//0이 종점을 항헤 가는 거, 1이 기점을 향해 이건 찐방면 
            result[i].stationDirection=result[i].startName;
           // setWay([...way,result[i].stationDirection]);
            let count=Number(result[i].staOrder)-Number(endStation[j].stationSeq);
            if(count<8&&count>=0)
            result[i].breakFlag=true;
            else{
              result[i].breakFlag=false;
            }
          }
          else{
            result[i].stationDirectionId=0;
            result[i].stationDirection=result[i].endName;
           // setWay([...way,result[i].stationDirection]);
            if(Number(result[i].staOrder)<8)
            result[i].breakFlag=true;
            else{
              result[i].breakFlag=false;
            }
          }
      }
      }
    }// endStation에 있는 paramID랑 result에 있는 routeId랑 비교해서 같을 경우, stationSeq랑 staOrder 비교하기
   // setMerge(result);
//   console.log("findDirection end",new Date());
    if(result[result.length-1].breakFlag!=undefined){
  //    console.log("getEndStationInfo start",new Date());
    getEndStationInfo();

   }
  }
  const getEndStationInfo=async()=>{
    for(let i=0;i<result.length;i++){
    if(result[i].breakFlag==true){
      if(result[i].stationDirectionId==1){
        let data=await axios.get(`http://apis.data.go.kr/6410000/busarrivalservice/getBusArrivalList?serviceKey=UkgvlYP2LDE6M%2Blz55Fb0XVdmswp%2Fh8uAUZEzUbby3OYNo80KGGV1wtqyFG5IY0uwwF0LtSDR%2FIwPGVRJCnPyw%3D%3D&stationId=${result[i].endStationId}`)
        let xmlParser = new DOMParser();
        let xmlDoc = xmlParser.parseFromString(data.data, "text/xml");  
        for(let j=0;j<xmlDoc.getElementsByTagName("routeId").length;j++){
          if(xmlDoc.getElementsByTagName("routeId")[j].textContent==result[i].routeId){
            result[i].predict=xmlDoc.getElementsByTagName("predictTime1")[j].textContent;
      //   console.log("finish ",new Date(), result[i].routeName);
      //  console.log("result",result);
            break;
          }
        }   
      }else{
        //console.log("lastStationId",lastStationId)
        let data=await axios.get(`http://apis.data.go.kr/6410000/busarrivalservice/getBusArrivalList?serviceKey=UkgvlYP2LDE6M%2Blz55Fb0XVdmswp%2Fh8uAUZEzUbby3OYNo80KGGV1wtqyFG5IY0uwwF0LtSDR%2FIwPGVRJCnPyw%3D%3D&stationId=${result[i].startStationId}`)
        let xmlParser = new DOMParser();
        let xmlDoc = xmlParser.parseFromString(data.data, "text/xml"); 
        for(let j=0;j<xmlDoc.getElementsByTagName("routeId").length;j++){
          if(xmlDoc.getElementsByTagName("routeId")[j].textContent==result[i].routeId){
          result[i].predict=xmlDoc.getElementsByTagName("predictTime1")[j].textContent;
        //console.log("result",result);
          // console.log("finish ",new Date(), result[i].routeName);
          break;
          }
        }   
      }
    }
  }
  setMerge(result);
  }

  const Merge = async () => {    //result, routeInfo 병합
    for (var i = 0; i < result.length; i++) {
      let routeId = result[i].routeId;
      let route = routeInfo.find((r) => r.paramID == routeId)
      if(route != undefined){
        result[i].routeName = route.routeName;
        result[i].endStationId=route.endStationId;
        result[i].startStationId=route.startStationId;
        result[i].startName=route.startName;
        result[i].endName=route.endName;
        result[i].region=route.region;
        result[i].routeType=route.routeType;
        result[i].stationName = station.name;
        result[i].stationId = station.id;
      }
    }
    if(result.length!=0&&result[result.length-1].endName!=undefined){
    //  console.log("findDirection start ",new Date())
      findDirection();
  };
};

  //
  // 렌더링 핸들링
  useInterval(() => {
   // console.log("call searchBus",isRunning, new Date());
    searchBus();
  }, isRunning ? delay : 0);
 useEffect(()=>{
  // console.log("call handleRouteArray ",new Date());
   handleRouteArray();
 }, [ok]);
 // 렌더링 핸들링
 useEffect(()=>{
  // console.log("call merge by result", new Date());
   Merge();
 },[result,routeInfo,endStation])

  return (
  //  console.log("result", result.length, "routeInfo", routeInfo.length),

    <Container>
    <DetailText>{(()=> {if (resultCode === 4) return "버스도착정보가 없습니다"})()}</DetailText>
    <DetailText>{(()=>{if (resultCode=== 23) return "운행이 종료되었습니다"})}</DetailText>
      <Bus merge={merge} storage={storage} setStorage={setStorage}/>
    </Container>
  );
}

const styles = StyleSheet.create({
  flatlist: {
    flex: 1,
    width: '100%',
  }
})

export default SearchBus;