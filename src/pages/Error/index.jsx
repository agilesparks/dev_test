import React from 'react';
import Header from '../../components/Header';
import PageContainer from '../../components/PageContainer';
const testData = require('../../data/' + process.env.REACT_APP_TEST_ID + '.json');

export default function ErrorPage({data}) {
  return (
    <PageContainer>
      <Header>
        {testData.title}
      </Header>
      There was an error submitting, sorry for that<br/>
      Please send your answers by mail:<br/>
      {data.toString()}
    </PageContainer>
  )
}