import React from 'react';
import GameOptions from '../GameOptions';
import Board from '../Board';
import './Game.css';

const Game = () => ((
    <div className="Game">
        <GameOptions />
        <Board />
    </div>
));

export default Game;
