import React from 'react';
import styled from 'styled-components';
import AnswersForm from './AnswersForm';
import QuestionContent from './Question';

const Container = styled.div`
  margin-bottom: 1em;
  & code {
    background: #f7f7f7;
    padding: 0.25em 0.5em;
    font-size: 85%;
  }
`
class Question extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }
  handleChange = (ev) => {
    const val = ev.target.value;
    this.props.onSelectAnswer(val);
  }

  render() {
    const {data, selectedAnswer, toAssetsUrl} = this.props;
    return (
      <Container>
        <QuestionContent 
          text={data.text} 
          imageUrl={data.image && (toAssetsUrl(data.image))}
        />
        <h2>Answers</h2>
        <AnswersForm 
          toAssetsUrl={toAssetsUrl}
          answers={data.answers}
          selected={selectedAnswer}
          onChange={this.handleChange}
        />
      </Container>
    );
  }
}

export default Question;
