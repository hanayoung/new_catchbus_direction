import React from 'react';
import styled from 'styled-components/native';
import TrainMainsrc from '../src/TrainMainsrc';

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

const TrainMain = () => {
    return(
        <Container>
            <TrainMainsrc/>
        </Container>
    )
}

export default TrainMain;