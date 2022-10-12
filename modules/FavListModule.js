import React from 'react';
import styled from'styled-components/native';
import PropTypes from 'prop-types';
import IconButton from '../components/IconButton'
import {images} from './images'
import {TouchableOpacity, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// 1. src/searchStation의 자식

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
    },
});

const FavListModule = ({ item, storage, setStorage}) => {

    var choice = new Object();

    const saveResult = async result => {
        try {
          await AsyncStorage.setItem('results', JSON.stringify(result));
          setStorage(result);
        } catch (e) {
          console.error(e);
        }
      };

    const changeClicked = item => {
        if (item.clicked == false) {
            const newStorageObject = {
                [item.id] : {
                    routeid: item.routeId,
                    routename: item.routeName,
                    routetype: item.routetype,
                    region: item.region,
                },
            };
            saveResult({...storage, ...newStorageObject});
            item.clicked = true;
        }
        else {
            const currentResults = Object.assign({}, storage);
            delete currentResults[item.id];
            saveResult(currentResults);
            item.clicked = false;
        }
    }

    return (
        console.log("hi"),
        <TouchableOpacity
        onPressOut = {() => {
            choice = item;
        }}
        style = {styles.button}
        >
            <Content_name>{item.routeName}</Content_name>
            <Content_locate>{item.routeType}</Content_locate>
            <IconButton 
            type={item.clicked ? images.clicked : images.unclicked} 
            id={item} 
            onPressOut={changeClicked}
            clicked={item.clicked}
            />
        </TouchableOpacity>
    );
};

FavListModule.defaultProps = {
    onPressOut: () => {},
};

FavListModule.propTypes = {
    item: PropTypes.object.isRequired,
    onPressOut : PropTypes.func,
};

export default FavListModule;