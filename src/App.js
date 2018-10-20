import React, { Component } from 'react';
import './App.css';

const cardValues = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

class App extends Component {

  state = {
    deck: [],
    currentPlayer: 0,

  };

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
    this.setState({deck: newDeck})
  };

  componentDidMount() {
    this.createDeck();
  }

    render() {
      return (
      <div className="App">
        <div className="container">

        </div>
      </div>
    );
  }
}

export default App;
