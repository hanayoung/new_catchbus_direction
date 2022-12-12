import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Button,Text } from 'react-native';
import styled from 'styled-components/native';
import { DOMParser } from 'xmldom';
import TrainMainDropdown from '../modules/TrainMainDropdown';
import TrainMainDate from '../modules/TrainMainDate';
import { useNavigation } from '@react-navigation/native';
import TrainContext from './context/Train';
import axios from 'axios';

const Container = styled.ScrollView`
    flex : 1;
    background-color: '#F0F8FF';
`;

const TrainMain = () => {
    const [trainDate, setTrainDate] = useState('');
    const [startCity, setStartCity] = useState('');
    const [startCityCode, setStartCityCode] = useState('');
    const [startStation, setStartStation] = useState('');
    const [startStationCode, setStartStationCode] = useState('');
    const [endCity, setEndCity] = useState('');
    const [endCityCode, setEndCityCode] = useState('');
    const [endStation, setEndStation] = useState('');
    const [endStationCode, setEndStationCode] = useState('');
    const [option, setOption] = useState('');
    const [optioncode, setOptioncode] = useState('');


    const [station, setStation] = useState([]);
    const [stationcode, setStationcode] = useState([]);
    const [station2, setStation2] = useState([]);
    const [stationcode2, setStationcode2] = useState([]);

    const [trainInfo, setTrainInfo] = useState([]);

    const navigation = useNavigation();
    const { dispatch } = useContext(TrainContext);

    const findCitycode = (CityName, city, citycode, setCityCode) => {
        for (var i = 0; city[i] != null; i++)
            if (CityName == city[i]) {
                setCityCode(citycode[i]);
                break;
            }
    }

    useEffect(() => {
        findCitycode(startCity, city, citycode, setStartCityCode);
    }, [startCity]);

    useEffect(() => {
        findCitycode(endCity, city, citycode, setEndCityCode);
    }, [endCity]);

    useEffect(() => {
        findCitycode(option, trainList, trainListCode, setOptioncode);
    }, [option]);

    useEffect(() => {
        findCitycode(startStation, station, stationcode, setStartStationCode);
    }, [startStation]);

    useEffect(() => {
        findCitycode(endStation, station2, stationcode2, setEndStationCode);
    }, [endStation]);

    useEffect(() => {
        searchStation(startCityCode);
    }, [startCityCode]);

    useEffect(() => {
        searchStation2(endCityCode);
    }, [endCityCode]);

    const searchStation = async (citycode) => {
        try {
            const API_KEY = 'UkgvlYP2LDE6M%2Blz55Fb0XVdmswp%2Fh8uAUZEzUbby3OYNo80KGGV1wtqyFG5IY0uwwF0LtSDR%2FIwPGVRJCnPyw%3D%3D';
            const url = 'http://apis.data.go.kr/1613000/TrainInfoService/getCtyAcctoTrainSttnList';
            var queryParams = `?serviceKey=${API_KEY}&numOfRows=50&pageNo=1&_type=xml&cityCode=${citycode}`;
            var result = await axios.get(url + queryParams);
            let xmlParser = new DOMParser();
            let xmlDoc = xmlParser.parseFromString(result.data, "text/xml");
            let i = 0;
            let array = [];
            let arraycode = [];
            while (1) {
                var dropnode = '';
                var tmpnode = new Object();
                dropnode = xmlDoc.getElementsByTagName("nodename")[i].textContent;
                tmpnode = xmlDoc.getElementsByTagName("nodeid")[i].textContent;
                array.push(dropnode);
                arraycode.push(tmpnode);
                i++;
                if (xmlDoc.getElementsByTagName("nodename")[i] == undefined) break;
            }
            setStation(array);
            setStationcode(arraycode);
        }
        catch (err) {
            //alert(err);
        }
    };

    const searchStation2 = async (citycode) => {
        try {
            const API_KEY = 'UkgvlYP2LDE6M%2Blz55Fb0XVdmswp%2Fh8uAUZEzUbby3OYNo80KGGV1wtqyFG5IY0uwwF0LtSDR%2FIwPGVRJCnPyw%3D%3D';
            const url = 'http://apis.data.go.kr/1613000/TrainInfoService/getCtyAcctoTrainSttnList';
            var queryParams = `?serviceKey=${API_KEY}&numOfRows=50&pageNo=1&_type=xml&cityCode=${citycode}`;
            var result = await axios.get(url + queryParams);
            let xmlParser = new DOMParser();
            let xmlDoc = xmlParser.parseFromString(result.data, "text/xml");
            let i = 0;
            let array = [];
            let arraycode = [];
            while (1) {
                var dropnode = '';
                var tmpnode = new Object();
                dropnode = xmlDoc.getElementsByTagName("nodename")[i].textContent;
                tmpnode = xmlDoc.getElementsByTagName("nodeid")[i].textContent;
                array.push(dropnode);
                arraycode.push(tmpnode);
                i++;
                if (xmlDoc.getElementsByTagName("nodename")[i] == undefined) break;
            }
            setStation2(array);
            setStationcode2(arraycode);
        }
        catch (err) {
            //alert(err);
        }
    };

    const trainmerge = () => {
        var tmpnode = new Object();
        var arr = [...trainDate];
        var year = arr[0]+arr[1]+arr[2]+arr[3];
        var month = arr[4]+arr[5];
        var day = arr[6]+arr[7];
        tmpnode.startCity = startCityCode;
        tmpnode.startStationName = startStation;
        tmpnode.startStation = startStationCode;
        tmpnode.endCity = endCityCode;
        tmpnode.endStationName = endStation;
        tmpnode.endStation = endStationCode;
        tmpnode.trainDate = trainDate;
        tmpnode.trainYear = year;
        tmpnode.trainMonth = month;
        tmpnode.trainDay = day;
        tmpnode.trainOptName = option;
        tmpnode.trainOpt = optioncode;
        setTrainInfo(tmpnode);
    }

    useEffect(() => {
        trainmerge();
    }, [startCityCode, startStationCode, endCityCode, endStationCode, trainDate, optioncode])

    return (
        <Container style = {styles.Container}>
            <TrainMainDate
                trainDate={trainDate}
                setTrainDate={setTrainDate}
            />
            <Text style={styles.textsize}>출발지</Text>
            <TrainMainDropdown
                LocationName='출발 도시'
                locations={city}
                setLocation={setStartCity}
            />
            <TrainMainDropdown
                LocationName='기차역'
                setLocation={setStartStation}
                locations={station}
            />
            <Text style={styles.textsize}>도착지</Text>
            <TrainMainDropdown
                LocationName='도착 도시'
                locations={city}
                setLocation={setEndCity}
            />
            <TrainMainDropdown
                LocationName='기차역'
                setLocation={setEndStation}
                locations={station2}
            />
            <Text style={styles.textsize}>기차 종류</Text>
            <TrainMainDropdown
                LocationName='기차 종류'
                locations={trainList}
                setLocation={setOption}
            />
            <Button
                title="검색"
                color = 'black'
                onPress={() => {
                    dispatch(trainInfo);
                    navigation.navigate('TrainOption');
                }} />
        </Container>
    )
};

const locations = ["광교중앙(아주대)역 노선",
    "목동(일류투어 9904)"];

const city = ["서울특별시", "세종특별시", "부산광역시",
    "대구광역시", "인천광역시", "광주광역시",
    "대전광역시", "울산광역시", "경기도", "강원도",
    "충청북도", "충청남도", "전라북도", "전라남도",
    "경상북도", "경상남도"]
const citycode = [11, 12, 21, 22, 23, 24, 25, 26,
    31, 32, 33, 34, 35, 36, 37, 38];

const trainList = ["KTX", "새마을호", "무궁화호", "통근열차",
    "누리로", "AREX직통", "KTX-산천(A-type)", "ITX-새마을",
    "ITX-청춘", "KTX-산천(B-type)", "KTX-이음", "SRT"]
const trainListCode = ["00", "01", "02", "03", "04", "06",
    "07", "08", "09", "10", "16", "17"]

const styles = StyleSheet.create({
    textsize: {
        fontSize: 20,
        marginTop: 15,
        marginBottom: 13,
    },
    Container:{
        backgroundColor: '#F0F8FF'
    },
});

export default TrainMain;