 *  While I did try to do this on my own, I did search up a lot of things to make things easier.
 *  Resources used: 
 *  
 *  
 *  
 *  
 */

/**
 * Current state of the game
 */
let cellMap = [
    [2,2,0],
    [0,2,0],
    [0,2,0]
]
// 0 = Empty, 1 = X, 2 = O

let cellText = [
    [,,],
    [,,],
    [,,]
]
let players = [{
    name: "Player1",
    symbol: "X"
}, 
{
    name: "Player2",
    symbol: "O"
}];

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
// ResetRound();
DisplayGame();
/*         FLOW         */



/*         GAME LOGIC FUNCTIONS         */
function Setup() {
    // Grab text elements to display game
    GrabTextElementsFromCells();
    AddEventListenerToCells();
}


function ResetRound() {
    for (let i = 0; i < cellMap.length; i++) {
        for (let j = 0; j < cellMap.length; j++) {
            cellMap[i][j] = 0;
        }
    }
} 

function DisplayGame() {
    for (let i = 0; i < cellMap.length; i++) {
        for (let j = 0; j < cellMap.length; j++) {
            switch (cellMap[i][j]) {
                // 0 - Empty, 1 - X, 2 - O
                case 0:
                    cellText[i][j].innerText = "";
                    break;
                case 1:
                    cellText[i][j].innerText = "X";
                    break;
                case 2:
                    cellText[i][j].innerText = "O";
                    break;
            }
        }
    }
}

function OnPlayerClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;

    let playerSymbol = "";
    let cellX = clickedCell.getAttribute('data-cell-id').charAt(0);
    let cellY = clickedCell.getAttribute('data-cell-id').charAt(1);

    // Check if cell clicked has already been clicked and return
    if (!(clickedCell.innerText == "")) {
        return;
    }

    // Check whose turn it is
    if (currentPlayer == players[0].name) {
        playerSymbol = players[0].symbol;
    } else {
        playerSymbol = players[1].symbol;
    }

    // Place X/O down
    cellText[cellX][cellY].innerText = playerSymbol;

    // Check if player has won
    CheckIfPlayerHasWon();

    console.log("Clicked: " + clickedCell.getAttribute('data-cell-id') + "!");
}

// If player has three in a row in horizontal, vertical, and diagonal
function CheckIfPlayerHasWon() {

}

function ChangePlayerTurn() {

}

/*         GAME LOGIC FUNCTIONS         */
/*         HELPER FUNCTIONS         */
// For Setup() Function
function GrabTextElementsFromCells() {
    for (let i = 0; i < cellText.length; i++) {
        for (let j = 0; j < cellText.length; j++) {
            cellText[i][j] = document.querySelector('[data-cell-id="' + i + j + '"]').firstElementChild;
        }
    }
}
// For Setup() Function
function AddEventListenerToCells() {
    document.querySelectorAll('.cell').forEach(cell => {
        cell.addEventListener('click', OnPlayerClick);
    })
}
// For OnPlayerClick() Function


/*         HELPER FUNCTIONS         */