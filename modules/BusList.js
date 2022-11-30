import React, { useContext, useEffect, useState } from 'react';
import styled from'styled-components/native';
import PropTypes from 'prop-types';
import IconButton from '../components/IconButton'
import {images} from '../modules/images'
import {TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import BusContext, { BusConsumer } from '../src/context/Bus';
import { useNavigation } from '@react-navigation/native';

// 1. src/searchStation의 자식
const Container = styled.View`
flex : 1;
justify-content: center;
align-items: center;
`;

const Content_name = styled.Text`
flex: 1;
font-size: 13px;
`;

const Rname = styled.Text`
flex: 1;
font-size: 16px;
`;

const Content_locate = styled.Text`
flex: 1;
font-size: 15px;
`;

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 10,
        borderWidth: 1,
        padding: 8,
        margin: 3,
        backgroundColor: "#FFFFFF",
        width: Dimensions.get('window').width-40,
    },
});


const BusList = ({ item, saveResult, storage}) => {

    const navigation = useNavigation();
    var choice = new Object();

    const [bus, setBus] = useState([]);
    const { dispatch } = useContext(BusContext);

    //console.log(item);
    const changeClicked = item => { 
        if (item.clicked == false) {
            item.clicked = true;
            //console.log("what is in the item >>>>>", item);
            const newStorageObject = {
                [item.routeId] : {
                    routeid: item.routeId,
                    routename: item.routeName,
                    routetype: item.routetype,
                    region: item.region,
                    predict1: item.predict1,
                    clicked: item.clicked,
                    predict1:item.predict1,
                    predict2:item.predict2,
                    predict:item.predict,
                    stationName: item.stationName,
                    stationId: item.stationId,
                    staOrder: item.staOrder,
                    selected: false,
                },
            };
            saveResult({...storage, ...newStorageObject});
            //console.log(">>>>>>>>", storage);
        }
        else {
            item.clicked = false;
            const currentResults = Object.assign({}, storage);
            delete currentResults[item.routeId];
            saveResult(currentResults);
        }
    }

    return (
        <TouchableOpacity
        onPressOut = {() => {
            choice = item;
            setBus(item)
            console.log(item.predict)
            dispatch(item);
            navigation.navigate('BusRoute')
        }}
        style = {styles.button}
        >
            <Container>
            <Rname>{item.routeName}</Rname>
            <>{
                item.predict2.length != 0 ? 
                <Content_locate>{item.predict1}분 후 도착  {item.predict2} 분 후 도착</Content_locate>
                : <Content_locate>{item.predict1}분 후 도착 </Content_locate> 
            }</>
            <Content_locate>{item.stationDirection} 방면</Content_locate>
            <>{
                item.predict != undefined ?
                <Content_locate>{item.predict} 분 후 회차지 도착</Content_locate>
                    : null
            }</>
            </Container>
            <IconButton 
            type={item.clicked ? images.clicked : images.unclicked} 
            id={item} 
            onPressOut={changeClicked}
            clicked={item.clicked}
            />
        </TouchableOpacity>
    );
};

BusList.defaultProps = {
    onPressOut: () => {},
};

BusList.propTypes = {
    item: PropTypes.object.isRequired,
    onPressOut : PropTypes.func,
};

export default BusList;