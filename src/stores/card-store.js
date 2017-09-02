import BaseStore from 'fluxible/addons/BaseStore';
import { createDeck } from '../set-utils';

class CardStore extends BaseStore {

    constructor(dispatcher) {
        super(dispatcher);
        this.deck = createDeck();
        this.cardsInPlay = [];
    }

    updateDeck = (payload) => {
        this.deck = payload;
        this.emitChange();
    }

    updateCardsInPlay = (payload) => {
        this.cardsInPlay = payload;
        this.emitChange();
    }

    getState = () => ({
        cardsInPlay: this.cardsInPlay,
        deck: this.deck
    })
}

CardStore.storeName = 'CardStore';
CardStore.handlers = {
    UPDATE_DECK: 'updateDeck',
    UPDATE_CARDS_IN_PLAY: 'updateCardsInPlay'
};

export default CardStore;
