import CardStore from '../stores/card-store';

export default (actionContext, payload) => {
    const deck = actionContext.getStore(CardStore).getState().deck;
    if (deck.length >= 3) {
        const numberOfCards = payload.numberOfCards;
        const cardsInPlay = actionContext.getStore(CardStore).getState().cardsInPlay;
        for (let i = 0; i < numberOfCards; i++) {
            cardsInPlay.push(deck.pop());
        }
        actionContext.dispatch('UPDATE_DECK', deck);
        actionContext.dispatch('UPDATE_CARDS_IN_PLAY', cardsInPlay);
    }
};
