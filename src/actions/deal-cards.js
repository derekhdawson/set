import CardStore from '../stores/card-store';

export default (actionContext, payload) => {
    const numberOfCards = payload.numberOfCards;
    const deck = actionContext.getStore(CardStore).getState().deck;
    const cardsInPlay = [];
    for (let i = 0; i < numberOfCards; i++) {
        cardsInPlay.push(deck.pop());
    }
    actionContext.dispatch('UPDATE_DECK', deck);
    return actionContext.dispatch('UPDATE_CARDS_IN_PLAY', cardsInPlay);
};
