import React, { useEffect } from 'react'
import styled from 'styled-components/native';
import { View, StyleSheet, FlatList, Text, Button } from 'react-native';
import FavListModule from '../modules/FavListModule';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


// 2. screens/SearchStation의 자식

const List = styled.ScrollView`
flex: 1;
width: ${({ width }) => width - 40}px;
`;



function FavListsrc({ storage, setStorage, setTrainsto, choice, setChoice }) {
  //함수형 컴포넌트 const -> useEffect로 해결
  const navigation = useNavigation();
  const width = Dimensions.get('window').width;

  const clearItem = async () => {
    try {
      const currentResults = await AsyncStorage.clear();
      setStorage(currentResults);
      setTrainsto(currentResults);
    } catch (e) {
     // 오류 예외 처리
    }
  }


  return (storage != null) ? (
   // console.log("storage", storage),
    <View style={styles.container}>
      <List width={width}>
        {Object.values(storage)
          .map(item => (
            <FavListModule
              key={item.id}
              item={item}
              storage={storage}
              setStorage={setStorage}
              choice={choice}
              setChoice={setChoice}
            />
          ))}
      </List>
      <Button title = "초기화" style={styles.button} onPress = {clearItem}/>
    </View>
  ) : ( 
  <Button title = "버스를 등록하세요" onPress = {()=> navigation.navigate('Search')}/>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  flatlist: {
    flex: 1,
    width: '100%',
  },
  button: {
    backgroundColor: '#F0F8FF',
    borderRadius: 4,
    marginBottom: 100,
  }
});


export default FavListsrc;