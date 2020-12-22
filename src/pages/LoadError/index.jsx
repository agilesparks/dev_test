import React from "react";
import Header from "../../components/Header";
import PageContainer from "../../components/PageContainer";

export default function LoadErrorPage() {
  return (
    <PageContainer>
      <Header>Data Load Error</Header>
      <p>
        There was an error loading data, sorry for that :(
        <br />
        Please refresh the page and try again
      </p>
    </PageContainer>
  );
}
