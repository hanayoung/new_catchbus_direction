import React, { useState, useContext } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import IconButton from '../components/IconButton'
import { images } from './images'
import { StyleSheet, Dimensions } from 'react-native';
import AlertContext, { AlertConsumer } from '../src/context/Alert';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Notification from './Notification';
// 1. src/searchStation의 자식
const Container = styled.View`
flex : 1;
justify-content: center;
align-items: center;
flex-direction: row;
width: ${({ width }) => width - 40}px;
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
        flex: 1,
    },
});

const FavListModule = ({ item, storage, setStorage, choice, setChoice }) => {
    const width = Dimensions.get('window').width;

    const [alert, setAlert] = useState([]);
    const { dispatch } = useContext(AlertContext);

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
            console.log(">>>>>>>>>>", item);
            setChoice(item);
            setAlert(item);
            dispatch(item);
            
        }
        else {
            storage[item.routeid].selected = false;
        }
        saveResult(storage);
        

    }
    return (
        <Container width={width}>
            {console.log("alert in FavListModule",alert)}
            <Content_name>{item.routename}</Content_name>
            <Content_name>{item.stationName}</Content_name>
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