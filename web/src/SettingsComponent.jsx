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
    currentMoo: '',
    currentPoo: ''
  };

  handleAdd = (event) => {
    event.preventDefault();

    this.setState({
      currentMoo: '',
      currentPoo: ''
    });

    this.props.add(this.state.currentMoo, this.state.currentPoo);
  };

  render() {
    const list = Object.entries(this.props.words).map(([moo, poo]) => {
      return (
        <TableRow key={moo}>
          <TableCell>{moo}</TableCell>
          <TableCell>{poo}</TableCell>
          <TableCell>
            <IconButton onClick={(e) => this.props.remove(moo)} aria-label="Delete">
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