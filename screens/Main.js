import React from 'react';
import {Button} from 'react-native';
import styled from 'styled-components/native';
import Settings from '../screens/Settings';
import SearchStation from '../screens/SearchStation';
import BusRoute from '../screens/BusRoute';
import Mainsrc from '../src/Mainsrc';

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
  
const Main = ({navigation}) => {

    return (
        <Container>
            <Mainsrc/>
        </Container>
    );
}

export default Main;