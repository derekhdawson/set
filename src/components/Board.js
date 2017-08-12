import React from 'react';
import Card from './Card';
import './Board.css'
import { cardAttr } from '../utils';
import { findIndex, isEqual, keys, indexOf } from 'lodash';

export default class Board extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            set: []
        }
    }

    render() {
        const cards = [];
        for (let i = 0; i < 16; i++) {
            const card = this.props.cards[i];
            cards.push(<Card {...card} selectedCard={this.selectedCard} index={i} key={i} />)
        }
        return (
            <div className="Board">
                {cards}
            </div>
        )
    }

    selectedCard = (cardIndex) => {
        const set = this.state.set;
        const card = this.props.cards[cardIndex];
        const index = (findIndex(this.state.set, other => isEqual(card, other)));

        if (index == -1 && set.length < 3) {
            set.push(card);
        } else {
            set.splice(index, 1);
        }
        if (set.length === 3) {
            const isSet = this.isSet(set);
            console.log('is set = ' + isSet);
        }
        this.setState({
            set
        });
    }

    isSet = (set) => {
        const attributes = keys(cardAttr);
        for (let i = 0; i < attributes.length; i++) {
            const attr = attributes[i];
            const cardValues = new Set();
            for (let i = 0; i < set.length; i++) {
                const card = set[i];
                const cardValue = card[attr];
                cardValues.add(cardValue);
            }
            if (cardValues.size === 2) {
                return false;
            }
        }
        return true;
    }

    addCardToSet = (cardIndex) => {
        const card = this.props.cards[cardIndex];
        const set = this.state.set.concat(card);
        console.log(set);
        this.setState({
            set
        })
    }

    removeCardFromSet = (cardIndex) => {

    }

    cardClicked = () => {
        console.log('card clicked');
    }

}