import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import Player from './player';

import './index.css';

export default function App () {
  const choices = ['rock', 'paper', 'scissors'];

  const [ playerOne, setPlayerOne ] = useState('');
  const [ playerTwo, setPlayerTwo ] = useState('');
  const [ winner, setWinner ] = useState('');

  function selectWinner () {
    if (playerOne === playerTwo) {
      return "Oops it's a Tie!";
    } else if (
      (playerOne === 'rock'     && playerTwo === 'scissors') ||
      (playerOne === 'scissors' && playerTwo === 'paper')    ||
      (playerOne === 'paper'    && playerTwo === 'rock')
    ) {
      return 'Player One Wins!';
    } else {
      return 'Player Two Wins!';
    }
  };

  function startGame () {
    let counter = 0;

    let gameInterval = setInterval(() => {
      counter++;
      setPlayerTwo(choices[Math.floor(Math.random() * choices.length)]);

      if (counter > 5) {
        clearInterval(gameInterval);
        setWinner(selectWinner());
      }
    }, 100);
  }

  function selectWeapon (weapon: string) {
    setPlayerOne(weapon);
  };

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Rock Paper Scissors</h1>

      <div>
        <Player weapon={playerOne} />
        <Player weapon={playerTwo} />
      </div>
      <div>
        <button
          className='weaponBtn'
          onClick={() => selectWeapon('rock')}
        >
          rock
        </button>
        <button
          className='weaponBtn'
          onClick={() => selectWeapon('paper')}
        >
          paper
        </button>
        <button
          className='weaponBtn'
          onClick={() => selectWeapon('scissors')}
        >
          scissor
        </button>
      </div>
      <div className='winner'>{winner ? selectWinner() : null}</div>
      <button type='button' onClick={startGame}>
        Start!
      </button>
    </>
  );
}
