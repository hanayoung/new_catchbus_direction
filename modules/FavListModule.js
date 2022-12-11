import React, { useState, useContext } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import IconButton from '../components/IconButton'
import { images } from './images'
import { StyleSheet, Dimensions, View  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 1. src/searchStation의 자식
const Container = styled.View`
justify-content: center;
align-items: center;
border-radius: 10;
border-width: 1;
height: 60;
padding: 5px;
margin: 3px;
flex-direction: row;
background-color: white;
width: ${({ width }) => width - 50}px;
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

const FavListModule = ({ item, storage, setStorage, choice, setChoice }) => {
    const width = Dimensions.get('window').width;

    const saveResult = async result => {
        try {
            await AsyncStorage.setItem('results', JSON.stringify(result));
            setStorage(result);
        } catch (e) {
            //console.error(e);
        }
    };
    // const clearAll = async () => {
    //     try {
    //       await AsyncStorage.clear();
    //     } catch (e) {
    //       // 오류 예외 처리
    //     }
    //   }
    const changeClicked = item => {
        if (item.clicked == false) {
            item.clicked = true;
            const newStorageObject = {
                [item.routeid]: {
                    routeid: item.routeId,
                    routename: item.routeName,
                    routetype: item.routetype,
                    region: item.region,
                    clicked: item.clicked,
                    predict1: item.predict1,
                    selected: item.selected,
                },
            };
            saveResult({ ...storage, ...newStorageObject });
        }
        else {
            const currentResults = Object.assign({}, storage);
            delete currentResults[item.routeid];
            saveResult(currentResults);
            item.clicked = false;
        }
    }

    const changeSelected = item => {
        if (item.selected == false) {
            for (var routeid in storage) {
                storage[routeid].selected = false;
            }
            storage[item.routeid].selected = true;
            //console.log(">>>>>>>>>>", item);
            setChoice(item);
        }
        else {
            storage[item.routeid].selected = false;
            setChoice(null);
        }
        saveResult(storage);

    }
    return (
        <Container width={width}>
            <View style={styles.trainName}>
            <RName>{item.routename}</RName>
            <SName>{item.stationName}</SName>
            </View>
            <IconButton
                type={item.clicked ? images.clicked : images.unclicked}
                id={item}
                onPressOut={changeClicked}
                clicked={item.clicked}
            />
            <IconButton
                type={item.selected ? images.selected : images.unselected}
                id={item}
                onPressOut={changeSelected}
                selected={item.selected}
            />
        </Container>
    );
};

FavListModule.defaultProps = {
    onPressOut: () => { },
};

FavListModule.propTypes = {
    item: PropTypes.object.isRequired,
    onPressOut: PropTypes.func,
};

export default FavListModule;