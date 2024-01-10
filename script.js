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
    // console.log(board);
    // console.log(board[0])
    // console.log(board[1]);
    // console.log(board[2])
    

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
            console.log("There is a marker here already")
        }
    };

    const checkValidity = () => moveValid;
    
    const checkMatch = () => {
        // console.log(board[0])
        // console.log(board[0][0]);
        // let result = 
        // console.log(board[0][0].length);
        if (board[0].every(val => val === board[0][0]) && (board[0][0].length) > 0) {
            result = true
        } else {
            result = false
        }
        console.log(result)
    }

    checkMatch();

    return {
        markBoard, checkValidity, checkMatch
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


const game = function() {
    let activePlayer = Players.getPlayers()[0];
    // console.log(activePlayer);

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === Players.getPlayers()[0] ? Players.getPlayers()[1] : Players.getPlayers()[0];
        // console.log(activePlayer);
    }

    const getActivePlayer = () => activePlayer;

    function placeMarker(inputRow, inputColumn){
        gameBoard.markBoard(getActivePlayer().marker, inputRow, inputColumn)
    }

    function playRound(inputRow, inputColumn) {
        console.log(`${getActivePlayer().name} marks the board...`)
        placeMarker(inputRow, inputColumn);
        // console.log(gameBoard.checkValidity());
        if (gameBoard.checkValidity() == true) {
            switchPlayerTurn();
            printNewRound();
            gameBoard.checkMatch();
        } else {
            // do nothing
            console.log("Please choose a different square")
            printNewRound();
        }
    }

    const printNewRound = () => {
        console.log(`${getActivePlayer().name}'s turn`);
    }

    printNewRound();

    return {getActivePlayer, playRound}

}();








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