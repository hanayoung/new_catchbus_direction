import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { DOMParser } from 'xmldom';
//import BusContext, { BusConsumer } from './context/Bus';
import styled from 'styled-components/native';
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
margin-bottom: 10px;
`;
const DetailText = styled.Text`
font-size : 15px;
margin-bottom : 10px;
`;

const Mainsrc = () => {

  const [result, setResult] = useState([]);
  const [obj, setObj] = useState([]);
  const [one, setOne] = useState([]);

  const { alert } = useContext(AlertContext);

  console.log(">>>>>>>>>>>alert in main", alert);

  const routeName = alert.routeName;
  const stationName = alert.stationName;
  const predict1 = alert.predict1;

  return(
    <Container>
      <StyledText>메인페이지 테스트</StyledText>
      <DetailText>{routeName}번 버스가</DetailText>
      <DetailText>{stationName}정류장에</DetailText>
      <DetailText>{predict1}분 후 도착 예정입니다</DetailText>
    </Container>
  )
}

export default Mainsrc;