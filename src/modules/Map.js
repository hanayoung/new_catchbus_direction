import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from "expo-location";
import MapView, {Marker} from 'react-native-maps';

const ask = async ()=>{
    const {granted} = await Location.requestForegroundPermissionsAsync();
    const {coords: {latitude,longitude}} = await Location.getCurrentPositionAsync({accuracy :5}); //coords를 통해 현재 위치의 좌표 받기
    setinitialRegion({
      latitude:latitude,
      longitude:longitude,
      latitudeDelta:0.02,
      longitudeDelta:0.02
    })
    };

const printMap =({result})=>{
        useEffect(()=>{
            ask();
        },[]);
  return(
    <View style={styles.container}>
<MapView
    region={initialRegion}
    style={[styles.map]}
    showsUserLocation={true}
    showsMyLocationButton={true}
    >
{result&&result.map((item)=>{
    return(
    <Marker
    key={item.id}
    coordinate={{
        latitude:Number(item.y),
        longitude:Number(item.x),//리턴 해줘야지 마커 뜸
    }}
/>
    );
}
)}
    </MapView>
</View>
);
}
export default {printMap};