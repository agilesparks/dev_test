import React from 'react';
import styled from 'styled-components';
import Timer from '../Timer';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${props => props.theme.color1};
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0 0 0 1em;
  height: 50px;
  line-height: 50px;
`
const Title = styled.span`
  font-weight: bold;
`

const TimerContainer = styled.span`
  font-size: 1.8em;
  background: rgba(0,0,0,0.4);
  display: inline-block;
  overflow: hidden;
  padding: 0 1em;
  width: 50%;
  text-align: center;
`

export default function TestHeader({title, timeRemaining}) {
  return (
    <Container>
      <Title>{title}</Title>
      <TimerContainer>
        <Timer timeRemaining={timeRemaining} warnMs={120000}/>
      </TimerContainer>
    </Container>
  )
}