import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components/native';
import TrainContext from './context/Train';
import axios from 'axios';
import { DOMParser } from 'xmldom';
import { FlatList, StyleSheet, Dimensions, Text } from 'react-native';

import TrainList from '../modules/TrainList';

const Container = styled.View`
flex : 1;
justify-content: center;
align-items: center;
width: ${({ width }) => width - 40}px;
`;

const TrainOptionsrc = ({ trainsto, saveResult }) => {
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
                let arr = [];
                let time = [];
                tmpnode.index = train.trainDate + train.startStation + train.endStation + i;
                console.log("index: ", tmpnode.index);

                arr = [...xmlDoc.getElementsByTagName("arrplandtime")[i].textContent];
                time[0] = arr[8];
                time[1] = arr[9];
                tmpnode.arrhour = time.join('');
                time[0] = arr[10];
                time[1] = arr[11];
                tmpnode.arrmin = time.join('');

                arr = [...xmlDoc.getElementsByTagName("depplandtime")[i].textContent];
                time[0] = arr[8];
                time[1] = arr[9];
                tmpnode.dephour = time.join('');
                time[0] = arr[10];
                time[1] = arr[11];
                tmpnode.depmin = time.join('');

                tmpnode.clicked = false;

                for (var index in trainsto) {
                    if (tmpnode.index == index)
                        tmpnode.clicked = true;
                }

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
        console.log("train: ", train),
        <Container width={width}>
            <Text>출발지: {train.startStationName}</Text>
            <Text>도착지: {train.endStationName}</Text>
            <Text>날짜: {train.trainYear}년 {train.trainMonth}월 {train.trainDay}일</Text>
            <Text>종류: {train.trainOptName}</Text>
            <FlatList
                keyExtractor={item => item.arrplacename}
                data={trainList}
                style={[styles.flatlist]}
                renderItem={({ item }) => (
                    <TrainList
                        item={item}
                        train={train}
                        trainsto={trainsto}
                        saveResult={saveResult}
                    />
                )}
                windowSize={2}
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