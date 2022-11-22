import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components/native';
import TrainContext from './context/Train';
import axios from 'axios';
import { DOMParser } from 'xmldom';
import { FlatList, StyleSheet, Dimensions } from 'react-native';

import TrainList from '../modules/TrainList';

const Container = styled.View`
flex : 1;
justify-content: center;
align-items: center;
width: ${({ width }) => width - 40}px;
`;

const TrainOptionsrc = (trainsto, setTrainsto) => {
    const { train } = useContext(TrainContext);

    const width = Dimensions.get('window').width;

    const [trainList, setTrainList] = useState([]);

    useEffect(() => {
        searchTrain(train);
    }, []);

    const searchTrain = async (train) => {
        try {
            const API_KEY = 'UkgvlYP2LDE6M%2Blz55Fb0XVdmswp%2Fh8uAUZEzUbby3OYNo80KGGV1wtqyFG5IY0uwwF0LtSDR%2FIwPGVRJCnPyw%3D%3D';
            const url = 'http://apis.data.go.kr/1613000/TrainInfoService/getStrtpntAlocFndTrainInfo';
            var queryParams = `?serviceKey=${API_KEY}&depPlaceId=${train.startStation}&arrPlaceId=${train.endStation}&depPlandTime=${train.trainDate}&trainGradeCode=${train.trainOpt}&numOfRows=100&pageNo=1&_type=xml`;
            var result = await axios.get(url + queryParams);
            let xmlParser = new DOMParser();
            let xmlDoc = xmlParser.parseFromString(result.data, "text/xml");
            let i = 0;
            let array = [];
            while (1) {
                var tmpnode = new Object();
                tmpnode.index = i;
                tmpnode.adultcharge = xmlDoc.getElementsByTagName("adultcharge")[i].textContent;       //운임
                tmpnode.arrplacename = xmlDoc.getElementsByTagName("arrplacename")[i].textContent;     //도착지
                tmpnode.arrplandtime = xmlDoc.getElementsByTagName("arrplandtime")[i].textContent;     //도착시간
                tmpnode.depplacename = xmlDoc.getElementsByTagName("depplacename")[i].textContent;     //출발지
                tmpnode.depplandtime = xmlDoc.getElementsByTagName("depplandtime")[i].textContent;     //출발시간
                tmpnode.traingradename = xmlDoc.getElementsByTagName("traingradename")[i].textContent; //차량종류명
                array.push(tmpnode);
                i++;
                if (xmlDoc.getElementsByTagName("adultcharge")[i] == undefined) break;
            }
            setTrainList(array);
        }
        catch (err) {
            //alert(err);
        }
    };


    return (
        <Container width={width}>
            <FlatList
                keyExtractor={item => item.arrplacename}
                data={trainList}
                style={[styles.flatlist]}
                renderItem={({ item }) => (
                    <TrainList
                        item={item}
                        trainsto={trainsto}
                        setTrainsto={setTrainsto}
                    />
                )}
                windowSize={3}
            />
        </Container>
    )
}
const styles = StyleSheet.create({
    flatlist: {
      flex: 1,
      width: '100%',
    }
  });
  
export default TrainOptionsrc;