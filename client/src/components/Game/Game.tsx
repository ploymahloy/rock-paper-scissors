import React, { useState } from 'react';

import Player from '../Player';

import './Game.css';

type GameProps = {
  incrementScore: () => void;
}

export default function Game (props: GameProps) {
  const choices = ['rock', 'paper', 'scissors'];

  const { incrementScore } = props;

  const [ userSelection, setUserSelection ] = useState('');
  const [ computerSelection, setComputerSelection ] = useState('');
  const [ winner, setWinner ] = useState('');

  function determineWinner (user: string, computer: string) {
    if (user === computer) {
      return 'Draw!';
    } else if (
      (user === 'rock'     && computer === 'scissors') ||
      (user === 'scissors' && computer === 'paper')    ||
      (user === 'paper'    && computer === 'rock')
    ) {
      return 'Player One Wins!';
    } else {
      return 'Player Two Wins!';
    } 
  };

  function runGame () {
    const selection = choices[Math.floor(Math.random() * choices.length)];
    setComputerSelection(selection);

    const determinedWinner = determineWinner(userSelection, selection);
    setWinner(determinedWinner);

    if (winner === 'Player One Wins!') {
      incrementScore();
    }
  }

  function selectWeapon (weapon: string) {
    setUserSelection(weapon);
  };

  function reset () {
    setUserSelection('');
    setComputerSelection('');
    setWinner('');
  }

  return (
    <div className="Game">
      <div className="columns">
        <div className="player-one">
          <h3>You</h3>

          <div
            style={{
              visibility: (userSelection === '') ? 'hidden' : 'visible',
            }}
          >
            <Player weapon={userSelection} />
          </div>

          <div className="buttons">
            <button
              onClick={() => selectWeapon('rock')}
            >
              ROCK
            </button>
            <button
              onClick={() => selectWeapon('paper')}
            >
              PAPER
            </button>
            <button
              onClick={() => selectWeapon('scissors')}
            >
              SCISSORS
            </button>
          </div>
        </div>

        <div
          className="player-two"
          style={{
            visibility: (userSelection === '') ? 'hidden' : 'visible',
          }}
        >
          <h3>Computer</h3>

          <div
            style={{
              visibility: (winner === '') ? 'hidden' : 'visible',
            }}
          >
            <Player weapon={computerSelection} />
          </div>

          <div className="buttons">
            <button
              type="button"
              onClick={runGame}
            >
              COMPETE!
            </button>
          </div>
        </div>
      </div>

      <h1 className="winner">
        {winner}
      </h1>

      {(winner !== '') && (
        <button
          onClick={() => reset()}
        >
          RESET
        </button>
      )}
    </div>
  );
}
