import React, { Component } from 'react';
import './App.css';
import {Card} from "./card";
import _ from 'lodash';

const cardValues = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

const INITIAL_STATE = {
    deck: [],
    currentPlayer: 0,
    players: [0, 0],
    currentCard: null,
    currentIndex: null,
    nextIndex: null,
    notMatched: null,
    message: '',
    finished: false
};

class App extends Component {

  state = INITIAL_STATE;

  toggleTurn = () => {
    this.setState((previousState) => ({currentPlayer: previousState.currentPlayer === 0 ? 1 : 0}));
  };

  increaseScore = (playerNumber) => {
      // playerNum
      let [player1,player2] = this.state.players;
      if (playerNumber === 0) {
          player1++;
      } else if (playerNumber === 1) {
          player2++;
      }
      if (player1 === 14 || player2 === 14) {
          this.setState({finished: true, message: 'Game Finished'});
          const winner = player1 > player2 ? 'player 1': 'player 2';
          window.alert(`${winner} is the winner`);
      } else if(player1===13 && player2===13) {
          this.setState({finished: true, message: 'Game Finished'});
          window.alert('game tied');
      }
      this.setState({players: [player1,player2]});
  };

  makeIndexNull = (index) => {
      const {deck} = this.state;
      deck[index] = null;
      this.setState({deck: deck});
  }

    clickHandler = (e,card) => {
        e.preventDefault();
        card.classList.add('is-flipped');
        const {currentCard,currentPlayer,finished} = this.state;
        if (finished === false) {
            if (card.dataset.card !== "Z") {
                if (currentCard !== null) {
                    const nextCard = e.target.dataset.card;
                    this.setState({nextIndex: e.target.dataset.index});
                    console.log(nextCard,currentCard)
                    if (currentCard === nextCard) {
                        const {currentIndex,nextIndex,currentPlayer} = this.state;
                        console.log("matched")
                        this.setState({message: `Player ${currentPlayer+1} go again `, currentCard: null});
                        this.makeIndexNull(currentIndex);
                        this.makeIndexNull(nextIndex);
                        this.increaseScore(currentPlayer);
                        setTimeout(() => this.setState({notMatched: null}), 500);
                    } else {
                        console.log("not matched")
                        this.setState({currentCard: null, message: ''});
                        this.toggleTurn(currentCard);
                        setTimeout(() => this.setState({notMatched: true}), 500);
                        setTimeout(() => this.setState({notMatched: false}), 800);
                    }
                } else {
                    this.setState({currentCard: e.target.dataset.card, currentIndex: e.target.dataset.index});
                }
            }
        } else if (finished === true) {
            this.setState({message: 'Game Finished'})
        }

    };

    restartGame = (e) => {
        this.setState(INITIAL_STATE);
        this.createDeck();
    };

    render() {
      const {deck, players,currentIndex,nextIndex,currentPlayer,notMatched,message,finished} = this.state;
      const [player1, player2] = players;
      return (
      <div className="App">
        <div className="container">
            {console.log(deck)}
        </div>

          {finished === true &&
              <div className="container">
                  <div className="alert alert-danger">{message}</div>
                  <button className="m-2 btn btn-info" onClick={this.restartGame}>Restart Game</button>
              </div>
          }

        <div className="container">
            <div className="alert alert-success" role="alert">
                {message}
            </div>
        </div>

        <div className="container">
            <div className="row">
                <div className={`col-3 btn ${currentPlayer === 0 && 'btn-success'}`}>
                    Player 1 <br/>
                    {player1}
                </div>
                <div className="col-6 p-3 text-center">
                    <div className="alert alert-warning">
                        Player {currentPlayer+1}'s turn
                    </div>
                </div>
                <div className={`col-3 btn ${currentPlayer === 1 && 'btn-success'}`}>
                    Player 2 <br/>
                    {player2}
                </div>
            </div>

            {finished === true &&
                <div className="row">
                    {deck.map((card, index) =>
                        (<Card key={index} notMatched={notMatched} card={card} index={index} clickHandler={this.clickHandler} />))}
                </div>
            }
            {finished === false &&
                <div className="row">
                    {deck.map((card, index) =>
                        (<Card key={index} notMatched={notMatched} card={card} index={index} clickHandler={this.clickHandler} />))}
                </div>
            }
        </div>

      </div>
    );
  }

    createDeck = () => {
        let newDeck = [];
        for (let i=0; i<4; i++) {
            let tmp = [];
            tmp = cardValues.slice();
            while(tmp.length!==0) {
                let randomIndex = Math.floor(Math.random() * tmp.length);
                let tempCard = tmp.splice(randomIndex, 1)[0];
                newDeck.push(tempCard);
            }
        }
        // since the deck is not properly randomised, we run an extra function of shuffle from lodash
        this.setState({deck: _.shuffle(newDeck)})
    };

    componentDidMount() {
        this.createDeck();
    }

}

export default App;
