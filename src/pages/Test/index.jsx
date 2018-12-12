import React from 'react';
import styled from 'styled-components';
import Question from './components/Question';
import QuestionsNav from './components/QuestionsNav';
import TestHeader from './components/TestHeader';
const testData = require('../../data/' + process.env.REACT_APP_TEST_ID + '.json');

// generat a path resolver
const getToAssetsPath = (testId) => {
  return (file) => {
    return require(`../../data/${testId}_assets/${file}`);
  }
}
const toAssetsPath = getToAssetsPath(testData.test_id);

function shuffle(arr) {
  // TODO
  return arr;
}

const Container = styled.div`
  padding: 50px 1em;
  * {
    box-sizing: border-box;
  }
`
const Header = styled.h1`
  display: inline-block;
`
const ButtonsContainer = styled.div`
  display: inline-block;
  vertical-align: text-bottom;
  margin-left: 1em;
`

let interval = null;

class Testpage extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      timeRemaining: testData.duration_min * 60 * 1000,
      questions: shuffle(testData.questions),
      answers: testData.questions.map(i => null),
      curQuestion: 0,
      startTime: Date.now(),
    }
  }
  componentDidUpdate() {
    const timeRemaining = (testData.duration_min * 60 * 1000) - (Date.now() - this.state.startTime);
    if(timeRemaining <= 0) {
      this.handleSubmit();
    }
  }

  componentDidMount() {
    interval = setInterval(() => {
      this.forceUpdate();
      // this.setState({
      //   timeRemaining: Math.max(this.state.timeRemaining - 1000, 0),
      // })
    }, 500)
  }
  componentWillUnmount() {
    clearInterval(interval);
  }
  moveNextQ = () => {
    this.setState({
      curQuestion: this.state.curQuestion + 1
    })
  }
  movePrevQ = () => {
    this.setState({
      curQuestion: this.state.curQuestion - 1
    })
  }
  handleSelectAnswer = (idx) => {
    const newAnswers = this.state.answers.slice(0);
    newAnswers[this.state.curQuestion] = idx;
    this.setState({
      answers: newAnswers,
    })
  }
  handleSubmit = () => {
    console.log('Answers', this.state.answers);
    this.props.onSubmit(this.state.answers);
  }

  render() {
    const timeRemaining = (testData.duration_min * 60 * 1000) - (Date.now() - this.state.startTime);
    return (
      <Container>
        <TestHeader
          timeRemaining={timeRemaining}
          title={testData.title}
        />
        <div>
          <Header>
            Question {this.state.curQuestion + 1} of {this.state.questions.length}
          </Header>
          <ButtonsContainer>
            <QuestionsNav
              curQuestion={this.state.curQuestion}
              totalQuestions={this.state.questions.length}
              onMovePrev={this.movePrevQ}
              onMoveNext={this.moveNextQ}
              onSubmit={this.handleSubmit}
            />
          </ButtonsContainer>
        </div>
        <Question
          data={this.state.questions[this.state.curQuestion]}
          selectedAnswer={this.state.answers[this.state.curQuestion]}
          onSelectAnswer={this.handleSelectAnswer}
          toAssetsUrl={toAssetsPath}
        />
        
      </Container>
    );
  }
}

export default Testpage;
