import React from 'react'
import styled from 'styled-components/native';
import { View, StyleSheet, Button } from 'react-native';
import FavTrainModule from '../modules/FavTrainModule';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';


// 2. screens/SearchStation의 자식

const List = styled.ScrollView`
flex: 1;
width: ${({ width }) => width - 40}px;
`;

function FavListTrain({ trainsto, saveResult}) {
  //함수형 컴포넌트 const -> useEffect로 해결
  const width = Dimensions.get('window').width;
  const navigation = useNavigation();
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
    </View>
  ) : ( 
  <Button title = "기차를 등록하세요" onPress = {()=> navigation.navigate('TrainMain')}/>
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
  }
});


export default FavListTrain;