import React, { Component } from 'react';
import Home from './pages/Home';
import Test from './pages/Test';
import Loader from'./pages/Loader';
import Final from './pages/Final';
import theme from './theme';
import {ThemeProvider} from 'styled-components';

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
  }

  handleTestSubmit = (data) => {
    this.setState({
      currentView: 'loader',
      userAnswers: data,
    });

    const finalData = {
      name: this.state.userData.name,
      tsStart: this.state.tsStart,
      tsEnd: new Date().toLocaleString(),
    }
    data.forEach((ans, idx) => {
      finalData['a' + idx] = ans
    })
    
    console.log('Send to server', finalData); //TODO
    fetch(process.env.REACT_APP_API_URL, { method: 'POST', body: JSON.stringify(finalData)})
      .then(response => {
        console.log('Success!', response)
        this.setState({
          currentView: 'final',
        })
      })
      .catch(error => console.error('Error!', error.message))

    // setTimeout(() => {
    //   this.setState({
    //     currentView: 'final',
    //   })
    // }, 500)
  }

  renderContent = () => {
    if (this.state.currentView === 'home') {
      return (<Home onSubmit={this.handleUserFormSubmit}/>)
    }
    if (this.state.currentView === 'test') {
      return (<Test onSubmit={this.handleTestSubmit}/>)
    }
    if (this.state.currentView === 'loader') {
      return (<Loader/>)
    }
    if (this.state.currentView === 'final') {
      return (<Final/>)
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
