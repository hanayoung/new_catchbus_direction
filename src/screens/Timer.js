import React from 'react';
import {Button} from 'react-native';
import styled from 'styled-components/native';

/*타이머(알림 설정)
todo: (1) 정류소와 버스이름을 보여줌
(2) 시간 설정할 수 있도록 함
(3) 알림/진동 선택할 수 있도록 함
(4) 저장을 누르면 타이머관련된 데이터들을 함께 즐찾으로 저장
(즉, 버스정류장-버스노선번호-버스key값-타이머시간-타이머옵션(진동/소리)를 하나의 노드로 묶어 관리)
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
`

const Timer = ({ navigation }) => {
    return(
        <Container>
            <StyledText>타이머/알림설정</StyledText>
            <DetailText>Todo: 1. 정류장과 버스이름 보이기</DetailText>
            <DetailText>2. 타이머 시간설정되게 하기</DetailText>
            <DetailText>3. 알림음/진동옵션 선택</DetailText>
            <DetailText>4. 저장 버튼 누르면 alert('저장되었습니다')</DetailText>
        </Container>
    )
}

export default Timer;