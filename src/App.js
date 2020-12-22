import React, { Component } from "react";
import Index from "./pages/Index";
import TestFlow from "./pages/TestFlow";
import theme from "./theme";
import { ThemeProvider } from "styled-components";
import { Helmet } from "react-helmet";
import testsMetaData from "./data/index.json";

class App extends Component {
  renderContent = () => {
    const { pathname } = document.location;
    const testSlug = pathname.split('/')[1];

    if (testSlug) {
      const { file } = testsMetaData.tests.find(
        (testMetaData) => testMetaData.slug === testSlug
      );
      if (!file) {
        return <div>Unknown test</div>;
      }
      return <TestFlow dataFilePath={file} />;
    }
    return <Index data={testsMetaData} />;
  };

  render() {
    return (
      <>
        <Helmet>
          <title>{testsMetaData.company_name} Online Tests</title>
          <meta name="description" content={`${testsMetaData.company_name} Online Tests`} />
        </Helmet>
        <ThemeProvider theme={theme}>{this.renderContent()}</ThemeProvider>
      </>
    );
  }
}

export default App;
