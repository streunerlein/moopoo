import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import SettingsComponent from './SettingsComponent';
import LiveComponent from './LiveComponent';
import FileComponent from './FileComponent';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: 'dark'
  },
});

class App extends React.Component {
  state = {
    tabIx: 0,
  };

  handleChange = (event, value) => {
    this.setState({ tabIx: value });
  };

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="app">
          <h1>MooPoo</h1>
          <Tabs
              value={this.state.tabIx}
              indicatorColor="primary"
              textColor="paper"
              onChange={this.handleChange}
              centered
            >
            <Tab label="Live" />
            <Tab label="File" />
            <Tab label="Settings" />
          </Tabs>
          {this.state.tabIx === 0 && <div><LiveComponent /></div>}
          {this.state.tabIx === 1 && <div><FileComponent /></div>}
          {this.state.tabIx === 2 && <div><SettingsComponent /></div>}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
