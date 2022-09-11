import React from 'react';
import {Button} from 'react-native';
import styled from 'styled-components/native';

/*아주대 노선 보여주기*/

const Container = styled.View`
flex : 1;
justify-content: center;
align-items: center;
`;
const StyledText = styled.Text`
font-size : 30px;
margin-bottom: 10px;
`
const DetailText = styled.Text`
font-size : 15px;
margin-bottom : 10px;
`;

const AjouList = ({ navigation }) => {
    return(
        <Container>
            <StyledText>아주대 노선</StyledText>
        </Container>
    )
}

export default AjouList;