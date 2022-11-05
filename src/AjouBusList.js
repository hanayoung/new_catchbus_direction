import React, { useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Gyoanggyo from '../modules/AjouBusList/Gyoang';
import Remain from '../modules/AjouBusList/Remain';
import styled from 'styled-components/native';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { heads, heads2, heads3 } from '../modules/AjouBus';
import { Gyoang, Suwon, Mokdong, Jamsil, Sadang, Bundang, Gumjung, Ansan } from '../modules/AjouBus';

const Container = styled.View`
flex : 1;
justify-content: center;
align-items: center;
`;

const AjouBus = () => {
    const [select, setSelect] = useState('');
    return (
        <Container>
            <SelectDropdown
            data={locations}
            style={styles.dropdown}
            defaultButtonText={'광교중앙(아주대)역 노선'}
            buttonTextAfterSelection={(selectedItem, index) => {
                setSelect(selectedItem);
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
            />
            {(select ==locations[0] || select == '') && <Gyoanggyo head={heads} location={Gyoang} />}
            {select ==locations[1] && <Remain head={heads3} location={Mokdong} />}
            {select ==locations[2] && <Remain head={heads3} location={Jamsil} />}
            {select ==locations[3] && <Remain head={heads3} location={Sadang} />}
            {select ==locations[4] && <Remain head={heads3} location={Bundang} />}
            {select ==locations[5] && <Remain head={heads3} location={Gumjung} />}
            {select ==locations[6] && <Remain head={heads3} location={Ansan} />}
            {select ==locations[7] && <Gyoanggyo head={heads2} location={Suwon} />}
        </Container>
    )
};

const locations = ["광교중앙(아주대)역 노선",
                   "목동(일류투어 9904)",
                   "잠실(일류투어 3925)",
                   "사당(일류투어 7943)",
                   "분당(일류투어 7998)",
                   "금정(아주대 9061)",
                   "안산(일류투어 9931)",
                   "수원역(아주대 9062)"];

const styles = StyleSheet.create({
    dropdown: {
        alignItems: 'center',
        width: Dimensions.get('window').width-40,
    },
  dropdown1BtnStyle: {
    width: '80%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
    marginBottom: 15,
  },
  dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
});

export default AjouBus;