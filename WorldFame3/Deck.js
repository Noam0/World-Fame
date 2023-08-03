const SUITS = ["clubs", "diamonds", "hearts", "spades"]
const VALUES = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13"
]


export default class Deck {
  constructor(cards = freshDeck()) {
    this.cards = cards
  }

get numberOfCards(){
    return this.cards.length
}

shuffle(){
    for (let i = this.numberOfCards - 1; i > 0; i--) {
        const newIndex = Math.floor(Math.random() * (i + 1))
        const oldValue = this.cards[newIndex]
        this.cards[newIndex] = this.cards[i]
        this.cards[i] = oldValue
    }
}
}

class Card {
    constructor(suit, value) {
      this.suit = suit
      this.value = value
    }
}
function freshDeck() {
// Generate the deck of cards with appropriate images
const cards = [];
for (const suit of SUITS) {
  for (const value of VALUES) {
    const card = {
      suit,
      value,
      image: `images/${value}_of_${suit}.png` // Assuming your images folder is named "images"
    };
    cards.push(card);
  }
}
return cards;
}