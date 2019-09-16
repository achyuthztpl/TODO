import React, {Component} from 'react';
import './App.css';
import ls from 'local-storage';
import {CssBaseline} from '@material-ui/core';
import NavBar from './components/NavBar';
import Body from './components/Body';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      navOpenStatus: true,
    };
    if (!ls.get('init')) {
      ls.set('init', new Date());
      ls.set('lists', {
        1568629773244: {label: 'Personal'},
        1568629773245: {label: 'Work'},
        1568629773246: {label: 'Grocery List'},
      });
      ls.set("tasks", []);
    }
  }

  onNavMenuClick = () => {
    this.setState((oldState) => ({
      navOpenStatus: !oldState.navOpenStatus,
    }));
  };

  render() {

    return (
        <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
          <CssBaseline/>
          <NavBar onNavMenuClick={this.onNavMenuClick}/>
          <Body className={'Body'} navOpenStatus={this.state.navOpenStatus}/>
        </div>
    );
  }
}

export default App;
