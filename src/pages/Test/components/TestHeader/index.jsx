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
  padding: 1em;
  height: 50px;
`
const Title = styled.span`
  font-weight: bold;
`

export default function TestHeader({title, timeRemaining}) {
  return (
    <Container>
      <Title>{title}</Title>
      <Timer timeRemaining={timeRemaining} warnMs={120000}/>
    </Container>
  )
}