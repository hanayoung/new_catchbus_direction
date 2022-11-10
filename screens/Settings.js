import React from 'react';
import {Button} from 'react-native';
import styled from 'styled-components/native';

/*설정
기타 설정에 관련된 부분 추가하면 될 듯*/

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

const Settings = ({ navigation }) => {
    return(
        <Container>
            <StyledText>설정</StyledText>
            <Button 
            title = "기록" 
            onPress = {<History/>}/>
            <Button
            title = "타이머"
            onPress = {<Timer/>}/>
            <Button
            title = "즐겨찾기"
            onPress = {()=> navigation.navigate('FavList')}/>
        </Container>
    )
}

export default Settings;