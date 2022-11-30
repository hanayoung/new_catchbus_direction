import React from 'react';
import styled from 'styled-components/native';
import TrainMainsrc from '../src/TrainMainsrc';

const Container = styled.View`
flex : 1;
justify-content: center;
align-items: center;
background-color: '#F0F8FF';
`;


const TrainMain = () => {
    return(
        <Container>
            <TrainMainsrc/>
        </Container>
    )
}

export default TrainMain;