import Deck from "./Deck.js"
const gamePlate = document.getElementById('gamePlate');
gamePlate.style.display = 'none'
let placementArray = [0 , 0 , 0 , 0 , 0, 0]
let valuesOfCardArray = [0 , 0] 
const gamePlayButton1 = document.getElementById('gamePlayButton1');
const gamePlayButton2 = document.getElementById('gamePlayButton2');
const gamePlayButton3 = document.getElementById('gamePlayButton3');
const deckImage = document.getElementById('deck');
const errorTextVar = document.getElementById('errorText');


//var for third stage
let chosenColor = null;
let colorChosen = false;
let numberOfStage = 1;

//vars for second stage
let upperLowerButton = null;
let upperLowerButtonWasChosen = false;

const deck = new Deck()
playGame();




function playGame(){
  deck.shuffle()
  if (numberOfStage === 1) {
    firstStageSetup();
    deckImage.addEventListener('click', handleStageOneClick);
  } 
   else if (numberOfStage === 2) {
    secondStageSetup();
    deckImage.addEventListener('click', handleStageTwoClick);

  } else if (numberOfStage === 3) {
    // Set up for stage three
    // Add event listener for stage three behavior
  } else {
    // Set up for other stages...
  }

}



//-- draw card function -- 
function drawCard() {
    if (deck.cards.length === 0) {
      alert('The deck is empty. No more cards to draw.');
      return;
    }
  
    // Find the next available position to display the card
    const nextPosition = placementArray.indexOf(0);
    if (nextPosition === -1) {
      alert('All positions are filled. No more cards can be drawn.');
      return;
    }
  
    // Draw a card from the deck and remove it from the array
    const card = deck.cards.pop();
  
    // Display the card image
    const cardImage = document.createElement('img');
    cardImage.src = card.image;
    cardImage.alt = `${card.value} of ${card.suit}`;
  
    // Clear the previous card if any, and append the new card image to the container
    const cardContainer = document.getElementById(`card${nextPosition + 1}`);
    cardContainer.innerHTML = '';
    cardContainer.appendChild(cardImage);
    // Update the placementArray to mark the current position as filled
    placementArray[nextPosition] = 1;
  
    
   return card;


  }


  function showError(stage) {
    switch (stage) {
        case 1:
          errorTextVar.textContent = 'Please choose a color (Red or Black) before drawing a card.';
            break;
        case 2:
          errorTextVar.style.display = 'block'
          errorTextVar.textContent = 'Please choose a upper or lower button before drawing a card.'; // Replace with specific error message
            break;
        case 3:
          errorTextVar.textContent = 'Error in stage 3: ...'; // Replace with specific error message
            break;
        // Add more cases for different stages if needed
        default:
          errorTextVar.textContent = 'An error occurred. Please try again.';
    }
    errorTextVar.style.display = 'block'
}

/* i want that when clicking on the background the button will be unclicked.
overlay.addEventListener('click', () => {
  chosenColor = null;
  colorChosen = false;
  upperLowerButton = null;
  upperLowerButtonWasChosen = false;
  unmarkButton(gamePlayButton1);
  unmarkButton(gamePlayButton2);
  unmarkButton(gamePlayButton3);
});

*/


  //--------- first stage -----------------

  //setting the view before the first stage begins
function firstStageSetup(){
  gamePlayButton2.style.display = 'none'
  gamePlayButton1.textContent = 'Red'
  gamePlayButton3.textContent = 'Black'
  
  gamePlayButton1.addEventListener('click', () => {
    errorTextVar.style.display = 'none'
    chosenColor = 'red';
    colorChosen = true;
    markButton(gamePlayButton1);
    unmarkButton(gamePlayButton3);
});

gamePlayButton3.addEventListener('click', () => {
  errorTextVar.style.display = 'none'
  chosenColor = 'black';
  colorChosen = true;
  markButton(gamePlayButton3);
  unmarkButton(gamePlayButton1);


});

}




function markButton(button ){
  button.style.backgroundColor = '#00386D';

}

function  unmarkButton(button) {
  button.style.backgroundColor = '';
}

function handleStageOneClick() {
  if (!colorChosen) {
    showError(1);
  } else {
    const card = drawCard();
    if ((card.suit === 'hearts' || card.suit === 'diamonds') && (chosenColor === 'red')) {
      numberOfStage++;
      valuesOfCardArray[0] =card.value;
      console.log("right");
    } else if ((card.suit === 'clubs' || card.suit === 'spades') && (chosenColor === 'black')) {
      numberOfStage++;
      valuesOfCardArray[0] =card.value; 
      console.log("right");
    } else {

      console.log("wrong in stage one");
    }
  }

  if (numberOfStage === 2 ){
    playGame();
  }
}

  //--------- Second stage -----------------

  //----- Second stage  setup------
  function secondStageSetup(){
    const stageTextElement = document.querySelector('.stageText');
    stageTextElement.textContent = 'The next card value is upper or lower than the last card?';
    gamePlayButton2.style.display = 'none'
    gamePlayButton1.textContent = 'Upper'
    gamePlayButton3.textContent = 'Lower'
    errorTextVar.style.display = 'none'
    unmarkButton(gamePlayButton1)
    unmarkButton(gamePlayButton3);
  ;
  
    
    gamePlayButton1.addEventListener('click', () => {
      errorTextVar.style.display = 'none'
      upperLowerButton = 'upper';
      upperLowerButtonWasChosen = true;
      markButton(gamePlayButton1);
      unmarkButton(gamePlayButton3);
  });
  
  gamePlayButton3.addEventListener('click', () => {
    errorTextVar.style.display = 'none'
    upperLowerButton = 'lower';
    upperLowerButtonWasChosen = true;
    markButton(gamePlayButton3);
    unmarkButton(gamePlayButton1);
  
  
  });
  
  }

  function handleStageTwoClick() {
    if (!upperLowerButtonWasChosen) {
      showError(2);
    } else {
      const card = drawCard();
      if ((card.value > valuesOfCardArray[0]) && (upperLowerButton === 'upper')) {
        // If the card's value is greater than the first card and the user guessed 'upper'
        numberOfStage++;
        console.log('right');
      } else if ((card.value < valuesOfCardArray[0]) && (upperLowerButton === 'lower')) {
        // If the card's value is less than the first card and the user guessed 'lower'
        numberOfStage++;
        console.log('right');
      } else {
        console.log('wrong in stage two');
      }
  
      // Update the first card value for the next comparison
      valuesOfCardArray[0] = card.value;
    }
  } 
