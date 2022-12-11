import React from 'react'
import styled from 'styled-components/native';
import { View, StyleSheet, Button } from 'react-native';
import FavTrainModule from '../modules/FavTrainModule';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


// 2. screens/SearchStation의 자식

const List = styled.ScrollView`
flex: 1;
width: ${({ width }) => width - 40}px;
`;

function FavListTrain({ trainsto, setTrainsto, setStorage, saveResult}) {
  //함수형 컴포넌트 const -> useEffect로 해결
  const width = Dimensions.get('window').width;
  const navigation = useNavigation();

  
  const clearItem = async () => {
    try {
      const currentResults = await AsyncStorage.clear();
      setStorage(currentResults);
      setTrainsto(currentResults);
    } catch (e) {
     // 오류 예외 처리
    }
  }


  return (trainsto != null) ? (
   //console.log("storage", trainsto),
    <View style={styles.container}>
      <List width={width}>
        {Object.values(trainsto)
          .map(item => (
            <FavTrainModule
              key={item.trainsto}
              item={item}
              trainsto={trainsto}
              saveResult={saveResult}
            />
          ))}
      </List>
      <Button title = "초기화" style={styles.button} onPress = {clearItem}/>
    </View>
  ) : ( 
  <Button title = "기차를 등록하세요" onPress = {()=> navigation.navigate('Train')}/>
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


export default FavListTrain;