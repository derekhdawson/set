import { random, keyBy, cloneDeep } from 'lodash';
import CardStore from '../stores/card-store';
import { isSet } from '../set-utils';
import dealCards from './deal-cards';

// this action is called when the user believes there to be no sets and clicks "No Sets"
export default (actionContext) => {
    // unhighlight all cards
    let cardsInPlay = actionContext.getStore(CardStore).getState().cardsInPlay;
    cardsInPlay = cardsInPlay.map(card => ({ ...card, selected: false }));
    const cardsInPlayUnselected = cloneDeep(cardsInPlay);
    actionContext.dispatch('UPDATE_CARDS_IN_PLAY', cardsInPlayUnselected);

    // find sets
    const sets = [];
    for (let i = 0; i < cardsInPlay.length - 2; i++) {
        for (let j = i + 1; j < cardsInPlay.length - 1; j++) {
            for (let k = j + 1; k < cardsInPlay.length; k++) {
                const set = [cardsInPlay[i], cardsInPlay[j], cardsInPlay[k]];
                if (isSet(set)) {
                    sets.push(set);
                }
            }
        }
    }

    // if there are no sets find a set and show it to the user
    if (sets.length > 2) {
        const cardsInPlayMap = keyBy(cardsInPlay, card => JSON.stringify(card));
        const set = sets[random(sets.length - 1)];
        set.forEach((card) => {
            cardsInPlayMap[JSON.stringify(card)].selected = true;
        });
        actionContext.dispatch('UPDATE_CARDS_IN_PLAY', cardsInPlay);
        const numFlashes = 3;
        let n = 0;
        const timer = setInterval(() => {
            if (n % 2 === 0) {
                actionContext.dispatch('UPDATE_CARDS_IN_PLAY', cardsInPlayUnselected);
            } else {
                actionContext.dispatch('UPDATE_CARDS_IN_PLAY', cardsInPlay);
            }
            n += 1;
            if (n === numFlashes) {
                clearInterval(timer);
            }
        }, 350);
    } else { // otherwise deal three more cards
        actionContext.executeAction(dealCards, { numberOfCards: 3 });
    }
};
