import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
import { DOMParser } from 'xmldom';
import BusContext, { BusConsumer } from './context/Bus';
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

const BusRouteList = () => {
  const [data, setData] = useState([]);
  const [location, setLocation] = useState([]);

  const { bus } = useContext(BusContext);

  // console.log("bus routeId",bus.routeId);
  const searchStation = async () => {
    //console.log("working");
    //console.log("location: ", location);
    try {
      const API_KEY = 'UkgvlYP2LDE6M%2Blz55Fb0XVdmswp%2Fh8uAUZEzUbby3OYNo80KGGV1wtqyFG5IY0uwwF0LtSDR%2FIwPGVRJCnPyw%3D%3D';
      const url = 'http://apis.data.go.kr/6410000/busrouteservice/getBusRouteStationList'; /*URL*/
      var queryParams = `?serviceKey=${API_KEY}&routeId=${bus.routeId}`;
      var getData = await axios.get(url + queryParams);
      let xmlParser = new DOMParser();
      let xmlDoc = xmlParser.parseFromString(getData.data, "text/xml");
      let i = 0;
      let array = [];
      while (1) {
        var tmpnode = new Object();
        tmpnode.title = xmlDoc.getElementsByTagName("stationName")[i].textContent;
        tmpnode.description = '';
        tmpnode.id = xmlDoc.getElementsByTagName("stationId")[i].textContent;
        location.map((value) => {
          if (value.stationId == tmpnode.id) {
            tmpnode.icon = require('../assets/icons/bus2x.png');
          }
        })
        array.push(tmpnode);
        i++;
        if (xmlDoc.getElementsByTagName("stationId")[i] == undefined) break;
      }
      setData(array);
    }
    catch (err) {
      // alert(err);
    }
    // if (result.length == 0) {
    //   console.log("result is empty");
    // }
  };

  const locationList = async () => {
    //console.log("working");
    try {
      const API_KEY = 'UkgvlYP2LDE6M%2Blz55Fb0XVdmswp%2Fh8uAUZEzUbby3OYNo80KGGV1wtqyFG5IY0uwwF0LtSDR%2FIwPGVRJCnPyw%3D%3D';
      const url = 'http://apis.data.go.kr/6410000/buslocationservice/getBusLocationList'; /*URL*/
      var queryParams = `?serviceKey=${API_KEY}&routeId=${bus.routeId}`;
      var getData = await axios.get(url + queryParams);
      let xmlParser = new DOMParser();
      let xmlDoc = xmlParser.parseFromString(getData.data, "text/xml");
      let i = 0;
      let array = [];
      while (1) {
        var tmpnode = new Object();
        tmpnode.stationId = xmlDoc.getElementsByTagName("stationId")[i].textContent;
        array.push(tmpnode);
        i++;
        if (xmlDoc.getElementsByTagName("stationId")[i] == undefined) break;
      }
      setLocation(array);
    }
    catch (err) {
      // alert(err);
    }
    // if (result.length == 0) {
    //   console.log("result is empty");
    // }
  };

  useEffect(() => {
    searchStation();
    locationList();
  }, [bus]);

  return (
    //console.log(data),
    <Container>
      <StyledText>{bus.routeName}</StyledText>
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

export default BusRouteList;