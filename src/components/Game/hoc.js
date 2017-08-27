import { connectToStores } from 'fluxible-addons-react';
import CardStore from '../../stores/card-store';

export default connectToStores([CardStore], context => ({
    cards: context.getStore(CardStore).getState().cardsInPlay
}));
