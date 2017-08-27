import { shuffle } from 'lodash';
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

const cardPropType = PropTypes.shape({
    shape: PropTypes.string,
    color: PropTypes.string,
    fill: PropTypes.string,
    number: PropTypes.string,
    selected: PropTypes.bool
});

export { cardAttr, createDeck, cardPropType };
