import BaseStore from 'fluxible/addons/BaseStore';
import { createDeck } from '../set-utils';

class CardStore extends BaseStore {

    constructor(dispatcher) {
        super(dispatcher);
        this.deck = createDeck();
        this.cardsInPlay = [];
        this.selectedCards = [];
    }

    updateDeck = (payload) => {
        this.deck = payload;
        this.emitChange();
    }

    updateCardsInPlay = (payload) => {
        this.cardsInPlay = payload;
        this.emitChange();
    }

    updateSelectedCards = (payload) => {
        this.selectedCards = payload;
        this.emitChange();
    }

    getState = () => ({
        cardsInPlay: this.cardsInPlay,
        deck: this.deck,
        selectedCards: this.selectedCards
    })
}

CardStore.storeName = 'CardStore';
CardStore.handlers = {
    UPDATE_DECK: 'updateDeck',
    UPDATE_CARDS_IN_PLAY: 'updateCardsInPlay',
    UPDATE_SELECTED_CARDS: 'updateSelectedCards'
};

export default CardStore;
