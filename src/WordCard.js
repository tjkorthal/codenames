import React, { Component } from 'react';
import './WordCard.css';
import axios from 'axios';

const assassins = ['🔫', '💣', '🔪', '🗡'];
const agents = [
  '🕵🏻‍♀️', '🕵🏼‍♀️', '🕵🏽‍♀️', '🕵🏾‍♀️', '🕵🏿‍♀️',
  '🕵🏻', '🕵🏼', '🕵🏽', '🕵🏾', '🕵🏿',
  '🕵🏻‍♂️', '🕵🏼‍♂️', '🕵🏽‍♂️', '🕵🏾‍♂️', '🕵🏿‍♂️'
];
const bystanders = ['👵🏼', '👨🏽‍🦳', '👨🏻‍🦰', '👨🏾‍💼', '👮🏿‍♂️'];
class WordCard extends Component {
  constructor() {
    super();
    this.makeGuess = this.makeGuess.bind(this);
  }
  icon() {
    if (this.props.identity === 'assassin') {
      return assassins[Math.floor(Math.random() * assassins.length)];
    } else if (this.props.identity === 'agent') {
      return agents[Math.floor(Math.random() * agents.length)];
    }
    return '';
  }
  iconEl() {
    if (this.props.identity === 'bystander') { return; }
    return (
      <div className='icon'>
        { this.icon() }
      </div>
    );
  }
  makeGuess() {
    axios.post('http://localhost:3000/game/guess',
              {
                game: {
                  word: this.props.value,
                  code: this.props.gameID,
                  player: this.props.player
                }
              })
         .then(response => {
           this.props.onGuess(response.data);
         })
         .catch(function(error) {
          console.error(error);
        });
  }
  render() {
    return (
      <div onClick={ this.makeGuess } className={`WordCard ${this.props.identity}`}>
        { this.iconEl() }
        <div className='word'>
          { this.props.value }
        </div>
      </div>
    );
  }
}

export default WordCard;
