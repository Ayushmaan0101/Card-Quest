let errors = 0;
let cardlist = [
    "walterwhite", "gustavofring", "saul", "jessi", "hank",
    "jane", "tuco", "walterwhife", "saulpartner", "brandon"
];

let cardset = [];
let board = [];
let rows = 4;
let columns = 5;
let selectedCards = [];
let isFlipping = false;


let flipSound = new Audio("music/Flip sound.wav");

window.onload = function () {
    playBackgroundMusic(); // Play background music on page load
    shufflecards();
    startgame();
};

function playBackgroundMusic() {
    let backgroundMusic = document.getElementById('backgroundMusic');

    // Check if the browser supports the play method
    if (backgroundMusic && typeof backgroundMusic.play === 'function') {
        // Add an event listener for a user interaction (e.g., click)
        document.addEventListener('click', function () {
            // Play the background music
            backgroundMusic.play().catch(function (error) {
                console.error('Error playing audio:', error);
            });

            // Remove the event listener to ensure it's triggered only once
            document.removeEventListener('click', arguments.callee);
        });
    }
}


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
    setTimeout(hidecards, 1000); // Delay hiding the cards by 1000 milliseconds (1 second)
}


function createCard(r, c, cardimg) {
    let card = document.createElement('img');
    card.id = `${r}-${c}`;
    card.src = `breakingbadimages/${cardimg}.jpg`; // Show the actual card image
    card.addEventListener("click", selectcard);
    card.classList.add("card", "h-32", "w-32", "m-2");
    document.getElementById("board").append(card);

    // Add a delay of 1 second before hiding the card
    setTimeout(() => {
        card.src = "breakingbadimages/breakingbadcard.jpg";
    }, 1000);
}


function hidecards() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            document.getElementById(`${r}-${c}`).src = "breakingbadimages/breakingbadcard.jpg";
        }
    }
}

function selectcard() {
    if (isFlipping) {
        return; // Do nothing if cards are flipping
    }

    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    if (this.src.includes("breakingbadcard.jpg") && selectedCards.length < 2) {
        this.src = `breakingbadimages/${board[r][c]}.jpg`;
        flipSound.play();
        selectedCards.push({ card: board[r][c], element: this });

        if (selectedCards.length === 2) {
            isFlipping = true;
            setTimeout(update, 1000);
        }
    }
}

function update() {
    let [card1, card2] = selectedCards;

    if (card1.card !== card2.card) {
        selectedCards.forEach(card => {
            card.element.src = "breakingbadimages/breakingbadcard.jpg";
        });

        errors += 1;
        document.getElementById('errors').innerHTML = "Mismatch: " + errors;
        
    }

    selectedCards = [];
    isFlipping = false; // Reset the flipping flag

    // Check if the game is finished (all cards are revealed)
    if (checkGameFinished()) {
        alert("Congratulations! You have completed the game.");
        restartGame()
        
    }
}

// Function to check if all cards are revealed
function checkGameFinished() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (document.getElementById(`${r}-${c}`).src.includes("breakingbadcard.jpg")) {
                return false; // At least one card is not revealed
            }
        }
    }
    return true; // All cards are revealed
}

function restartGame() {
    document.getElementById("board").innerHTML = "";
    board = [];
    errors = 0;
    isFlipping = false;
    selectedCards = [];

    shufflecards();
    startgame();
    updateMismatchesDisplay();
}
