import React from 'react';
import {Button} from 'react-native';
import styled from 'styled-components/native';

/*버스 검색*
/*todo: (1) 해당 정류장에 오는 모든 버스 목록 조회
(2) 빨버/시내 나눠서 따로 리스트 관리
(3) 버스 누르면 노선 보이게 하기
(4) 옆에 타이머 버튼 누르면 타이머 설정되게 하기
(5) 별 누르면 즐찾등록 (즐찾버튼 누르면 타이머 설정 넘어갔다가 즐찾가는 건 어떤지?)
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

const SearchBus = ({ navigation }) => {
    return(
        <Container>
            <StyledText>버스 검색</StyledText>
            <DetailText>Todo: 1. 해당 정류장에 오는 버스 분류해서 보이게 하기</DetailText>
            <DetailText>2. 버스 누르면 노선 보이게 하기</DetailText>
            <DetailText>3. 옆에 타이머 누르면 설정되게 하기</DetailText>
            <DetailText>4. 별 누르면 즐찾등록되게 하기</DetailText>
            <Button 
            title = "버스" 
            onPress = {()=> navigation.navigate('BusRoute')}/>
            <Button
            title = "타이머"
            onPress = {() => navigation.navigate('Timer')}/>
            <Button
            title = "별"
            onPress = {()=> navigation.navigate('FavList')}/>
        </Container>
    )
}

export default SearchBus;