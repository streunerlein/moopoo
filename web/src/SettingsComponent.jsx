import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';

class SettingsComponent extends React.Component {
  state = {
    words: {
      "ai": "nonono",
      "mechanical engineering": "dsfds sfesfes dsfsd",
      "artificial ": "something different ",
    },
    currentMoo: '',
    currentPoo: ''
  };

  componentDidMount() {
    const words = localStorage.getItem('words');
    if (words) {
      this.setState({
        words: JSON.parse(words)
      });
    }
    else {
      this.setState({
        words: {
          "blockchain": "unnecessary complication",
          "machine intelligence": "overrated technology",
          "artificial intelligence": "a bunch of if statements (AI)",
          "machine learning": "machine slavery",
          "algorithms": "unreadable code",
          "computers": "rocks with lightning",
          "computer": "a rock with lightning",
          "statistical": "out of date",
          "programmed": "broken",
          "data": "random text",
          "predications": "random guesses",
    
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
          clown: "right"
        }
      });
    }
  }

  saveState() {
    localStorage.setItem('words', JSON.stringify(this.state.words));
  }

  handleAdd(e) {
    e.preventDefault();

    let words = Object.assign(this.state.words);
    words[this.state.currentMoo] = this.state.currentPoo;

    this.setState({
      words: words,
      currentMoo: '',
      currentPoo: ''
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

  render() {
    const list = Object.entries(this.state.words).map(([moo, poo]) => {
      return (
        <TableRow key={moo}>
          <TableCell>{moo}</TableCell>
          <TableCell>{poo}</TableCell>
          <TableCell>
            <IconButton onClick={(e) => this.remove(moo)} aria-label="Delete">
              <Icon>delete</Icon>
            </IconButton>
          </TableCell>
        </TableRow>
      );
    })
    return (
      <div style={{maxWidth: '1000px', margin: '2em auto'}}>
        <Paper>
          <form onSubmit={e => this.handleAdd(e)}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Moo</TableCell>
                  <TableCell>Poo</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell>
                    <TextField
                      id="moo"
                      label="New Moo"
                      value={this.state.currentMoo}
                      onInput={e => this.setState({'currentMoo': e.target.value})}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      id="poo"
                      label="New Poo"
                      value={this.state.currentPoo}
                      onInput={e => this.setState({'currentPoo': e.target.value})}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton type="submit" aria-label="Add">
                      <Icon>add_circle</Icon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </form>
        </Paper>
      </div>
    );
  }
}

export default SettingsComponent;