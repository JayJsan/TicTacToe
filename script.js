let cellMap = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
]
// 0 = Empty, 1 = X, 2 = O

let cellText = [
    [,,],
    [,,],
    [,,]
]
let players = ["Player1", "Player2"];

let currentPlayer = "Player1";

let currentPlayerTurn = "${currentPlayer}'s turn!";

/*         FLOW         */
// Setup
// Reset the round
// Display the game
// Wait for player click
// Display X/O on cellc clicked
// Check if a player has three in a row
// Display winner and end game
// Restart when player requests to

Setup();
ResetRound();



/*         FLOW         */



/*         GAME LOGIC FUNCTIONS         */
function Setup() {
    // Grab text elements to display game
    GrabTextElementsFromCells();
}


function ResetRound() {
    for (let i = 0; i < cellMap.length; i++) {
        for (let j = 0; j < cellMap[i].length; j++) {
            cellMap[i][j] = 0;
        }
    }
} 

function DisplayGame() {

}

function OnPlayerClick() {

}

// If player has three in a row in horizontal, vertical, and diagonal
function CheckIfPlayerHasWon() {

}

function ChangePlayerTurn() {

}

/*         GAME LOGIC FUNCTIONS         */
/*         HELPER FUNCTIONS         */

function GrabTextElementsFromCells() {
    for (let i = 0; i < cellText.length; i++) {
        for (let j = 0; j < cellText[i].length; j++) {
            cellText[i][j] = document.querySelector('[data-cell-id="' + i + j + '"]').firstElementChild;
        }
    }
}


/*         HELPER FUNCTIONS         */