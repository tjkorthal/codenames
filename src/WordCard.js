import React, { PureComponent } from 'react';
import './WordCard.css';
import axios from 'axios';

const assassins = ['🔫', '💣', '🔪', '🗡'];
const agents = [
  '🕵🏻‍♀️', '🕵🏼‍♀️', '🕵🏽‍♀️', '🕵🏾‍♀️', '🕵🏿‍♀️',
  '🕵🏻', '🕵🏼', '🕵🏽', '🕵🏾', '🕵🏿',
  '🕵🏻‍♂️', '🕵🏼‍♂️', '🕵🏽‍♂️', '🕵🏾‍♂️', '🕵🏿‍♂️'
];
const bystanders = ['👵🏼', '👨🏽‍🦳', '👨🏻‍🦰', '👨🏾‍💼', '👮🏿‍♂️'];
class WordCard extends PureComponent {
  constructor(props) {
    super(props);
    this.makeGuess = this.makeGuess.bind(this);
    this.identity = this.identity.bind(this);
    this.secretIdentity = this.secretIdentity.bind(this);
    this.wordOrIcon = this.wordOrIcon.bind(this);
  }
  // TODO: show bystander icon for words the other player still needs to guess
  bystanderIcon () {
    if (this.secretIdentity() !== 'bystander' || this.props.reveal) { return; }
    return (
      <div className='icon'>
        { this.icon('bystander') }
      </div>
    );
  }
  icon (identity) {
    if (identity === 'assassin') {
      return assassins[Math.floor(Math.random() * assassins.length)];
    } else if (identity === 'agent') {
      return agents[Math.floor(Math.random() * agents.length)];
    }
    return bystanders[Math.floor(Math.random() * bystanders.length)];;
  }
  identity () {
    if (this.props.reveal) { return this.props.reveal; }
    return this.props.player === 1 ? this.props.identity1 : this.props.identity2;
  }
  makeGuess() {
    // TODO: consider if it's the current player's turn
    if (!this.props.gameID || (this.props.identity1 && this.props.identity2)) { return; }

    axios.post('http://localhost:3000/game/guess',
              {
                game: {
                  word: this.props.value,
                  code: this.props.gameID,
                  player: this.props.player
                }
              })
         .then(response => {
          // TODO: something here?
          // As long as it succeeds we're good. Currently relying on
          // webhooks to update both players.
         })
         .catch(function(error) {
          console.error(error);
        });
  }
  secretIdentity () {
    return this.props.player === 1 ? this.props.identity2 : this.props.identity1
  }
  wordOrIcon () {
    if (this.props.reveal) { return this.icon(this.props.reveal); }
    return this.props.value;
  }
  render() {
    return (
      <div onClick={ this.makeGuess } className={`WordCard ${this.identity()}`}>
        { this.bystanderIcon() }
        <div className='word'>
          { this.wordOrIcon() }
        </div>
      </div>
    );
  }
}

export default WordCard;
