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
        identity1={ word.identity1 }
        identity2={ word.identity2 }
        key={ word.value }
        gameID={ this.props.gameID }
        player={ this.props.player }
        onGuess={ this.props.onGuess }
      />
    );
  }
  render () {
    return (
      <div className="Board">
        { this.props.words.map(this.createWordCard) }
      </div>
    );
  }
}

export default Board;
