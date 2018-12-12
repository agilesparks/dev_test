import React from 'react';
import AnswersForm from './AnswersForm';
import QuestionContent from './Question';

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
      <div>
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
      </div>
    );
  }
}

export default Question;
