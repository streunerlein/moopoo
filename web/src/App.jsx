import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import SettingsComponent from './SettingsComponent';
import LiveComponent from './LiveComponent';
import ImageComponent from './ImageComponent';
import logo from './logo.png'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#efefef',
      dark: '#555'
    }
  },
});

class App extends React.Component {
  state = {
    tabIx: 0,
    words: {
      "blockchain": "unnecessary complication",
      "machine intelligence": "overrated technology",
      "artificial intelligence": "a bunch of if statements",
      "machine learning": "machine slavery",
      "algorithms": "unreadable code",
      "computers": "rocks with lightning",
      "computer": "a rock with lightning",
      "statistical": "out of date",
      "programmed": "broken",
      "data": "random text",
      "predictions": "random guesses",

      /* made for https://www.reddit.com/r/linusrants/hot/ */
      rant: "love-speech",
      rants: "love-speeches",
      fart: "look",
      "call your mother a hamster": "congratulate your mother for making you",
      stupidity: "geniousness",
      snuffed: "overwhelmed",
      "fucking asshole": "not the hero we need, but the hero we deserve",
      "real toilet paper": "your code",
      "I won't have splinters and ink up my arse": "projects would be much more innovative",
      "die as babies": "become super popular",
      "stupid to find a tit to suck on": "good to write such code",
      "garbage": "on another level",
      DAMMIT: "MAKE PEACE NOT WAR",
      "either genius, or a seriously diseased mind. I can't quite tell which": "beyond genius",
      clown: "right",

      sucks: 'rocks'
    }
  };

  componentDidMount() {
    const words = localStorage.getItem('words');

    if (words) {
      this.setState({
        words: JSON.parse(words)
      });
    }
    else {
      this.saveState();
    }
  }

  saveState() {
    localStorage.setItem('words', JSON.stringify(this.state.words));
  }

  add(moo, poo) {
    let words = Object.assign(this.state.words);
    words[moo] = poo;

    this.setState({
      words: words
    });

    this.saveState();
  }

  remove(moo) {
    let words = Object.assign(this.state.words);
    delete words[moo];

    this.setState({
      words: words
    });

    this.saveState();
  }

  handleChange = (event, value) => {
    this.setState({ tabIx: value });
  };

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="app">
          <img src={logo} style={{maxHeight:'15vh'}} />
          <h1 style={{fontFamily: "'Varela Round', sans-serif", fontSize: '45px'}}>moopoo</h1>
          <Tabs
              value={this.state.tabIx}
              indicatorColor="primary"
              onChange={this.handleChange}
              centered
            >
            <Tab label="Live" />
            <Tab label="File" />
            <Tab label="Settings" />
          </Tabs>
          {this.state.tabIx === 0 &&
            <div>
              <LiveComponent
                words={this.state.words}
              />
            </div>
          }
          {this.state.tabIx === 1 &&
            <div>
              <ImageComponent
                words={this.state.words}
              />
            </div>}
          {this.state.tabIx === 2 &&
            <div>
              <SettingsComponent
                add={(moo, poo) => this.add(moo, poo)}
                remove={(moo) => this.remove(moo)}
                words={this.state.words}
              />
            </div>}
        </div>
        <Button variant="contained" color="primary" style={{
          position: 'absolute',
          top: '5vh',
          right: '1vw',
        }} onClick={() => window.location.href="/moopoo-extension.zip"}>
          Get Extension
        </Button>
      </MuiThemeProvider>
    );
  }
}

export default App;
