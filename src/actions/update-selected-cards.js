import { findIndex, isEqual } from 'lodash';
import CardStore from '../stores/card-store';
import { isSet } from '../set-utils';

const getIndexInCards = (cards, card) => findIndex(cards, other => isEqual(card, other));

export default (actionContext, payload) => {
    const cardsInPlay = actionContext.getStore(CardStore).getState().cardsInPlay;
    const selectedCard = payload.selectedCard;
    const index = getIndexInCards(cardsInPlay, selectedCard);
    cardsInPlay[index].selected = !selectedCard.selected;

    const selectedCards = cardsInPlay.filter(card => card.selected);
    if (selectedCards.length === 3) {
        const deck = actionContext.getStore(CardStore).getState().deck;
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
            actionContext.dispatch('UPDATE_DECK', deck);
        }
    }
    actionContext.dispatch('UPDATE_CARDS_IN_PLAY', cardsInPlay);
};
