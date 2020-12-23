import React from "react";
import { ThemeProvider } from "styled-components";
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import theme from "./theme";
import TestRoute from "./routes/TestRoute";
import IndexRoute from "./routes/IndexRoute";

import testsMetaData from "./data/index.json";

function App() {
  return (
    <>
      <Helmet>
        <title>{testsMetaData.company_name} Online Tests</title>
        <meta
          name="description"
          content={`${testsMetaData.company_name} Online Tests`}
        />
      </Helmet>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path="/:testSlug">
              <TestRoute testsMetaData={testsMetaData} />
            </Route>
            <Route path="*">
              <IndexRoute data={testsMetaData} />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
