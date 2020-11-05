import React, { useState } from 'react';

import './Game.css';

export default function Game () {
  function generateBoard () {
    const width  = 10;
    const height = 10;

    const board = [];

    for (let i = 0; i < height; i++) {
      const row = [];

      for (let j = 0; j < width; j++) {
        row.push('O');
      }

      board.push(row);
    }

    console.log(board);

    return board;
  }

  const [ board, setBoard ] = useState(generateBoard);

  return (null);
}
