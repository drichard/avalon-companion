import React, { Component } from 'react';
import classNames from 'classnames'
import { start, stop } from './speech';

import './bootstrap.min.css';
import './App.css';

const Player = ({ num, isActive, onSelect }) => (
  <label className={classNames('btn', 'btn-primary', 'player', { active: isActive })} onClick={() => onSelect(num)}>
    <input type="radio" name="numPlayers" id={num} />
    {num}
  </label>
);

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      numPlayers: 9,
      isSpeaking: false,
      startingPlayer: null
    };
  }

  handleStart = () => {
    const { isSpeaking, numPlayers } = this.state;

    if (isSpeaking) {
      this.setState({ isSpeaking: false });
      stop();
    } else {
      this.setState({
        isSpeaking: true,
        startingPlayer: Math.floor(Math.random() * numPlayers) + 1
      });
      start(numPlayers);
    }
  }

  handleSelectPlayer = (num) => {
    this.setState({ numPlayers: num });
  }

  render() {
    const { isSpeaking, numPlayers, startingPlayer } = this.state;

    return (
      <div className="container">
        <h1 className="py-4 text-center">AVALON COMPANION</h1>

        <div className="py-4">
          <h4>Players</h4>
          <div className="btn-group btn-group-toggle d-flex">
            {[7, 8, 9, 10].map((num) => (
              <Player key={num} num={num} isActive={num === numPlayers} onSelect={this.handleSelectPlayer} />
            ))}
          </div>
        </div>

        <div className="py-4">
          <h4>Characters</h4>
          Coming soon...
        </div>

        <div className="_fixed-bottom py-4">
          <button onClick={this.handleStart} type="button" className="btn btn-primary btn-lg btn-block">
            {isSpeaking ? "Stop" : "Start"}
          </button>
        </div>
        {startingPlayer && <h2 className="py-2 text-center">Starting player: {startingPlayer}</h2>}
      </div>
    );
  }
}

export default App;
