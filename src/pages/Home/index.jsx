import React from 'react';
import Header from '../../components/Header';
import PageContainer from '../../components/PageContainer';
const testData = require('../../data/' + process.env.REACT_APP_TEST_ID + '.json');

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    this.props.onSubmit({name: this.ref.current.value});
  }

  render() {
    return (
      <PageContainer>
        <Header>
          {testData.title}
        </Header>
        <p>
          Welcome to {testData.title}.<br/>
          Please fill your name below and then submit to start the test.<br/>
        </p>
        <p>
          Once the test starts, you will have {testData.duration_min} minutes to complete {testData.questions.length} short questions.
        </p>
        <form onSubmit={this.handleSubmit}>
          <label>
            Full Name: <input ref={this.ref} required={true}></input>
          </label>
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
