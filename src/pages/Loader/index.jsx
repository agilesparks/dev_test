import React from 'react';
import styled from 'styled-components';
import {WanderingCubes} from 'styled-spinkit';
import {withTheme} from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
function Loader({theme}) {
  return (
    <Container>
      <WanderingCubes color={theme.color1} size={60}/>
      Sending to server...
    </Container>
  )
}

export default withTheme(Loader);