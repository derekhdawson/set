import React from 'react';
import PropTypes from 'prop-types';
import cardImages from '../../load-images';
import updateSelectedCards from '../../actions/update-selected-cards';
import { cardPropType } from '.././../set-utils';

// border: `3px solid ${isSelected ? 'red' : 'black'}`
class Card extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: false,
            imageLoaded: false,
            style: {
                width: '80px',
                borderRadius: '15px',
                border: '3px solid black',
                outline: 'none'
            }
        };
    }

    getImageFile() {
        const fill = this.props.card.fill;
        const color = this.props.card.color;
        return cardImages[`${fill}${color.charAt(0).toUpperCase()}${color.substring(1)}`];
    }

    imageLoaded = () => {
        const image = new Image();
        image.src = this.getImageFile();

        const imageDimensionRatio = (image.height / image.width);

        const cardWidth = parseInt(this.state.style.width, 10);
        const cardHeight = cardWidth * imageDimensionRatio;

        const backgroundImageWidth = parseInt(cardWidth, 10) * 3;
        const backgroundImageHeight = backgroundImageWidth * imageDimensionRatio;

        const backgroundPosition = Card.getBackgroundPosition(
            this.props.card.shape, this.props.card.number, cardWidth, cardHeight);

        this.setState({
            imageLoaded: true,
            style: {
                ...this.state.style,
                height: cardHeight,
                backgroundSize: `${backgroundImageWidth}px ${backgroundImageHeight}px`,
                backgroundPosition,
                backgroundImage: `url('${image.src}')`
            }
        });
    }

    cardClicked = () => {
        this.context.executeAction(updateSelectedCards, { selectedCard: this.props.card });
    }

    render() {
        return (
            <div className="Card">
                <img alt={JSON.stringify(this.props.card)} src={this.getImageFile()} onLoad={this.imageLoaded} style={{ display: 'none', visibility: 'hidden' }} />
                {
                    this.state.imageLoaded &&
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.cardClicked}
                        style={{
                            ...this.state.style,
                            border: `3px solid ${this.props.card.selected ? 'red' : 'black'}`
                        }}
                    />
                }
            </div>
        );
    }
}

Card.getBackgroundPosition = (shape, number, imageWidth, imageHeight) => {
    const x = parseInt(number - 1, 10);
    let y;
    if (shape === 'rectangle') {
        y = 0;
    } else if (shape === 'triangle') {
        y = 1;
    } else if (shape === 'oval') {
        y = 2;
    }
    return `${-x * imageWidth}px ${-y * imageHeight}px`;
};

Card.contextTypes = {
    getStore: PropTypes.func.isRequired,
    executeAction: PropTypes.func.isRequired
};

Card.propTypes = {
    card: cardPropType.isRequired
};

export default Card;
