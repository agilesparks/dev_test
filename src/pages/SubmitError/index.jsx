import React from 'react';
import Header from '../../components/Header';
import PageContainer from '../../components/PageContainer';

export default function SubmitErrorPage({data, title}) {
  return (
    <PageContainer>
      <Header>
        {title}
      </Header>
      There was an error submitting, sorry for that<br/>
      Please send your answers by mail:<br/>
      {data.toString()}
    </PageContainer>
  )
}