import React from "react";
import { submitUserInfo, submitTest } from "../../apiService";

import Home from "../Home";
import TestRunner from "../TestRunner";
import Loader from "../Loader";
import Final from "../Final";
import SubmitError from "../SubmitError";

const LOCAL_STORAGE_KEY_NAME = "LOCAL_STORAGE_KEY_NAME";

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
      localStorage[LOCAL_STORAGE_KEY_NAME] = data.name;
      setCurrentView(VIEWS.Test);
      setUseData(data);
      setTsStart(Date.now());

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
        const response = await submitTest({
          docId: testData.doc_id,
          userData,
          answers: data,
          tsStart,
          tsEnd: Date.now(),
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
      return <Loader message="Sending to server..." />;
    case VIEWS.Error:
      return <SubmitError data={answers} title={testData.title} />;
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
          userName={localStorage[LOCAL_STORAGE_KEY_NAME]}
        />
      );
  }
}

export default Content;
