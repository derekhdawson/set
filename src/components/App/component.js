import AppBar from 'material-ui/AppBar';
import React from 'react';
import './App.css';
import Game from '../Game';


const App = () => ((
    <div className="App">
        <AppBar showMenuIconButton={false} title={'SET!'} />
        <Game />
    </div>
));

export default App;
