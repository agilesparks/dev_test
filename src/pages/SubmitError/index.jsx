import React from "react";
import styled from "styled-components";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Header from "../../components/Header";
import PageContainer from "../../components/PageContainer";

const Frame = styled.div`
  border: 1px solid silver;
  padding: 0.5em;
  margin-top: 1em;
  display: inline-block;
  margin-right: 1em;
  vertical-align: bottom;
  border-radius: 5px;
`;

export default function SubmitErrorPage({ data, title }) {
  const [copied, setCopied] = React.useState(false);
  return (
    <PageContainer>
      <Header>{title}</Header>
      There was an error submitting, sorry for that
      <br />
      Please send your answers by mail:
      <br />
      <Frame>{data.toString()}</Frame>
      <CopyToClipboard
        text={data.toString()}
        onCopy={() => setCopied(true)}
      >
        <button>{copied ? "Copied" : "Copy Answers"}</button>
      </CopyToClipboard>
    </PageContainer>
  );
}
