import React, { useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import IconButton from '../components/IconButton'
import { images } from './images'
import { StyleSheet, Dimensions, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RawButton } from 'react-native-gesture-handler';

// 1. src/searchStation의 자식
const Container = styled.View`
justify-content: center;
align-items: center;
border-radius: 10;
border-width: 1;
height: 80;
padding: 5px;
margin: 3px;
flex-direction: row;
background-color: white;
width: ${({ width }) => width - 50}px;
`;

const RName = styled.Text`
flex: 1;
font-size: 14px;
`;

const SName = styled.Text`
flex: 1;
font-size: 17px;
margin-bottom: 5;
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
                    index: item.index,
                    trainDate: item.trainDate,
                    trainYear: item.trainYear,
                    trainMonth: item.trainMonth,
                    trainDay: item.trainDay,
                    dephour: item.dephour,
                    depmin: item.depmin,
                    startStationName: item.startStationName,
                    arrhour: item.arrhour,
                    arrmin: item.arrmin,
                    endStationName: item.endStationName,
                    trainOpt: item.trainOpt,
                    clicked: item.clicked,
                },
            };
            saveResult({ ...trainsto, ...newStorageObject });
        }
        else {
            console.log("helo");
            item.clicked = false;
            const currentResults = Object.assign({}, trainsto);
            delete currentResults[item.index];
            saveResult(currentResults);
        }
    }

    return (
        <Container width={width}>
            <View style={styles.trainName}>
            <RName>{item.trainYear}년 {item.trainMonth}월 {item.trainDay}일</RName>
            <SName>{item.startStationName} ~ {item.endStationName}</SName>
            <SName>{item.dephour}시 {item.depmin}분 ~ {item.arrhour}시 {item.arrmin}분</SName>
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