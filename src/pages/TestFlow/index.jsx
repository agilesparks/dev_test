import React from "react";
import { fetchTestData } from "../../apiService";
import Loader from "../Loader";
import LoadError from "../LoadError";
import Content from "./Content";

function TestFlow({ dataFilePath }) {
  const [loadState, setLoadState] = React.useState({
    isLoading: true,
    isError: false,
    data: null,
  });

  // Load test data
  React.useEffect(() => {
    async function fetchData() {
      setLoadState((prevState) => ({
        ...prevState,
        isLoading: true,
      }));
      try {
        const testData = await fetchTestData(dataFilePath);
        setLoadState((prevState) => ({
          ...prevState,
          isLoading: false,
          data: testData,
        }));
      } catch (err) {
        setLoadState((prevState) => ({
          ...prevState,
          isLoading: false,
          isError: true,
          data: null,
        }));
        console.error(err.toString());
      }
    }
    fetchData();
  }, [dataFilePath]);

  if (loadState.isLoading) {
    return <Loader message="Loading Test Data..."/>;
  }
  if (loadState.isError) {
    return <LoadError/>;
  }

  return <Content testData={loadState.data} />;
}

export default TestFlow;
