import React, { useEffect } from 'react'
import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions, FlatList, StatusBar, SafeAreaView } from 'react-native';
import { DOMParser } from 'xmldom';
import StationList from '../modules/StationList';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from "expo-location";
import axios from 'axios';

// 2. screens/SearchStation의 자식

function SearchStation({navigation})
 {
  const [station, setStation] = useState('');
  const [result, setResult] = useState([]);
  const [initialRegion, setinitialRegion] = useState();
 // const { direction } = useContext(DirectionContext);
  // const [image,setImage]=useState(['../assets/icons/free-icon-pin-map-8358807.png']);
  //const [latitude,setLatitude]=useState('');
  //const [longitute, setLongitude]=useState('');
  //함수형 컴포넌트 const -> useEffect로 해결
 
  const goBus = (item) => {
    navigation.navigate('SearchBus');
  }
  const handleResult=(arr)=>{
    arr.sort(function(a,b){
        return a.dis-b.dis;
    });
   // console.log("arr",arr);
    setResult(arr);
    setRegion(arr[0].x,arr[0].y);
}
const setRegion=(x,y)=>{
  setinitialRegion({
      latitude:Number(y),
      longitude:Number(x),
      latitudeDelta:0.002,
      longitudeDelta:0.002
  })
  }
  const ask = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({ accuracy: 5 }); //coords를 통해 현재 위치의 좌표 받기
   // setLatitude(latitude);
    //setLongitude(longitude);
    setinitialRegion({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02
    })
  };

  const handleStation = text => {
    setStation(text);
  }
  const searchStation = async () => {
    try {
      const API_KEY = 'UkgvlYP2LDE6M%2Blz55Fb0XVdmswp%2Fh8uAUZEzUbby3OYNo80KGGV1wtqyFG5IY0uwwF0LtSDR%2FIwPGVRJCnPyw%3D%3D';
      const url = 'http://apis.data.go.kr/6410000/busstationservice/getBusStationList'; 
      var queryParams = `?serviceKey=${API_KEY}&keyword=`+encodeURIComponent(station);
      //var queryParams = `?serviceKey=${API_KEY}&keyword=${station}`; 
      //console.log("station");
      var result = await axios.get(url+queryParams);
      let xmlParser = new DOMParser();
      let xmlDoc = xmlParser.parseFromString(result.data, "text/xml");
      let i = 0;
      let array = [];
      while (1) {
        var tmpnode = new Object();
        tmpnode.index = i;
        tmpnode.id = xmlDoc.getElementsByTagName("stationId")[i].textContent;
        tmpnode.name = xmlDoc.getElementsByTagName("stationName")[i].textContent;
        tmpnode.x = xmlDoc.getElementsByTagName("x")[i].textContent;
        tmpnode.y = xmlDoc.getElementsByTagName("y")[i].textContent;
        tmpnode.dis=Math.pow((initialRegion.longitude-tmpnode.x),2)+Math.pow((initialRegion.latitude-tmpnode.y),2);
        array.push(tmpnode);
        i++;
        if (xmlDoc.getElementsByTagName("stationId")[i] == undefined) break;
      }
      handleResult(array);

    }
    catch (err) {
      //alert(err);
    }
  };

  useEffect(() => {
    ask();
    searchStation();
  }, 1000);
// console.log("image",image);
  return (
    <View style={styles.container}>
      <Text style={styles.title}></Text>
      <TextInput
        style={styles.input}
        placeholder='정류장 이름을 입력하세요'
        autoCorrect={false}
        value={station}
        onChangeText={handleStation}
        onSubmitEditing={() => searchStation()}
        multiline={false}
        returnKeyType="search"
      />
      <Text style={styles.title}></Text>
      <MapView
        region={initialRegion}
        style={[styles.map]}
        showsUserLocation={true}
        showsMyLocationButton={true}
        provider={PROVIDER_GOOGLE}
      >
        {result && result.map((item) => {
          return (
            <Marker
              key={item.id}
              title={item.name}
              coordinate={{
                latitude: Number(item.y),
                longitude: Number(item.x),//리턴 해줘야지 마커 뜸
              }}
              description={item.id}
              pinColor={"#B0C4DE"}
               
            />
          );
        }

        )}
      </MapView>
      <FlatList
        keyExtractor={item => item.stationId}
        data={result}
        style={[styles.flatlist]}
        renderItem={({ item }) => (
          <StationList
            item={item}
            goBus={goBus}
          />
        )}
        windowSize={3}
      />
    </View>
  );

}

const styles = StyleSheet.create({
  input: {
    height: 42,
    width: 250,
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    padding: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center'
  },
  text: {
    fontsize: 10,
    alignItems: 'center'
  },
  title: {
    margin: 0.3 ,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    fontsize: 10,
  },
  map: {
    flex: 1,
    width: 500,
    height: 500
  },
  flatlist: {
    flex: 1,
    width: '100%',
  }
});


export default SearchStation;