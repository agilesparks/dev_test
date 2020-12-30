import React from "react";
import Header from "../../components/Header";
import PageContainer from "../../components/PageContainer";

export default function FinalPage({ title }) {
  return (
    <PageContainer>
      <Header>{title}</Header>
      <p>
        Thanks for completing the test!
        <br />
        We'll review it and be in touch soon.
      </p>
    </PageContainer>
  );
}
