import styled from "styled-components";

const Form = styled.form`
  display: inline-flex;
  flex-direction: column;
  margin-top: 1em;

  & input {
    margin-bottom: 0.7em;
  }
  & button {
    margin-top: 1.4em;
    align-self: flex-start;
  }
`;

export default Form;
