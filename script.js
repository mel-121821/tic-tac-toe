// tic tac toe instructions
// Store the gameboard as an array inside of a gameboard object
// your players are going to be stored in objects and you're probably going to want an object to control the flow of the game itself
// have as little global code as possible, tuck as much as you can in factories
// if you only need a single instance of something (eg. the gameboard, the displayController etc.), then wrap the factory inside an IFFE so it cannot be used to create additional instances
// think carefully about where each bit of logic should reside, each piece of functionality should be able to fit in the game, player or gameboard objects. Spend some time brainstorming here
// focus on getting a working game in the console first..


// ___________Game Board______________

const gameBoard = (function() {
    // This variable should be private so that the user cannot manipulate it directly

    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push("");
        }
    }
    
    let moveValid = true;

    const markBoard = (marker, arrayRow, arrayColumn) => {
        if (board[arrayRow][arrayColumn] === "") {
        board[arrayRow][arrayColumn] = `${marker}`;
            moveValid = true;
        } else {
            // do nothing
            moveValid = false;
        }
    };

    const checkValidMove = () => moveValid;
    
    let allBoardCombos = [];

    const getAllBoardCombos = () => {
        for (let row of board) {
            allBoardCombos.push(row)
            }
        for (let c = 0; c < board[0].length; c++) {
            let col = board.map(function(value) { return value[c];});
            allBoardCombos.push(col);
        }
        allBoardCombos.push([board[0][0], board[1][1], board[2][2]]);
        allBoardCombos.push([board[2][0], board[1][1], board[0][2]]);
        return allBoardCombos; 
    }

    const resetAllBoardCombos = () => {
        allBoardCombos = [];
    }

    const checkBoard = () => {
        // checkAvailableSpaces();
        getAllBoardCombos();
        let match;
        for (combo of allBoardCombos) {
            if (combo.every(val => val === combo[0]) && (combo[0] !== "")) {
                match = true
                break
            } else {
                match = false
            }
        }
        resetAllBoardCombos();
        return match
    }

    const checkAvailableSpaces = () => {
        let boardFull = board.every(row => row.every(cell => cell === "X" || cell === "O")) ? true : false;
        return boardFull;
    }

    const clearBoard = () => {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                board[i][j] = "";
            }
        }
    }

    const getBoard = () => board;

    return {
        markBoard, checkValidMove, checkBoard, clearBoard, getBoard, checkAvailableSpaces
    }
})();


// ____________Players________________

const Players = function() {

    const players = [
        {
            name: "Player One",
            marker: "X"
        },
        {
            name: "",
            marker: "O"
        }
    ]

    function addPlayerNames(input1, input2) {
        obj1 = players.findIndex(obj => obj.marker === "X")
        players[obj1].name = input1;
        obj2 = players.findIndex(obj => obj.marker === "O")
        players[obj2].name = input2;
    }

    const getPlayers = () => players;
    
    return {getPlayers, addPlayerNames};
}();


// __________Game Flow______________

function gameController(){ 
    let activePlayer = Players.getPlayers()[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === Players.getPlayers()[0] ? Players.getPlayers()[1] : Players.getPlayers()[0];
    }

    const setToPlayerOne = () => {
        activePlayer = Players.getPlayers()[0];
    }

    const getActivePlayer = () => activePlayer;

    function placeMarker(inputRow, inputColumn){
        gameBoard.markBoard(getActivePlayer().marker, inputRow, inputColumn)
    }

    function playRound(inputRow, inputColumn) {
        placeMarker(inputRow, inputColumn);
        if (gameBoard.checkValidMove() == true) {
            // gameBoard.checkBoard();
            checkForWinner();
        } else {
            // do nothing, player has not marked a valid square
        }
    }

    const checkForWinner = () => {
        if (gameBoard.checkBoard() === true || gameBoard.checkAvailableSpaces() === true) {
            // do nothing, the game is ended
        } else {
            switchPlayerTurn();
        }
    }

    return {getActivePlayer, playRound, getBoard: gameBoard.getBoard, setToPlayerOne}

};


// __________Display Control______________

function screenController() {
    const game = gameController();
    const playerDiv = document.querySelector('.player-div');
    const boardDiv = document.querySelector('.board-div');
    const resetButton = document.querySelector('.reset-banner > button');
    
    const formPopup = document.querySelector('.player-name-form');
    const form = document.querySelector('.player-name-form > form')

    const playerOneInput = document.querySelector('#player-one');
    const playerTwoInput = document.querySelector('#player-two');
    
    formPopup.showModal();

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        Players.addPlayerNames(playerOneInput.value, playerTwoInput.value);
        form.reset();
        formPopup.close();
        updateScreen();
    })

    const updateScreen = () => {
        // clear the board
        boardDiv.textContent = "";

        let match = gameBoard.checkBoard();
        let boardFull = gameBoard.checkAvailableSpaces()

        // get the newest version of board and player turn
        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        const playerDisplay = () => {
            // let match = gameBoard.checkBoard();
            if (match === true) {
                playerDiv.textContent = `${activePlayer.name} wins!`;
             } else if (match === false && boardFull === true) {
                 playerDiv.textContent = "Tie game!"
            } else if (match === false && boardFull === false) {
                playerDiv.textContent = `${activePlayer.name}'s turn...`;
            }
        }
        playerDisplay();

        const toggleBoard = () => {
           if (match === true || boardFull === true) {
                boardDiv.classList.add('stop-btn-effects');
            } else { 
                boardDiv.classList.remove('stop-btn-effects');
            };
        };
        toggleBoard();

        board.forEach(row => {
            row.forEach((cell, index) => {
                //anything clickable should be a button
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");
                // create data attribute to identify the column - this makes it easier to pass into our playRound function
                cellButton.dataset.row = board.indexOf(row);
                cellButton.dataset.column = index;
                cellButton.textContent = cell;
                boardDiv.appendChild(cellButton);
            }) 
        })
    };

    function clickHandlerBoard(e) {
        const selectedCellRow = e.target.dataset.row;
        const selectedCellCol = e.target.dataset.column;
        // make sure the columnn is clicked and not the gaps in between
        if (!selectedCellCol) return;
        game.playRound(selectedCellRow, selectedCellCol);
        updateScreen();
    }

    boardDiv.addEventListener("click", function(e) {
        if (gameBoard.checkBoard() === true) {
            // do nothing, game has ended
        } else {
            clickHandlerBoard(e)
        }
    });

    resetButton.addEventListener("click", () => {   
        gameBoard.clearBoard();
        game.setToPlayerOne()
        updateScreen();
        formPopup.showModal();
    });

    // initial render
    updateScreen();
};

screenController();