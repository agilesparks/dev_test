import React from "react";
import Header from "../../components/Header";
import Form from "../../components/Form";
import PageContainer from "../../components/PageContainer";

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
  };

  render() {
    const { title, duration_min, technology, questionsCount } = this.props;
    return (
      <PageContainer>
        <Header>{title}</Header>
        <p>Welcome to {title}.</p>
        <p>
          The test includes <b>{questionsCount}</b> multiple choice questions.
          <br />
          Once it starts, you will have <b>{duration_min}</b> minutes to
          complete all {questionsCount} questions.
          <br />
        </p>
        <p>Please fill your name below and then <b>submit</b> to start the test.</p>
        <p>
          <b><i>Important:</i></b>
          <br />
          The questions have different difficulty levels, so plan your time
          accordingly.
        </p>
        <Form onSubmit={this.handleSubmit}>
          <label htmlFor="input_name">Full Name:</label>
          <input ref={this.nameRef} required={true} id="input_name"></input>
          <label htmlFor="input_yoe">
            Years of <b>{technology}</b> experience:
          </label>
          <input
            ref={this.expRef}
            required={true}
            type="number"
            id="input_yoe"
          ></input>
          <button>Start</button>
        </Form>
        <p>Good luck!</p>
      </PageContainer>
    );
  }
}

export default Homepage;
