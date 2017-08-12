import React from 'react';
import Board from './Board.js';
import { shuffle } from 'lodash';
import { cardAttr } from '../utils';

export default class App extends React.Component {
    render() {
        return (
            <div className="App" style={{backgroundColor: "grey"}}>
                <Board cards={this.getDeck()}/>
            </div>
        )
    }

    getDeck = () => {

        const CardData = function(shape, color, fill, number) {
            this.shape = shape;
            this.color = color;
            this.fill = fill;
            this.number = number;
        }

        const cards = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                for (let k = 0; k < 3; k++) {
                    for (let l = 0; l < 3; l++) {
                        const shape = cardAttr.shape[i];
                        const color = cardAttr.color[j];
                        const fill = cardAttr.fill[k];
                        const number = cardAttr.number[l];
                        const card = new CardData(shape, color, fill, number);
                        cards.push(card);
                    }
                }
            }
        }
        return shuffle(cards);
    }
}
