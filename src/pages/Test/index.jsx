import React from 'react';
import styled from 'styled-components';
import Question from './components/Question';
import QuestionsNav from './components/QuestionsNav';
import TestHeader from './components/TestHeader';
import { Beforeunload } from 'react-beforeunload';

const Context = require.context(`../../data/`);
// generat a path resolver
const getToAssetsPath = (testId) => {
  return (file) => {
    return Context(`./${testId}_assets/${file}`).default;
  }
}

function shuffle(arr) {
  // TODO
  return arr;
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  * {
    box-sizing: border-box;
  }
`
const QuestionWrap = styled.div`
  overflow: auto;
  padding: 1em;
  flex: 1;
`
const Top = styled.div`
`
const Header = styled.h1`
  display: inline-block;
  margin-top: 0;
  margin-right: 1em;
`
const ButtonsContainer = styled.div`
  display: inline-block;
  vertical-align: text-bottom;
`

let interval = null;

class Testpage extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      timeRemaining: props.testData.duration_min * 60 * 1000,
      questions: shuffle(props.testData.questions),
      answers: props.testData.questions.map(i => null),
      curQuestion: 0,
      startTime: Date.now(),
    }
    this.toAssetsPath = getToAssetsPath(props.testData.test_id);
  }
  componentDidUpdate() {
    const {testData} = this.props;
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
    this.preloadTestImages();
  }
  componentWillUnmount() {
    clearInterval(interval);
  }

  preloadTestImages = () => {
    const images = [];
    this.props.testData.questions.forEach(question => {
      if (question.image) {
        images.push(this.toAssetsPath(question.image));
      }
      question.answers.forEach(answer => {
        if (answer.image) {
          images.push(this.toAssetsPath(answer.image));
        }
      })
    });
    // console.log('Preloading', images);
    images.forEach(src => {
      const image = new Image();
      // image.onload = () => console.log('loaded');
      image.src = src;
   })
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
    const {testData} = this.props;
    const timeRemaining = (testData.duration_min * 60 * 1000) - (Date.now() - this.state.startTime);
    return (
      <Beforeunload onBeforeunload={() => "Sure you want to stop now?"} >
        <MainContainer>
          <TestHeader
            timeRemaining={timeRemaining}
            title={testData.title}
          />
          <QuestionWrap>
            <Top>
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
            </Top>
            <Question
              data={this.state.questions[this.state.curQuestion]}
              selectedAnswer={this.state.answers[this.state.curQuestion]}
              onSelectAnswer={this.handleSelectAnswer}
              toAssetsUrl={this.toAssetsPath}
            />
            <ButtonsContainer>
              <QuestionsNav
                curQuestion={this.state.curQuestion}
                totalQuestions={this.state.questions.length}
                onMovePrev={this.movePrevQ}
                onMoveNext={this.moveNextQ}
                onSubmit={this.handleSubmit}
              />
            </ButtonsContainer>
          </QuestionWrap>
        </MainContainer>
      </Beforeunload>
    );
  }
}

export default Testpage;
