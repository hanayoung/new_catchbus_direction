import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions } from 'react-native';

import IconButton from '../components/IconButton'
import { images } from '../modules/images';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 1. src/searchStation의 자식

const Container = styled.View`
justify-content: center;
align-items: center;
border-radius: 10;
border-width: 1;
padding: 5px;
margin: 3px;
`;

const Content_name = styled.Text`
flex: 1;
font-size: 14px;
`;

const Content_locate = styled.Text`
flex: 1;
font-size: 15px;
`;

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        borderRadius: 10,
        borderWidth: 1,
        padding: 5,
        margin: 3,
        width: Dimensions.get('window').width - 40,
    },
});

const TrainList = ({ item, trainsto, setTrainsto }) => {
    const [arrtime, setArrtime] = useState('');
    const [deptime, setDeptime] = useState('');

    const saveResult = async result => {
        try {
            await AsyncStorage.setItem('results', JSON.stringify(result));
            setTrainsto(result);
        } catch (e) {
            console.error(e);
        }
    };

    const changeClicked = item => {
        if (item.clicked == false) {
            item.clicked = true;
            const newStorageObject = {
                [item.index]: {
                    depplacename: item.depplacename,
                    deptime: deptime,
                    arrplacename: item.arrplacename,
                    arrtime: item.arrtime,
                    traingradename: item.traingradename,
                    clicked: item.clicked,
                    selected: false,
                },
            };
            saveResult({ ...trainsto, ...newStorageObject });
        }
        else {
            item.clicked = false;
            const currentResults = Object.assign({}, trainsto);
            delete currentResults[item.index];
            saveResult(currentResults);
        }
    }

    const plandtime = (item, index) => {
        let array = [...item];
        let arr = [];
        for (let i = 0; i < 4; i++)
            arr[i] = array[i];
        arr[4] = "년";
        arr[5] = " ";
        arr[6] = array[4]
        arr[7] = array[5]
        arr[8] = "월";
        arr[9] = " ";
        arr[10] = array[6];
        arr[11] = array[7];
        arr[12] = "일";
        arr[13] = " ";
        arr[14] = array[8];
        arr[15] = array[9];
        arr[16] = "시";
        arr[17] = " ";
        arr[18] = array[10];
        arr[19] = array[11];
        arr[20] = "분";
        if (index == 0)
            setDeptime(arr.join(''));
        else
            setArrtime(arr.join(''));
    };

    useEffect(() => {
        plandtime(item.arrplandtime, 0);
        plandtime(item.depplandtime, 1);
    }, []);

    return (
        <Container>
            <Content_name>출발지: {item.depplacename}</Content_name>
            <Content_locate>출발시간: {deptime}</Content_locate>
            <Content_locate>도착지: {item.arrplacename}</Content_locate>
            <Content_locate>도착시간: {arrtime}</Content_locate>
            <Content_locate>열차 종류: {item.traingradename}</Content_locate>
        </Container>
    );
};

TrainList.defaultProps = {
    onPressOut: () => { },
};

TrainList.propTypes = {
    item: PropTypes.object.isRequired,
    onPressOut: PropTypes.func,
};

export default TrainList;