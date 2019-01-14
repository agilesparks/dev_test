import React from 'react';
import styled from 'styled-components';
import Timer from '../Timer';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${props => props.theme.color1};
  color: white;
  width: 100%;
  line-height: 50px;
  flex-wrap: wrap;
  margin-bottom: 1em;
`
const Title = styled.span`
  font-weight: bold;
  flex: 1;
  width: 100%;
  padding: 0 1em;
  @media (max-width: 650px) {
    flex: auto;
  }
`

const TimerContainer = styled.span`
  font-size: 1.8em;
  background: rgba(0,0,0,0.4);
  display: inline-block;
  overflow: hidden;
  padding: 0 1em;
  __width: 50%;
  text-align: center;
  flex: 1;
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