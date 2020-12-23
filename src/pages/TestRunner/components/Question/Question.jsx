import React from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";

const Wrapper = styled.div`
  & p {
    margin: 0;
    max-width: 80ch;
  }
`;
export default function QuestionText({ text, imageUrl }) {
  return (
    <Wrapper>
      {text && <ReactMarkdown source={text} />}
      <br />
      {imageUrl && (
        <img
          key={imageUrl}
          srcSet={`${imageUrl} 100w`}
          sizes="50px"
          src={imageUrl}
          alt="Question"
        />
      )}
    </Wrapper>
  );
}
