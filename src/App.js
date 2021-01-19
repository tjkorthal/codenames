import React, { Component } from 'react';
import './App.css';
import Board from './Board.js';

const words = [
  'night',
  'arrival',
  'blood',
  'cousin',
  'boyfriend',
  'climate',
  'country',
  'oasis',
  'procedure',
  'pizza',
  'media',
  'fortune',
  'mall',
  'injury',
  'bread',
  'disease',
  'writer',
  'diamond',
  'guitar',
  'assistant',
  'football',
  'student',
  'midnight',
  'uncle',
  'ear'
];

const identities = [
  'assassin', 'assassin', 'assassin',
  'agent', 'agent', 'agent', 'agent', 'agent', 'agent', 'agent', 'agent', 'agent',
  'bystander', 'bystander', 'bystander', 'bystander', 'bystander', 'bystander', 'bystander', 'bystander', 'bystander', 'bystander', 'bystander', 'bystander', 'bystander'
];

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 class='title'>Codenames</h1>
          <h2 class='title'>{ this.props.gameID }</h2>
          <Board cards={ this.props.words }
            identities={ this.props.identities }
          />
          <button>Create New Game</button>
          <button>Join Game</button>
        </header>
      </div>
    );
  }
}

export default App;

App.defaultProps = {
  words: words.sort(() => Math.random() - 0.5),
  identities: identities.sort(() => Math.random() - 0.5)
}
