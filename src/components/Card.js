import React from 'react';
import PropTypes from 'prop-types';
import cardImages from '../load-images';


class Card extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tapped: false,
            imageLoaded: false,
            style: {
                width: '90px',
                borderRadius: '15px',
                border: '3px solid black'
            }
        }
        this.imageSrc = cardImages[`${props.fill}_${props.color}`];
    }

    render() {
        return (
            <div className="Card">
                <img alt={this.imageSrc} src={this.imageSrc} onLoad={this.imageLoaded} style={{display: "none", visibility: "hidden"}} />
                {this.state.imageLoaded && <div onClick={this.cardClicked} style={this.state.style}></div>}
            </div>
        )
    }

    cardClicked = () => {
        const isTapped = !this.state.tapped;
        this.setState({
            tapped: isTapped,
            style: {
                ...this.state.style,
                border: `3px solid ${ isTapped ? 'red' : 'black' }`
            }
        });
        this.props.selectedCard(this.props.index);
    }

    imageLoaded = () => {
        const image = new Image();
        image.src = this.imageSrc;

        const imageDimensionRatio = (image.height / image.width);

        const cardWidth = parseInt(this.state.style.width, 10);
        const cardHeight = cardWidth * imageDimensionRatio;

        const backgroundImageWidth = parseInt(cardWidth, 10) * 3;
        const backgroundImageHeight = backgroundImageWidth * imageDimensionRatio;

        const backgroundPosition = this.getBackgroundPosition(this.props.shape, this.props.number, cardWidth, cardHeight);

        this.setState({
            imageLoaded: true,
            style: {
                ...this.state.style,
                height: cardHeight,
                backgroundSize: `${backgroundImageWidth}px ${backgroundImageHeight}px`,
                backgroundPosition: backgroundPosition,
                backgroundImage: `url('${image.src}')`
            }
        });
    }

    getBackgroundPosition = (shape, number, imageWidth, imageHeight) => {
        const x = parseInt(number - 1, 10);
        let y;
        if (shape === "rectangle") {
            y = 0;
        } else if (shape === "triangle") {
            y = 1;
        } else if (shape === "oval") {
            y = 2;
        }
        return `${ -x * imageWidth }px ${ -y * imageHeight }px`;
    }
}

Card.propTypes = {
    shape: PropTypes.string,
    color: PropTypes.string,
    fill: PropTypes.string,
    number: PropTypes.string,
    imageSrc: PropTypes.string,
    selectedCard: PropTypes.func,
    index: PropTypes.number
}

export default Card;