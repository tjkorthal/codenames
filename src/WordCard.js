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
  constructor(props) {
    super(props);
    this.makeGuess = this.makeGuess.bind(this);
    this.identity = this.identity.bind(this);
    this.secretIdentity = this.secretIdentity.bind(this);
    this.coverWord = this.coverWord.bind(this);
    this.state = {
      value: this.props.value,
      identity1: this.props.identity1,
      identity2: this.props.identity2,
      p1_guessed: this.props.p1_guessed,
      p2_guessed: this.props.p2_guessed
    }
  }
  // show bystander icon for words the other player still needs to guess
  bystanderIcon() {
    if (this.secretIdentity() !== 'bystander') { return; }
    return (
      <div className='icon'>
        { this.icon(this.state.identity) }
      </div>
    );
  }
  // replace word with agent/assassin and change card color to match
  coverWord() {
    let secretIdentity = this.secretIdentity();
    this.setState({
      value: this.icon(secretIdentity),
      identity1: secretIdentity,
      identity2: secretIdentity
     }
    );
  }
  icon(identity) {
    if (identity === 'assassin') {
      return assassins[Math.floor(Math.random() * assassins.length)];
    } else if (identity === 'agent') {
      return agents[Math.floor(Math.random() * agents.length)];
    }
    return bystanders[Math.floor(Math.random() * bystanders.length)];;
  }
  identity () {
    return this.props.player === 1 ? this.state.identity1 : this.state.identity2
  }
  makeGuess() {
    // TODO: return if already guessed
    axios.post('http://localhost:3000/game/guess',
              {
                game: {
                  word: this.props.value,
                  code: this.props.gameID,
                  player: this.props.player
                }
              })
         .then(response => {
           this.setState({
            identity1: response.data.identity1,
            identity2: response.data.identity2
           }
          );
           //  don't overwrite word with bystander icon
           if (this.secretIdentity() !== 'bystander') {
             this.coverWord();
           }
           this.props.onGuess(response.data);
         })
         .catch(function(error) {
          console.error(error);
        });
  }
  secretIdentity () {
    return this.props.player === 1 ? this.state.identity2 : this.state.identity1
  }
  render() {
    return (
      <div onClick={ this.makeGuess } className={`WordCard ${this.identity()}`}>
        { this.bystanderIcon() }
        <div className='word'>
          { this.state.value }
        </div>
      </div>
    );
  }
}

export default WordCard;
