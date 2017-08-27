import Fluxible from 'fluxible';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import ReactDOM from 'react-dom';
import createElementWithContext from 'fluxible-addons-react/createElementWithContext';
import App from './components/App';
import CardStore from './stores/card-store';
import registerServiceWorker from './registerServiceWorker';

/* eslint-env browser */
const Application = () => <MuiThemeProvider><App /></MuiThemeProvider>;

const app = new Fluxible({
    component: Application,
    stores: [CardStore]
});

const context = app.createContext();
const el = createElementWithContext(context);
ReactDOM.render(el, document.getElementById('root'));
registerServiceWorker();
