import React, { useState, useContext } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import IconButton from '../components/IconButton'
import { images } from './images'
import { StyleSheet, Dimensions, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 1. src/searchStation의 자식
const Container = styled.View`
flex : 1;
justify-content: center;
align-items: center;
flex-direction: row;
width: ${({ width }) => width - 40}px;
`;

const RName = styled.Text`
flex: 1;
font-size: 18px;
`;

const SName = styled.Text`
flex: 1;
font-size: 13.8px;
`;

const Content_locate = styled.Text`
flex: 1;
font-size: 10px;
`;

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        flex: 1,
    },
    trainName: {
        alignItems: "center",
        flex: 1,
        flexDirection: "column",
    },
});

const FavTrainModule = ({ item, trainsto, saveResult }) => {
    const width = Dimensions.get('window').width;
    
    const changeClicked = item => {
        if (item.clicked == false) {
            item.clicked = true;
            const newStorageObject = {
                [item.index]: {
                    trainDate: train.trainDate,
                    dephour: item.dephour,
                    depmin: item.depmin,
                    startStationName: train.startStationName,
                    arrhour: item.arrhour,
                    arrmin: item.arrmin,
                    endStationName: train.endStationName,
                    trainOpt: train.trainOpt,
                    clicked: item.clicked,
                },
            };
            saveResult({ ...trainsto, ...newStorageObject });
        }
        else {
            const currentResults = Object.assign({}, trainsto);
            delete currentResults[item.index];
            saveResult(currentResults);
            item.clicked = false;
        }
    }

    const changeSelected = item => {
        if (item.selected == false) {
            for (var index in trainsto) {
                trainsto[index].selected = false;
            }
            trainsto[item.index].selected = true;
            //console.log(">>>>>>>>>>", item);
            //setChoice(item);
        }
        else {
            trainsto[item.index].selected = false;
        }
        saveResult(trainsto);

    }
    return (
        <Container width={width}>
            <View style={styles.trainName}>
            <RName>{item.trainDate}일 {item.dephour}시 {item.depmin}분 ~ {item.arrhour}시 {item.arrmin}분</RName>
            <SName>{item.startStationName} ~ {item.endStationName}</SName>
            </View>
            <IconButton
                type={item.clicked ? images.clicked : images.unclicked}
                id={item}
                onPressOut={changeClicked}
                clicked={item.clicked}
            />
            {/* <IconButton
                type={item.selected ? images.selected : images.unselected}
                id={item}
                onPressOut={changeSelected}
                selected={item.selected}
            /> */}
        </Container>
    );
};



FavTrainModule.defaultProps = {
    onPressOut: () => { },
};

FavTrainModule.propTypes = {
    item: PropTypes.object.isRequired,
    onPressOut: PropTypes.func,
};

export default FavTrainModule;