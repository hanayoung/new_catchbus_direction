import React from 'react'
import { View, StyleSheet, FlatList, Text } from 'react-native';
import FavListModule from '../modules/FavListModule';

// 2. screens/SearchStation의 자식

function FavListsrc({storage, setStorage})
 {
  //함수형 컴포넌트 const -> useEffect로 해결

  return (
    console.log("storage", storage),
    <View style={styles.container}>
      <FlatList
        keyExtractor={item => item.routeid}
        data={storage}
        style={[styles.flatlist]}
        renderItem={({ item }) => (
          <FavListModule
            item={item}
            storage={storage}
            setStorage={setStorage}/>
        )}
        windowSize={3}
      />
    </View>
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


export default FavListsrc;