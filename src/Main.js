import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { DOMParser } from 'xmldom';
//import BusContext, { BusConsumer } from './context/Bus';
import styled from 'styled-components/native';
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

const Main = () => {
 
  return (
    <Container>
    <StyledText>{`${bus.routeName}번 버스가`}</StyledText>
    <DetailText>{`${bus.startName} <-> ${bus.endName}`}</DetailText>
    <DetailText>{`${bus.region} | ${bus.routeType}`}</DetailText>
    <View style={styles.container}>
      <Timeline
        style={styles.list}
        data={data}
        innerCircle={'icon'}
        circleSize={30}
        circleColor={'pink'}
      />
    </View>
    </Container>
  );
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 65,
    backgroundColor: 'white'
  },
  list: {
    flex: 1,
    marginTop: 20,
    width: Dimensions.get('window').width - 40,
  },
});

export default Main;