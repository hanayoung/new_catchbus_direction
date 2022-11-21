import React, { useContext } from 'react';
import styled from 'styled-components/native';
import TrainContext from './context/Train';

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

const TrainOptionsrc = () => {
    const { train } = useContext(TrainContext);

    return (
        console.log("Train: ", train),
        <Container>
            <StyledText>기록</StyledText>
        </Container>
    )
}

export default TrainOptionsrc;