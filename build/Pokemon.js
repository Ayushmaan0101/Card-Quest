let errors = 0;
let cardlist = [
    "darkness", "double", "fairy", "fighting", "fire",
    "grass", "lightning", "metal", "psychic", "water"
];

let cardset = [];
let board = [];
let rows = 4;
let columns = 5;
let selectedCards = [];

// Audio element
let flipSound = new Audio("music/Flip sound.wav");

window.onload = function () {
    shufflecards();
    startgame();
};

function shufflecards() {
    cardset = [...cardlist, ...cardlist].sort(() => Math.random() - 0.5);
}

function startgame() {
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let cardimg = cardset.pop();
            row.push(cardimg);
            createCard(r, c, cardimg);
        }
        board.push(row);
    }

    // Display the cards for 1 second before hiding them
    setTimeout(() => {
        hidecards();
    }, 1000);
}

function createCard(r, c, cardimg) {
    let card = document.createElement('img');
    card.id = `${r}-${c}`;
    card.src = `pokemonimages/${cardimg}.jpg`; // Display the front image initially
    card.dataset.frontImage = `pokemonimages/${cardimg}.jpg`;
    card.dataset.matched = "false"; // New attribute to track if the card is matched
    card.addEventListener("click", selectcard);
    card.classList.add("card", "h-32", "w-32", "m-2");
    document.getElementById("board").append(card);
}

function hidecards() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let card = document.getElementById(`${r}-${c}`);
            if (card.dataset.matched !== "true") {
                card.src = "pokemonimages/back.jpg";
            }
        }
    }
}

function selectcard() {
    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    if (this.src.includes("back") && selectedCards.length < 2) {
        flipSound.play();
        this.src = this.dataset.frontImage;
        selectedCards.push(this);

        if (selectedCards.length === 2) {
            setTimeout(update, 1000);
        }
    }
}

function update() {
    let [card1, card2] = selectedCards;

    if (card1.src !== card2.src) {
        // If the cards don't match, flip them back
        selectedCards.forEach(card => card.src = "pokemonimages/back.jpg");
        errors += 1;
        document.getElementById('errors').innerHTML = "Mismatch: " + errors;
    } else {
        // If the cards match, mark them as matched
        card1.dataset.matched = "true";
        card2.dataset.matched = "true";
    }

    // Check if all cards are matched
    if (checkGameCompletion()) {
        alert("Congratulations! You've completed the game.");
        restartGame();
    }

    selectedCards = [];
}

function checkGameCompletion() {
    // Check if all cards have been matched
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let card = document.getElementById(`${r}-${c}`);
            if (card.dataset.matched !== "true") {
                return false; // Not all cards are matched
            }
        }
    }
    return true; // All cards are matched
}

function restartGame() {
    // Reset all variables and the game board
    errors = 0;
    cardset = [];
    board = [];
    selectedCards = [];
    document.getElementById('errors').innerHTML = "Mismatch: 0";

    // Remove all cards from the board
    let boardElement = document.getElementById("board");
    while (boardElement.firstChild) {
        boardElement.removeChild(boardElement.firstChild);
    }

    // Shuffle and start a new game
    shufflecards();
    startgame();
}
