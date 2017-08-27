import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import './Game.css';
import Board from '../Board';
import CardStore from '../../stores/card-store';


class Game extends React.Component {

    render() {
        const cardsInPlay = this.context.getStore(CardStore).getState().cardsInPlay;
        const width = (cardsInPlay.length / 3) * 100;
        return (
            <div className="Game" style={{ width: `${width}px` }}>
                <Board />
                <RaisedButton label="More Cards" onClick={this.dealMoreCards} />
            </div>
        );
    }
}

Game.contextTypes = {
    getStore: PropTypes.func.isRequired,
    executeAction: PropTypes.func.isRequired
};

export default Game;
