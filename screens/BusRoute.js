import React from 'react';
import {Button} from 'react-native';
import styled from 'styled-components/native';
import BusRouteList from '../src/BusRouteList';

/*버스 노선 보이기
/*todo: (1) 버스유형, 지역, 차고지 받아와서 보여주기
(2) 해당 버스 노선의 모든 정류장 받아오기 
(3) 정류장을 위에서 밑으로 나열하기
(4) 그 노선을 지나는 현재 버스의 위치 보이게 하기
(5) 방면 선택하면 해당 방면 나오게 하기
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

const BusRoute = ({ navigation }) => {
    return(
        <Container>
        <BusRouteList/>
        </Container>
    )
}

export default BusRoute;