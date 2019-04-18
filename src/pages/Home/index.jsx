import React from 'react';
import Header from '../../components/Header';
import PageContainer from '../../components/PageContainer';
const testData = require('../../data/' + process.env.REACT_APP_TEST_ID + '.json');

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.nameRef = React.createRef();
    this.expRef = React.createRef();
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    this.props.onSubmit({
      name: this.nameRef.current.value,
      exp: this.expRef.current.value,
    });
  }

  render() {
    const {title, duration_min, technology} = this.props;
    return (
      <PageContainer>
        <Header>
          {title}
        </Header>
        <p>
          Welcome to {title}.<br/>
          Please fill your name below and then submit to start the test.<br/>
        </p>
        <p>
          The test includes {testData.questions.length} multiple choice questions.<br/>
          Once it starts, you will have {duration_min} minutes to complete all {testData.questions.length} questions.<br/>
        </p>
        <p>
          <b>Important:</b> the questions have different difficulty levels, so plan your time accordingly.
        </p>
        <form onSubmit={this.handleSubmit}>
          <label>
            Full Name: <input ref={this.nameRef} required={true}></input>
          </label><br/>
          <label>
            Years of {technology} experience: <input ref={this.expRef} required={true} type="number"></input>
          </label><br/>
          <br/>
          <button>Start</button>
        </form>
        <p>
          Good luck!
        </p>
      </PageContainer>
    );
  }
}

export default Homepage;
