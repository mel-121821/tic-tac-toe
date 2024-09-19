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

    // let board = [["X","O","X"],["O","O","X"],["O","X",""]];
    

    let moveValid = true;
    // console.log(moveValid);

    const markBoard = (marker, arrayRow, arrayColumn) => {
        if (board[arrayRow][arrayColumn] == "") {
        board[arrayRow][arrayColumn] = `${marker}`;
            console.log(board);
            moveValid = true;
        } else {
            // do nothing
            moveValid = false;
            console.log(board);
            console.log("There is a marker here already")
        }
    };

    const checkValidMove = () => moveValid;
    

    const arrayMatch = (array) => {
        // console.log(array);
        // console.log(array[0]);
        if (array.every(val => val === array[0]) && (array[0] !== "")) {
            threeWayMatch = true
        } else {
            threeWayMatch = false
        }
    };
    
    let allBoardCombos = [];

    const getAllBoardCombos = () => {
        for (let row of board) {
            allBoardCombos.push(row)
            }
        for (let c = 0; c < board[0].length; c++) {
            let col = board.map(function(value,index) { return value[c];});
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
        checkAvailableSpaces();
        getAllBoardCombos();
        for (combo of allBoardCombos) {
            arrayMatch(combo);
            if (threeWayMatch === true) {
                break
            }
            // console.log(threeWayMatch)
        }
        resetAllBoardCombos();
    }

    const checkAvailableSpaces = () => {
        boardFull = false;
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                // console.log(board[i][j])
                if (board[i][j] === "") {
                    boardFull = false;
                    break;
                } else {
                    boardFull = true;
                }
            }
        }
        return boardFull;
        // console.log(board)
        // console.log(boardFull)
    }

    const clearBoard = () => {
        for (let i = 0; i < board.length; i++) {
            // console.log(board.length)
            // console.log(board[i])
            for (let j = 0; j < board[i].length; j++) {
                // console.log(board[i].length)
                // console.log(board[i][j]);
                board[i][j] = "";
            }
        }
        
        console.log(board);
    }

    const getBoard = () => board;


    checkBoard();

    return {
        // move checkValidMove, CheckBoard to gameController?
        markBoard, checkValidMove, checkBoard, clearBoard, getBoard
    }
})();

// console.log(gameBoard.markBoard("X", 0, 0));
// console.log(gameBoard.markBoard("O", 0, 0));
// console.log(gameBoard.markBoard("M", 2, 2))




// ____________Players________________

const Players = function() {
    const playerOne = "Player One"
    const playerTwo = "Player Two"

    const players = [
        {
            name: playerOne,
            marker: "X"
        },
        {
            name: playerTwo,
            marker: "O"
        }
    ]

    const getPlayers = () => players;
    
    return {getPlayers};
}();







// __________Game Flow______________


function gameController(){ 
    let activePlayer = Players.getPlayers()[0];
    // console.log(activePlayer);

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === Players.getPlayers()[0] ? Players.getPlayers()[1] : Players.getPlayers()[0];
        // console.log(activePlayer);
    }

    const setToPlayerOne = () => {
        activePlayer = Players.getPlayers()[0];
    }

    const getActivePlayer = () => activePlayer;

    function placeMarker(inputRow, inputColumn){
        gameBoard.markBoard(getActivePlayer().marker, inputRow, inputColumn)
    }

    function playRound(inputRow, inputColumn) {
        console.log(`${getActivePlayer().name} marks the board...`)
        placeMarker(inputRow, inputColumn);
        // console.log(gameBoard.checkValidMove());
        if (gameBoard.checkValidMove() == true) {
            gameBoard.checkBoard();
            console.log(`Is there a winner? ${threeWayMatch}`);
            console.log(`Is the board full? ${boardFull}`)
            checkForWinner();
        } else {
            // do nothing
            console.log("Please choose a different square")
            printNewRound();
        }
    }

    const printNewRound = () => {
        console.log(`${getActivePlayer().name}'s turn`);
    }

    const checkForWinner = () => {
        if (threeWayMatch === true) {
            console.log(`${getActivePlayer().name} wins!`)
            // gameBoard.clearBoard();
        } else if (threeWayMatch === false && boardFull === true) {
            console.log("Tie game!")
            // gameBoard.clearBoard();
        } else {
            switchPlayerTurn();
            printNewRound();
        }
    }

    printNewRound();

    return {getActivePlayer, playRound, getBoard: gameBoard.getBoard, setToPlayerOne}

};

// const game = gameController();

// __________Display Control______________

function screenController() {
    const game = gameController();
    const playerDiv = document.querySelector('.player-div');
    const boardDiv = document.querySelector('.board-div');
    const resetButton = document.querySelector('.reset-banner > button')

    const updateScreen = () => {
        // clear the board
        boardDiv.textContent = "";

        // get the newest version of board and player turn
        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        // display player's turn
        playerDiv.textContent = `${activePlayer.name}'s turn...`;

        const playerDisplay = () => {
            if (threeWayMatch === true) {
                console.log(threeWayMatch)
                playerDiv.textContent = `${activePlayer.name} wins!`;
            } else {
                playerDiv.textContent = `${activePlayer.name}'s turn...`;
            }
        }
        playerDisplay();

        board.forEach(row => {
            // console.log(board.indexOf(row))
            row.forEach((cell, index) => {
                //anything clickable should be a button
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");
                // create data attribute to identify the column - this makes it easier to pass into our playRound function
                cellButton.dataset.row = board.indexOf(row);
                cellButton.dataset.column = index;
                cellButton.textContent = cell;
                // console.log(cell[index])
                // console.log(cell)
                boardDiv.appendChild(cellButton);
            }) 
        })
    }

    function clickHandlerBoard(e) {
        const selectedCellRow = e.target.dataset.row;
        const selectedCellCol = e.target.dataset.column;
        console.log(selectedCellRow, selectedCellCol)
        // make sure the columnn is clicked and not the gaps in between
        // if (!selectedCell) return;
        game.playRound(selectedCellRow, selectedCellCol);
        updateScreen()
    }
    boardDiv.addEventListener("click", clickHandlerBoard);

    resetButton.addEventListener("click", () => {   
        gameBoard.clearBoard();
        game.setToPlayerOne()
        updateScreen();
        console.log("clicked");
    });

    // initial render
    updateScreen();
}

screenController();

// __________Get Player Data______________







//______________Unused code_____________

// function createPlayer(name, marker) {
    // const name = name;
    // const marker = marker
    // You don't need to define name and marker with const. You are defining them when you return the object with the name and marker

    // const steve = createPlayer("Steve", "X");
// console.log(steve.name);
// console.log(steve.marker);
// console.log(steve.placeMarker(0, 0))
// console.log(steve.placeMarker(0, 1))

// const dustin = createPlayer("Dustin", "O");
// console.log(dustin.name);
// console.log(dustin.marker);
// console.log(dustin.placeMarker(1, 0))
// console.log(dustin.placeMarker(1, 0))