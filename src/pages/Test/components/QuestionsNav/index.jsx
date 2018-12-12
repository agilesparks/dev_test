import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  border: 2px solid skyblue;
  border-radius: 5px;
  margin: 0 0.5em;
`
export default function QuestionsNav(props) {
  const {
    curQuestion,
    totalQuestions,
    onMovePrev,
    onMoveNext,
    onSubmit,
  } = props;
  return (
    <div>
      {curQuestion > 0 && (
        <Button onClick={onMovePrev}>Back</Button>
      )}
      {curQuestion < totalQuestions - 1 && (
        <Button onClick={onMoveNext}>Next</Button>
      )}
      {curQuestion === totalQuestions - 1 && (
        <Button onClick={onSubmit}>Finish</Button>
      )}
    </div>
  )
}