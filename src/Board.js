import React, { Component } from 'react';
import WordCard from './WordCard.js';
import './Board.css';

class Board extends Component {
  constructor() {
    super();
    this.createWordCard = this.createWordCard.bind(this);
  }
  createWordCard (word) {
    return (
      <WordCard
        value={ word.value }
        identity={ word.identity }
        key={ word.value }
        gameID={ this.props.gameID }
        player={ this.props.player }
        onGuess={ this.onGuess }
      />
    );
  }
  onGuess (params) {
    console.log(params)
  }
  render () {
    return (
      <div>
        <div className="Board">
         { this.props.words.map(this.createWordCard) }
        </div>
      </div>
    );
  }
}

export default Board;
