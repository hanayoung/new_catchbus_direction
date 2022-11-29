import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import TrainOptionsrc from '../src/TrainOptionsrc';

const Container = styled.View`
flex : 1;
justify-content: center;
align-items: center;
background-color: #F0F8FF;
`;
const StyledText = styled.Text`
font-size : 30px;
margin-bottom: 10px;
`;
const DetailText = styled.Text`
font-size : 15px;
margin-bottom : 10px;
`;

const TrainOption = ({trainsto, saveResult}) => {
    return(
        <Container>
            <TrainOptionsrc trainsto={trainsto} saveResult={saveResult}/>
        </Container>
    )
}

export default TrainOption;