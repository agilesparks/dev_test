import React from 'react';
import Header from '../../components/Header';
import PageContainer from '../../components/PageContainer';
const testData = require('../../data/' + process.env.REACT_APP_TEST_ID + '.json');

export default function FinalPage() {
  return (
    <PageContainer>
      <Header>
        {testData.title}
      </Header>
      Thanks for completing the test!<br/>
      We'll review it and be in touch soon.
    </PageContainer>
  )
}