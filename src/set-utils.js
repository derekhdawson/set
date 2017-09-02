import { shuffle, keys } from 'lodash';
import PropTypes from 'prop-types';

const cardAttr = {
    shape: ['rectangle', 'triangle', 'oval'],
    color: ['blue', 'green', 'red'],
    fill: ['open', 'solid', 'shaded'],
    number: ['1', '2', '3']
};

const createDeck = () => {
    const cards = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            for (let k = 0; k < 3; k++) {
                for (let l = 0; l < 3; l++) {
                    const shape = cardAttr.shape[i];
                    const color = cardAttr.color[j];
                    const fill = cardAttr.fill[k];
                    const number = cardAttr.number[l];
                    const selected = false;
                    const card = { shape, color, fill, number, selected };
                    cards.push(card);
                }
            }
        }
    }
    return shuffle(cards);
};

const isSet = (set) => {
    const attributes = keys(cardAttr);
    for (let i = 0; i < attributes.length; i++) {
        const attr = attributes[i];
        const cardValues = new Set();
        for (let j = 0; j < set.length; j++) {
            const card = set[j];
            const cardValue = card[attr];
            cardValues.add(cardValue);
        }
        if (cardValues.size === 2) {
            return false;
        }
    }
    return true;
};

const cardPropType = PropTypes.shape({
    shape: PropTypes.string,
    color: PropTypes.string,
    fill: PropTypes.string,
    number: PropTypes.string,
    selected: PropTypes.bool
});

export { cardAttr, createDeck, cardPropType, isSet };
