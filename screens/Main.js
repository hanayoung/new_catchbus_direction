import React from 'react';
import {Button} from 'react-native';
import styled from 'styled-components/native';
import Settings from '../screens/Settings';
import SearchStation from '../screens/SearchStation';
import BusRoute from '../screens/BusRoute';

/*초기 화면*/
/*todo: (1) 아무것도 설정되지 않은 상태의 메인 페이지 -> 정류장/버스 선택 페이지로 이동
(2) 즐겨찾기 설정된 상태의 메인 페이지 -> 버스의 출발 여부에 따라서 화면 변화
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
  
const Main = ({ item, setItem }) => {

    return (
        <Container>
            <StyledText>초기 화면</StyledText>
            <DetailText>Todo: 1. 즐겨찾기 목록이 빈 경우, 추가 버튼과 안내 문구</DetailText>
            <DetailText>2. 즐겨찾기가 선택된 경우, 해당 버스 정보 나타내기</DetailText>
            <Button 
            title = "+" 
            onPress = {()=> <SearchStation item={item} setItem={setItem}/>}/>
            <Button
            title = "설정"
            onPress = {()=> <Settings/>}/>
            <Button
            title = "버스 노선"
            onPress = {() => <BusRoute/>}/>
        </Container>
    );
}

export default Main;