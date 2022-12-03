import React, { useState } from "react";
import { StyleSheet, Dimensions, Text } from 'react-native';
import styled from 'styled-components/native';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Container = styled.View`
`;
const TrainMainDropdown = ({LocationName, setLocation, locations}) => {

    return (
        <Container>
            <SelectDropdown
                data={locations}
                style={styles.dropdown}
                defaultButtonText={LocationName}
                buttonTextAfterSelection={(selectedItem, index) => {
                    setLocation(selectedItem);
                    return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                    return item;
                }}
                buttonStyle={styles.dropdown1BtnStyle}
                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                renderDropdownIcon={isOpened => {
                    return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                }}
                dropdownIconPosition={'right'}
                dropdownStyle={styles.dropdown1DropdownStyle}
                rowStyle={styles.dropdown1RowStyle}
                rowTextStyle={styles.dropdown1RowTxtStyle}
            >
            </SelectDropdown>
        </Container>
    )
};

const styles = StyleSheet.create({
    dropdown: {
        alignItems: 'center',
    },
    textsize: {
        fontSize: 30,
        marginTop: 15,
        marginBottom: 5,
    },
    dropdown1BtnStyle: {
        width: Dimensions.get('window').width - 40,
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#444',
        marginBottom: 5,
    },
    dropdown1BtnTxtStyle: { color: '#444', textAlign: 'left' },
    dropdown1DropdownStyle: { backgroundColor: '#EFEFEF', width: Dimensions.get('window').width - 40},
    dropdown1RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5' },
    dropdown1RowTxtStyle: { color: '#444', textAlign: 'left' },
    view: {
        flexDirection: 'row',
    },
});

export default TrainMainDropdown;