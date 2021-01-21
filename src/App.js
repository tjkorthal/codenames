import React, { Component } from 'react';
import './App.css';
import Board from './Board.js';
import Sidebar from './Sidebar.js';
import axios from 'axios';

const wordList = [
  'NIGHT',
  'ARRIVAL',
  'BLOOD',
  'COUSIN',
  'BOYFRIEND',
  'CLIMATE',
  'COUNTRY',
  'OASIS',
  'PROCEDURE',
  'PIZZA',
  'MEDIA',
  'FORTUNE',
  'MALL',
  'INJURY',
  'BREAD',
  'DISEASE',
  'WRITER',
  'DIAMOND',
  'GUITAR',
  'ASSISTANT',
  'FOOTBALL',
  'STUDENT',
  'MIDNIGHT',
  'UNCLE',
  'EAR'
].sort(() => Math.random() - 0.5);

const identities = [
  'assassin', 'assassin', 'assassin',
  'agent', 'agent', 'agent', 'agent', 'agent', 'agent', 'agent', 'agent', 'agent',
  'bystander', 'bystander', 'bystander', 'bystander', 'bystander', 'bystander', 'bystander', 'bystander', 'bystander', 'bystander', 'bystander', 'bystander', 'bystander'
].sort(() => Math.random() - 0.5);

const wordMap = wordList.map(function(word, index){
  return {
    value: word,
    identity1: identities[index]
  };
});
class App extends Component {
  constructor() {
    super();
    this.createGame = this.createGame.bind(this);
    this.loadGame = this.loadGame.bind(this);
    this.onGuess = this.onGuess.bind(this);
    this.state = {
      words: wordMap,
      player: 1, // TODO: move to props
      playerTurn: 1
    };
  }
  createGame() {
    axios.post('http://localhost:3000/game/create')
         .then(response => {
           console.log(response);
           this.setState({
             words: response.data.words,
             gameID: response.data.code,
             player: response.data.player,
             gameStatus: response.data.game_status
            });
         })
         .catch(function(error) {
          console.error(error);
        });
  }
  loadGame() {
    let gameID = document.getElementById('gameCode').value;
    if (!gameID) { return; }

    axios.get(`http://localhost:3000/game/${gameID}`)
         .then(response => {
           this.setState({
             words: response.data.words,
             gameID: response.data.code,
             player: response.data.player,
             gameStatus: response.data.game_status
            });
         })
         .catch(function(error) {
          console.error(error);
        });
  }
  onGuess (params) {
    this.setState({
      gameStatus: params.game.status,
      playerTurn: params.game.current_player_turn
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className='title'>Codenames</h1>
          <h2 className='title'>{ this.state.gameID }</h2>
          <Board words={ this.state.words }
                 gameID={ this.state.gameID }
                 player={ this.state.player }
                 onGuess={ this.onGuess }>
          </Board>
          <Sidebar playerTurn={ this.state.playerTurn }
                   player={ this.state.player }
                   gameID={ this.state.gameID }
                   gameStatus={ this.state.gameStatus }
          />
          <button onClick={ this.createGame }>Create New Game</button>
          <input id='gameCode' placeholder='CODE' size='4'></input>
          <button onClick={ this.loadGame }>Join Game</button>
        </header>
      </div>
    );
  }
}

export default App;
