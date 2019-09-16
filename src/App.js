import React, {Component} from 'react';
import './App.css';
import {CssBaseline} from '@material-ui/core';
import NavBar from './components/NavBar';
import Body from './components/Body';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      navOpenStatus: true,
    };
  }

  onNavMenuClick = () => {
    this.setState((oldState) => ({
      navOpenStatus: !oldState.navOpenStatus,
    }));
  };

  render() {

    return (
        <div style={{display: "flex", flexDirection: "column", height:"100%"}}>
          <CssBaseline/>
          <NavBar onNavMenuClick={this.onNavMenuClick}/>
          <Body className={'Body'} navOpenStatus={this.state.navOpenStatus}/>
        </div>
    );
  }
}

export default App;
