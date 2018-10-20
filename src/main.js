// Step 1a - Select and store the gameboard element
let gameboard = document.querySelector("#gameboard");

// Step 1b - Select and store the score element
let score = document.querySelector("#score");

// Step 1c - Select and store the cards element
let cards = document.querySelector("#cards");

// Step 1d - Select and store the message element
let message = document.querySelector("#message");

// Step 2 - Create an array of cards
let cardValues = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
let deck = [];

function shuffleDeck () {
  for (let i=0; i<4; i++) {
    let tmp = [];
    tmp = cardValues.slice();
    while(tmp.length!==0) {
      let randomIndex = Math.floor(Math.random() * tmp.length);
      let tempCard = tmp.splice(randomIndex, 1)[0];
      deck.push(tempCard);
    }
  }
}
shuffleDeck();

// Step 3a - Create an array to store 2 players
// score of players
let players = [0,0];

// Step 3b - Create a variable to store the current player
let currentPlayer = 0;

// Step 3c - Create a variable to store the first selected card
let currentCard;

for (let cardInDeck in deck) {
  let cardOfDeck = deck[cardInDeck];
  let cardEle = document.createElement('div');
  // let frontOfCard = document.createElement('div');
  //   frontOfCard.classList.add('card-front');
  //   frontOfCard.classList.add('card-face');
  // let backOfCard = document.createElement('div');
  //   backOfCard.classList.add('card-back');
  //   backOfCard.classList.add('card-face');

  // cardEle.appendChild(frontOfCard);
  // cardEle.appendChild(backOfCard);
  // cards.appendChild(cardEle);

  cardEle.classList.add('card');
  const t = cardOfDeck;

  cardEle.innerText = t;

  // Step 3c - Add a data value to the card with the card's value in it
  cardEle.dataset.value = t;
  cardEle.dataset.index = cardInDeck

  // Step 3c - Bind the cardSelected function
  // to the click event on the cardEle
  // ...
  cardEle.addEventListener('click', cardSelected );
}

function cardSelected (event) {
    // Step 5a - Check if there is already a card selected
    if (typeof currentCard === "string") {
        const cardElement = event.target;
        cardElement.classList.toggle('is-flipped');

        // Step 6 - Compare the cards
        if (currentCard === cardElement.dataset.value) {
            let [score1,score2] = players;
            console.log(score1,score2,players)
            if (currentPlayer === 0) {
                players = [score1++, score2];
            } else {
                players = [score1, score2];
            }
            message.textContent = `Congratulations! ${currentPlayer === 0 ? 'Player 1' : 'Player 2'}, please go again!`;
        } else {
            message.textContent = "Oh, so sorry!!! But yer' not psychic!";
            currentPlayer = currentPlayer === 0 ? 1 : 0;
            message.textContent+= `${currentPlayer === 0 ? 'Player 1' : 'Player 2'} your turn!`;
        }
    } else {
        currentCard = event.target.dataset.value;
        message.textContent += `${currentPlayer === 0 ? 'Player 1':'Player 2'} please select another card`;
    }

        // ... {
        //   // Step 7a - Check if one of the players has won
        //   ... {
        //     // Step 7b - Tell the player they've won
        //     // (use string interpolation to show which player you're addressing)
        //     ... = `..., you won!!! Congratulations!`;
        //   } ... {
        //     // Step 7c - Tell the players that the game has ended in a tie
        //     ... = "The game was a tie! Nice try!";
        //   }
        // }


    score.textContent = `Player 1: ${players[0]} , Player 2: ${players[1]}`;
}
// Take it further - Reset the board allowing the user to play again (Worth 20% of the final grade)
/*
  Step 1 - You will need a reset button in index.html
  Step 2 - You will need to bind an event listener
           that detects the click and executes a function
  Step 3 - You will need to reset all the pieces on the
           board
  Step 4 - You will need to reset the messages
  Step 5 - You will need to reset the players
*/