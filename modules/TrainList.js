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
height: 30;
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

const TrainList = ({ item, trainsto, setTrainsto, train }) => {
    const [arrtime, setArrtime] = useState('');
    const [deptime, setDeptime] = useState('');

    const saveResult = async result => {
        try {
            await AsyncStorage.setItem('train', JSON.stringify(result));
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
                    depplacename: train.depplacename,
                    dephour: item.dephour,
                    depmin: item.depmin,
                    arrplacename: train.arrplacename,
                    arrhour: item.arrhour,
                    arrmin: item.arrmin,
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

    return (
        <Container>
            <Content_locate>{item.dephour}시 {item.depmin}분 ~ {item.arrhour}시 {item.arrmin}분</Content_locate>
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