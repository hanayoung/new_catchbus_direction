import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import { DOMParser } from 'xmldom';
//import BusContext, { BusConsumer } from './context/Bus';
import styled from 'styled-components/native';
import catchbus from '../components/catchbus.gif';
import sleepingbus from '../components/sleepingbus.png';
import happybus from '../components/happybus.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AlertContext, { AlertConsumer } from '../src/context/Alert';
import axios from 'axios';

const Container = styled.View`
flex : 2;
justify-content: center;
align-items: center;
`;
const StyledText = styled.Text`
font-size : 30px;
margin-bottom: 50px;
`;
const DetailText = styled.Text`
font-size : 18px;
margin-bottom : 15px;
`;
const MiniText = styled.Text`
font-size : 12px;
margin-bottom : 15px;
`;

const Mainsrc = () => {

  const [result, setResult] = useState([]);
  const [obj, setObj] = useState([]);
  const [one, setOne] = useState([]);

  const { alert } = useContext(AlertContext);
  const routeName = alert.routeName;
  const stationName = alert.stationName;
  const predict1 = alert.predict1;

  return(
    alert.length === 0 ? 
    <Container>
    <Image source = {happybus}/>
    <DetailText>  버스를 등록해주세요</DetailText>
    </Container>
    :(
      alert[0] == -1 ?
      <Container>
    <Image source = {sleepingbus}/>
    <DetailText>  {alert[1]} 번 버스는</DetailText>
    <DetailText> 운행 종료 되었습니다</DetailText>
    </Container>
      :( alert.remain1 == -1 ? 
      <Container>
        <Image source = {catchbus}/>
        <DetailText>{routeName}번 버스가</DetailText>
        <DetailText>{stationName}정류장에</DetailText>
        <DetailText>{predict1}분 후 도착 예정입니다</DetailText>
        <MiniText/>
        <MiniText>{alert.loc1} 정류장 전</MiniText>
      </Container>
      :
      <Container>
        <Image source = {catchbus}/>
        <DetailText>{routeName}번 버스가</DetailText>
        <DetailText>{stationName}정류장에</DetailText>
        <DetailText>{predict1}분 후 도착 예정입니다</DetailText>
        <MiniText/>
        <MiniText>잔여 좌석 {alert.remain1}   |   {alert.loc1} 정류장 전</MiniText>
      </Container>
    )
    )
  )
}

export default Mainsrc;