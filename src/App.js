import React, { Component } from 'react';
import Home from './pages/Home';
import Test from './pages/Test';
import Loader from'./pages/Loader';
import Final from './pages/Final';
import Error from './pages/Error';
import theme from './theme';
import {ThemeProvider} from 'styled-components';
const testData = require('./data/' + process.env.REACT_APP_TEST_ID + '.json');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: 'home',
      userData: {},
      userAnswers: [],
      tsStart: null,
      tsEnd: null,
    }
  }

  handleUserFormSubmit = (data) => {
    this.setState({
      currentView: 'test',
      userData: data,
      tsStart: new Date().toLocaleString(),
    });

    // Log start
    fetch(
      process.env.REACT_APP_API_URL, { 
        method: 'POST', 
        body: JSON.stringify({
          docId: process.env.REACT_APP_DOC_ID,
          action: 'start',
          payload: {
            name: data.name,
          }
        })
      }
    )
  }

  handleTestSubmit = (data) => {
    this.setState({
      currentView: 'loader',
      userAnswers: data,
    });

    const finalData = {
      name: this.state.userData.name,
      exp: this.state.userData.exp,
      tsStart: this.state.tsStart,
      tsEnd: new Date().toLocaleString(),
    }
    data.forEach((ans, idx) => {
      finalData['a' + idx] = ans
    })
    
    console.log('Send to server', finalData);
    fetch(process.env.REACT_APP_API_URL, { 
      method: 'POST', 
      body: JSON.stringify({
        docId: process.env.REACT_APP_DOC_ID,
        action: 'finish',
        payload: finalData,
      })
    })
    .then(response => {
      console.log('Success!', response)
      this.setState({
        currentView: 'final',
      })
    })
    .catch(error => {
      console.error('Error!', error.message)
      this.setState({
        currentView: 'error',
      })
    });

    // setTimeout(() => {
    //   this.setState({
    //     currentView: 'final',
    //   })
    // }, 500)
  }

  renderContent = () => {
    if (this.state.currentView === 'home') {
      return (<Home 
        onSubmit={this.handleUserFormSubmit}
        title={testData.title}
        duration_min={testData.duration_min}
        technology={testData.technology}
      />)
    }
    if (this.state.currentView === 'test') {
      return (<Test testData={testData} onSubmit={this.handleTestSubmit}/>)
    }
    if (this.state.currentView === 'loader') {
      return (<Loader/>)
    }
    if (this.state.currentView === 'final') {
      return (<Final title={testData.title}/>)
    }
    if (this.state.currentView === 'error') {
      return (<Error data={this.state.userAnswers} title={testData.title}/>)
    }
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        {this.renderContent()}
      </ThemeProvider>
    );
  }
}

export default App;
