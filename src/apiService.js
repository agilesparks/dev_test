export function fetchTestData(dataFilePath) {
  return import(
    /* webpackInclude: /\.json$/ */
    /* webpackChunkName: "[request]" */
    /* webpackMode: "lazy" */
    `./data/${dataFilePath}`
  ).then((res) => res.default);
}

export function submitUserInfo(docId, name) {
  return fetch(process.env.REACT_APP_API_URL, {
    method: "POST",
    body: JSON.stringify({
      docId: docId,
      action: "start",
      payload: {
        name: name,
      },
    }),
  });
}

export function submitTest({docId, userData, answers, tsStart, tsEnd}) {
  const finalData = {
    name: userData.name,
    exp: userData.exp,
    tsStart: new Date(tsStart).toISOString(),
    tsEnd: new Date(tsEnd).toISOString(),
  };
  answers.forEach((ans, idx) => {
    finalData["a" + idx] = ans;
  });

  console.log("Send to server", finalData);
  return fetch(process.env.REACT_APP_API_URL, {
    method: "POST",
    body: JSON.stringify({
      docId: docId,
      action: "finish",
      payload: finalData,
    }),
  });
}
