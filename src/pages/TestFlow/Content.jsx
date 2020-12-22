import React from "react";
import { submitUserInfo, submitTest } from "../../apiService";

import Home from "../Home";
import TestRunner from "../TestRunner";
import Loader from "../Loader";
import Final from "../Final";
import Error from "../Error";

const VIEWS = {
  Home: "home",
  Test: "test",
  Loader: "loader",
  Final: "final",
  Error: "error",
};

function Content({ testData }) {
  const [currentView, setCurrentView] = React.useState(VIEWS.Home);
  const [userData, setUseData] = React.useState(null);
  const [answers, setAnswers] = React.useState(null);
  const [tsStart, setTsStart] = React.useState(null);

  const handleUserFormSubmit = React.useCallback(
    async (data) => {
      setCurrentView(VIEWS.Test);
      setUseData(data);
      setTsStart(Date().toLocaleString());

      // Log start
      submitUserInfo(testData.doc_id, data.name);
    },
    [testData.doc_id]
  );

  const handleTestSubmit = React.useCallback(
    async (data) => {
      setCurrentView(VIEWS.Loader);
      setAnswers(data);

      try {
        const tsEnd = new Date().toLocaleString();
        const response = await submitTest({
          docId: testData.doc_id,
          userData,
          answers: data,
          tsStart,
          tsEnd,
        });

        console.log("Success!", response);
        setCurrentView(VIEWS.Final);
      } catch (error) {
        console.error("Error!", error.message);
        setCurrentView(VIEWS.Error);
      }
    },
    [testData.doc_id, tsStart, userData]
  );

  switch (currentView) {
    case VIEWS.Loader:
      return <Loader />;
    case VIEWS.Error:
      return <Error data={answers} title={testData.title} />;
    case VIEWS.Final:
      return <Final title={testData.title} />;
    case VIEWS.Test:
      return <TestRunner testData={testData} onSubmit={handleTestSubmit} />;
    case VIEWS.Home:
    default:
      return (
        <Home
          onSubmit={handleUserFormSubmit}
          title={testData.title}
          duration_min={testData.duration_min}
          technology={testData.technology}
          questionsCount={testData.questions.length}
        />
      );
  }
}

export default Content;
