import React from 'react';
import {Button} from 'react-native';
import styled from 'styled-components/native';

/*검색 기록*/
/*todo: (1) 즐겨찾기로 지정했던 목록을 보여준다
(2) 나중에 하차기능까지 구현한다면!!!! ㅎㅎㅎ
(3) 그럴 수 있었으면 좋겠다!!!!!!!!!
(4) 할 수 있다!!!!!!!!!!!!!!!
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

const History = ({ navigation }) => {
    return(
        <Container>
            <StyledText>기록</StyledText>
        </Container>
    )
}

export default History;