import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { DOMParser } from 'xmldom';
//import BusContext, { BusConsumer } from './context/Bus';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

  const get = async () => {

    const loadedResult = await AsyncStorage.getItem('results');
    //setStorage(JSON.parse(loadedResult));
    let obj = JSON.parse(loadedResult); //string to object
    setObj(obj);
    for(value in obj) {
      if(obj[value].selected === true){
        setOne(obj[value]);
      }
    }
  };

  useEffect(()=>{
    get()
  }, []);

  return(
    <Container>
      <StyledText>메인페이지 테스트</StyledText>
      <DetailText>{one.routename}번 버스가</DetailText>
      <DetailText>{one.stationName}정류장에</DetailText>
      <DetailText>{one.predict1}분 후 도착 예정입니다</DetailText>
    </Container>
  )
}

export default Mainsrc;