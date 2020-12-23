import React from "react";
import { useParams } from "react-router-dom";

import TestFlow from "../pages/TestFlow";

function TestRoute({testsMetaData}) {
  const { testSlug } = useParams();
  const { file } = testsMetaData.tests.find(
    (testMetaData) => testMetaData.slug === testSlug
  );
  if (!file) {
    return <div>Unknown test</div>;
  }
  return <TestFlow dataFilePath={file} />;
}

export default TestRoute;
