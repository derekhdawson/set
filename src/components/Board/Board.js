import React from 'react';
import PropTypes from 'prop-types';
import dealCards from '../../actions/deal-cards';
import './Board.css';
import Card from '../Card';
import { cardPropType } from '../../set-utils';

class Board extends React.Component {

    componentDidMount() {
        this.context.executeAction(dealCards, { numberOfCards: 12 });
    }

    render() {
        return (
            <div className="Board" style={{ gridTemplateColumns: `repeat(${this.props.cards.length / 3}, 1fr)` }}>
                {
                    this.props.cards.map(card => <Card card={card} key={JSON.stringify(card)} />)
                }
            </div>
        );
    }
}

Board.propTypes = {
    cards: PropTypes.arrayOf(cardPropType)
};

Board.contextTypes = {
    getStore: PropTypes.func.isRequired,
    executeAction: PropTypes.func.isRequired
};

Board.defaultProps = {
    cards: []
};

export default Board;
