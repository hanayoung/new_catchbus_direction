import React from 'react';
import {Button} from 'react-native';
import styled from 'styled-components/native';
import AjouBusList from '../src/AjouBusList';
/*아주대 노선 보여주기*/

const Container = styled.View`
flex : 1;
justify-content: center;
align-items: center;
background-color: #F0F8FF;
`;
const StyledText = styled.Text`
font-size : 30px;
margin-bottom: 10px;
`
const DetailText = styled.Text`
font-size : 20px;
margin-top : 10px;
margin-bottom : 20px;
`;

const AjouList = ({ navigation }) => {
    return(
        <Container>
            <AjouBusList/>
        </Container>
    )
}

export default AjouList;