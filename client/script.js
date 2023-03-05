/**
 *  While I did try to do this on my own, I did search up a lot of things to make things easier.
 *  Resources used: 
 *  
 *  
 *  
 *  
 */

/* Game Logic Variables */
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

let gameStatus = `${currentPlayer}'s turn!`;
let statusElement = document.querySelector('.game-status');

let gameStates = ["Playing","Won","Tie"];
let currentGameState = "Playing";

let spacesFilled = 0;
/* Game Logic Variables */
/* Online Multiplayer Variables */
// const createGameButton = document.querySelector('.create-game-button');
// const gameInput = document.querySelector('.game-input');
// const joinButton = document.querySelector('.join-button');
// const joinInput = document.querySelector('.join-input');

// let gameNameCreated = "";
// let gameJoined = "";



/* Online Multiplayer Variables */


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
DisplayGame();
DisplayStatus();
/*         FLOW         */


//#region GAME LOGIC
/*         GAME LOGIC FUNCTIONS         */
function Setup() {
    // Grab text elements to display game
    GrabTextElementsFromCells();
    AddEventListenersToCellsAndButtons();
}


function ResetRound() {
    for (let i = 0; i < cellMap.length; i++) {
        for (let j = 0; j < cellMap.length; j++) {
            cellMap[i][j] = 0;
        }
    }
    gameStatus = `${currentPlayer}'s turn!`;
    currentGameState = gameStates[0];
    spacesFilled = 0;

    DisplayGame();
    DisplayStatus();
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

function OnPlayerCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;

    if (currentGameState != "Playing") {
        return;
    }
    // Check if cell clicked has already been clicked and return
    if (!(clickedCell.innerText == "")) {
        return;
    }

    let playerSymbol = "";
    let cellX = clickedCell.getAttribute('data-cell-id').charAt(0);
    let cellY = clickedCell.getAttribute('data-cell-id').charAt(1);

    spacesFilled++;

    // Check whose turn it is
    if (currentPlayer == players[0].name) {
        // X
        cellMap[cellX][cellY] = 1;
        playerSymbol = players[0].symbol;
    } else {
        // O
        cellMap[cellX][cellY] = 2;
        playerSymbol = players[1].symbol;
    }

    // Place X/O down
    cellText[cellX][cellY].innerText = playerSymbol;
    // Check if player has won
    CheckIfPlayerHasWon();
    DisplayStatus();
    console.log("Clicked: " + clickedCell.getAttribute('data-cell-id') + "!");
}

// If player has three in a row in horizontal, vertical, and diagonal
function CheckIfPlayerHasWon() {
    let playerSymbolNumber;
    let hasPlayerWon = false;
    if (currentPlayer == players[0].name) {
        // X
        playerSymbolNumber = 1;
    } else {
        // O
        playerSymbolNumber = 2;
    }
    
    hasPlayerWon = CheckMap(playerSymbolNumber);

    console.log("Has Player Won???: " + hasPlayerWon);
    if (hasPlayerWon) {
        gameStatus = `${currentPlayer} has won the game!`;
        currentGameState = gameStates[1];
    } else if (spacesFilled >= 9) {
        gameStatus = "Tie!";
        currentGameState = gameStates[2]
    } else {
        ChangePlayerTurn();
        currentGameState = gameStates[0]
    }
}

function ChangePlayerTurn() {
    if (currentPlayer == players[0].name) {
        currentPlayer = players[1].name;
    } else {
        currentPlayer = players[0].name;
    }
    gameStatus = `${currentPlayer}'s turn!`;
    console.log(gameStatus);
}

function DisplayStatus() {
    statusElement.innerText = gameStatus;
}
/*         GAME LOGIC FUNCTIONS         */
//#endregion


//#region ONLINE MULTIPLAYER
/*         ONLINE MULTIPLAYER         */



/*         ONLINE MULTIPLAYER         */
//#endregion

//#region HELPER FUNCTIONS
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
function AddEventListenersToCellsAndButtons() {
    document.querySelectorAll('.cell').forEach(cell => {
        cell.addEventListener('click', OnPlayerCellClick);
    })
    document.querySelector('.game-restart-button').addEventListener('click', ResetRound);

    // createGameButton.addEventListener('click', () => {
    //     gameNameCreated = gameInput.value;
    // })

    // joinButton.addEventListener('click', () => {
    //     gameJoined = joinInput.value;
        // })
}

// For CheckIfPlayerHasWon() Function
function CheckMap(playerSymbolNumber) {

    if (CheckMapHorizontally(playerSymbolNumber)) {
        return true;
    }
    if (CheckMapVertically(playerSymbolNumber)) {
        return true;
    }
    if (CheckMapDiagonally(playerSymbolNumber)) {
        return true;
    }
    return false;
}

// For CheckMap() Function ------------------------------------- HORIONTAL WORKS!!
function CheckMapHorizontally(playerSymbolNumber) {
    let hasThreeInARow = false;
    for (let i = 0; i < cellMap.length; i++) {
        let symbolCount = 0;
        for (let j = 0; j < cellMap.length; j++) {
            if (cellMap[j][i] == playerSymbolNumber) {
                symbolCount++;
                //console.log("Horizontal: " + symbolCount);
            }
        }
        //console.log("Symbol Count: " + symbolCount);
        if (symbolCount == 3) {
            hasThreeInARow = true;
        }
        //console.log("Three in a row?: " + hasThreeInARow);
        //console.log("----------End of Function----------");
    }
    return hasThreeInARow;
}

// For CheckMap() Function
function CheckMapVertically(playerSymbolNumber) {
    let hasThreeInARow = false;
    for (let j = 0; j < cellMap.length; j++) {
        let symbolCount = 0;
        for (let i = 0; i < cellMap.length; i++) {
            if (cellMap[j][i] == playerSymbolNumber) {
                symbolCount++;
                //console.log("Vertical: " + symbolCount);
            }
        }
        //console.log("Symbol Count: " + symbolCount);
        if (symbolCount == 3) {
            hasThreeInARow = true;
        }
        //console.log("Three in a row?: " + hasThreeInARow);
        //console.log("----------End of Function----------");
    }
    return hasThreeInARow;
}

// For CheckMap() Function
function CheckMapDiagonally(playerSymbolNumber) {
    let hasThreeInARow = false;
    let symbolCountOne = 0;
    let symbolCountTwo = 0;
    let j = 2;
    for (let i = 0; i < cellMap.length; i++) {
        if (cellMap[i][i] == playerSymbolNumber) {
            symbolCountOne++;
        }
        if (cellMap[j][i] == playerSymbolNumber) {
            symbolCountTwo++;
        }
        if (symbolCountOne >= 3 || symbolCountTwo >= 3) {
            hasThreeInARow = true;
        }
        j--;
    }

    return hasThreeInARow;
}
    // either check by iterating through map horizontally
    // or go down the middle center or side to side and check adjacent element
    // diagonally we just use two for loops that use the same index, we use it twice with starting variable at the start and and the end.


/*         HELPER FUNCTIONS         */
//#endregion