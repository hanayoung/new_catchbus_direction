import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {DOMParser} from 'xmldom';
import printMap from './Map';

const print=()=>{
  <Text>
    {result.map(item=>{
      <Text>정류장 : {item.name}</Text>
    })}
  </Text>
}

const Search = ({station})=>{//param1은 busstationservice같은 첫 번째 param, param2는 getBustStaionList처럼 두 번째 param
  const [result, setResult] = useState([]);
  console.log("come in");
  try{
    var xhr = new XMLHttpRequest();
    const url = 'http://apis.data.go.kr/6410000/busstationservice/getBusStationList'; /*URL*/
    const ServiceKey= 'UkgvlYP2LDE6M%2Blz55Fb0XVdmswp%2Fh8uAUZEzUbby3OYNo80KGGV1wtqyFG5IY0uwwF0LtSDR%2FIwPGVRJCnPyw%3D%3D'
    var queryParams = '?' + encodeURIComponent('serviceKey') + '='+ServiceKey; /*Service Key*/
    queryParams += '&' + encodeURIComponent('keyword') + '=' + encodeURIComponent(station); /**/
    xhr.open('GET', url + queryParams);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
        let xmlParser = new DOMParser();
        let xmlDoc = xmlParser.parseFromString(this.responseText, "text/xml");
        let i = 0;
        let array=[];
        while(1){
          var tmpnode = new Object();
          tmpnode.index=i;
          tmpnode.id = xmlDoc.getElementsByTagName("stationId")[i].textContent;
          tmpnode.name = xmlDoc.getElementsByTagName("stationName")[i].textContent;
          tmpnode.x = xmlDoc.getElementsByTagName("x")[i].textContent;
          tmpnode.y = xmlDoc.getElementsByTagName("y")[i].textContent;
          array.push(tmpnode);
          i++;
          if(xmlDoc.getElementsByTagName("stationId")[i]==undefined) break;
        }
        setResult(array);
        print(result);
        console.log("2 err");
      }
    }
  xhr.send();
  console.log("3 err");
  }
  catch(err){
    alert(err);
  }
};

export default Search;