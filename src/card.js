import React, {Component,Fragment} from 'react';

export class Card extends Component {

    constructor(props) {
        super(props);
        this.card = React.createRef();
    }

    componentDidMount() {
        const card = this.card.current;
        const {clickHandler} = this.props;
        card.addEventListener('click', (e)=> {clickHandler(e,card)});
    }

    componentWillReceiveProps(nextProps) {
        const cardEle = this.card.current;
        if (nextProps.notMatched === true) {
            cardEle.classList.remove('is-flipped');
        }
        if (nextProps.card === null) {
            cardEle.removeEventListener('click',()=>{console.log("removed elistener")});
        }
    }

    render() {
        let {card,index} = this.props;
        if (card === null) {card = "Z"}
        return (
            <Fragment>
                <div className="scene scene--card" data-card={card} data-index={index} >
                    <div className={`card ${card === null && 'is-flipped'}`} ref={this.card} data-index={index} data-card={card}>
                        <div className="card__face card__face--front" id={card==="Z" ? 'done':''} data-card={card} data-index={index} />
                        <div className={`card__face card__face--back ${card==="Z" ? 'done': ''}`} data-card={card} data-index={index}>
                            {card!=="Z" ? card : ''}
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}