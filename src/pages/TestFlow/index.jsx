import React from "react";
import { fetchTestData } from "../../apiService";
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
    return <div>Loading...</div>;
  }
  if (loadState.isError) {
    return <div>Loading Error :(</div>;
  }

  return <Content testData={loadState.data} />;
}

export default TestFlow;
