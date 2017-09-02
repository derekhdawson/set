import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import './GameOptions.css';
import checkForSets from '../../actions/check-for-sets';

class GameOptions extends React.Component {

    checkForSets = () => {
        this.context.executeAction(checkForSets);
    }

    render() {
        return (
            <div className="GameOptions">
                <RaisedButton secondary label="No Sets" onClick={this.checkForSets} />
            </div>
        );
    }
}

GameOptions.contextTypes = {
    getStore: PropTypes.func.isRequired,
    executeAction: PropTypes.func.isRequired
};

export default GameOptions;
