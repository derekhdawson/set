import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import { findIndex, isEqual } from 'lodash';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();


const objects = [
    {
        name: 'Derek',
        age: 20
    },
    {
        name: 'Andrew',
        age: 23
    }
];

const person = {
    name: 'Andrew',
    age: 23
};

console.log(findIndex(objects, (object) => {
    return isEqual(person, object);
}));