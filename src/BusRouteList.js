import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
import { DOMParser } from 'xmldom';

const BusRouteList = () => {
  const [data, setData] = useState([]);
  const [location, setLocation] = useState([]);
  const routeId = '200000196';

  const searchStation = async () => {
    console.log("working");
    console.log("location: ", location);
    try {
      var xhr = new XMLHttpRequest();
      const API_KEY = 'UkgvlYP2LDE6M%2Blz55Fb0XVdmswp%2Fh8uAUZEzUbby3OYNo80KGGV1wtqyFG5IY0uwwF0LtSDR%2FIwPGVRJCnPyw%3D%3D';
      const url = 'http://apis.data.go.kr/6410000/busrouteservice/getBusRouteStationList'; /*URL*/
      var queryParams = `${url}?serviceKey=${API_KEY}&routeId=` +  encodeURIComponent(station);
      xhr.open('GET', queryParams);
      xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
          let xmlParser = new DOMParser();
          let xmlDoc = xmlParser.parseFromString(this.responseText, "text/xml");
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
      }
      xhr.send();
    }
    catch (err) {
      alert(err);
    }
    if (result.length == 0) {
      console.log("result is empty");
    }
  };

  const locationList = async () => {
    console.log("working");
    try {
      var xhr = new XMLHttpRequest();
      const API_KEY = 'UkgvlYP2LDE6M%2Blz55Fb0XVdmswp%2Fh8uAUZEzUbby3OYNo80KGGV1wtqyFG5IY0uwwF0LtSDR%2FIwPGVRJCnPyw%3D%3D';
      const url = 'http://apis.data.go.kr/6410000/buslocationservice/getBusLocationList'; /*URL*/
      var queryParams = `${url}?serviceKey=${API_KEY}&routeId=`+ encodeURIComponent(routeId);
      xhr.open('GET', queryParams);
      xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
          let xmlParser = new DOMParser();
          let xmlDoc = xmlParser.parseFromString(this.responseText, "text/xml");
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
      }
      xhr.send();
    }
    catch (err) {
      alert(err);
    }
    if (result.length == 0) {
      console.log("result is empty");
    }
  };

  useEffect(() => {
    locationList();
  }, []);

  useEffect(() => {
    searchStation();
  }, [location]);

  return (
    console.log(data),
    <View style={styles.container}>
      <Timeline
        style={styles.list}
        data={data}
        innerCircle={'icon'}
        circleSize={30}
        circleColor={'pink'}
      />
    </View>
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