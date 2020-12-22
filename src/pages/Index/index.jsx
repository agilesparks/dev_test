import React from "react";
import Header from "../../components/Header";
import PageContainer from "../../components/PageContainer";
import Anchor from "../../components/Anchor";

function Index({ data }) {
  return (
    <PageContainer>
      <Header>{data.company_name} Online Tests</Header>
      <section>
        <p>
          Welcome!
          <br />
          Please pick your test:
        </p>
        <ul>
          {data.tests.map((test) => (
            <li key={test.slug}>
              <Anchor href={test.slug}>{test.name}</Anchor>
            </li>
          ))}
        </ul>
      </section>
      Good luck!
    </PageContainer>
  );
}

export default Index;
