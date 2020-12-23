import React from "react";
import Header from "../components/Header";
import PageContainer from "../components/PageContainer";
import Link from "../components/Link";

function IndexRoute({ data }) {
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
              <Link to={test.slug}>{test.name}</Link>
            </li>
          ))}
        </ul>
      </section>
      Good luck!
    </PageContainer>
  );
}

export default IndexRoute;
