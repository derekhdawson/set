import { keys, findIndex, isEqual } from 'lodash';
import CardStore from '../stores/card-store';
import { cardAttr } from '../set-utils';

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

const getIndexInCards = (cards, card) => findIndex(cards, other => isEqual(card, other));

export default (actionContext, payload) => {
    let selectedCards = actionContext.getStore(CardStore).getState().selectedCards;
    const selectedCard = payload.selectedCard;

    const index = getIndexInCards(selectedCards, selectedCard);
    if (index === -1) {
        selectedCards.push(selectedCard);
    } else {
        selectedCards.splice(index, 1);
    }

    if (selectedCards.length === 3) {
        const deck = actionContext.getStore(CardStore).getState().deck;
        const cardsInPlay = actionContext.getStore(CardStore).getState().cardsInPlay;

        if (isSet(selectedCards)) {
            const newCards = deck.length >= 3 ? deck.splice(deck.length - 3, 3) : [];
            selectedCards.forEach((card) => {
                const cardIndex = getIndexInCards(cardsInPlay, card);
                if (newCards.length === 0) {
                    cardsInPlay.splice(cardIndex, 1);
                } else {
                    cardsInPlay[cardIndex] = newCards.pop();
                }
            });
            selectedCards = [];
            actionContext.dispatch('UPDATE_DECK', deck);
            actionContext.dispatch('UPDATE_CARDS_IN_PLAY', cardsInPlay);
        }
    }
    actionContext.dispatch('UPDATE_SELECTED_CARDS', selectedCards);
};
