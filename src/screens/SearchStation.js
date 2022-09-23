import React,{useState,useEffect} from 'react';
import {Button,StyleSheet,TextInput,Text,View,SafeAreaView} from 'react-native';
import styled from 'styled-components/native';
import Search from '../modules/Search';

/*정류소 검색*/
/*todo: (1) 검색창 보이고 입력되게 하기
(2) 검색어를 키워드로 하는 전체 정류소 목록 띄우기
(3) 해당 정류소를 중앙으로 하여 지도 보이게 하기
(4) 정류소 선택 시 버스 선택 화면으로 넘어가기
*/

const Container = styled.View`
flex : 1;
justify-content: center;
align-items: center;
`;
const StyledText = styled.Text`
font-size : 30px;
margin-bottom: 10px;
`;
const DetailText = styled.Text`
font-size : 15px;
margin-bottom : 10px;
`;

const SearchStation = ({ navigation }) => {
    const [station, setStation] = useState('');
    return(
        <Container>
           <TextInput
           
    style={styles.input}
    placeholder='정류장 이름을 입력하세요'
    autoCorrect = {false}
     value = {station}
     onChangeText={(text)=>setStation(text)}
     {...console.log(station)}
     onSubmitEditing = {()=><Search station={station}/>}
     multiline={false}
     returnKeyType="search"
      />
            <StyledText>정류장 검색</StyledText>
            <DetailText>Todo: 1. 검색창 보이고 입력되게 하기</DetailText>
            <DetailText>2. 검색어를 키워드로 하는 전체 정류소 목록 띄우기</DetailText>
            <DetailText>3. 해당 정류소를 중앙으로 하여 지도 보이게 하기</DetailText>
            <DetailText>4. 정류소 선택 시 버스 선택 화면으로 이동하기</DetailText>
            <Button 
            title = "버스 선택" 
            onPress = {()=> navigation.navigate('SearchBus')}/>
        </Container>
    )
}
const styles=StyleSheet.create({
    input:{
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    container:{
      flex:1,
      alignItems:'center'
    },
    text:{
    fontsize:10,
    alignItems:'center'
    },
    title:{
      margin:10,
      fontsize:10
    }
    });
export default SearchStation;