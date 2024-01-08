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

    const markBoard = (marker, arrayRow, arrayColumn) => {
        if (board[arrayRow][arrayColumn] == "") {
        board[arrayRow][arrayColumn] = `${marker}`;
        console.log(board);
        } else {
            // do nothing
            console.log("There is a marker here already")
        }
    };
    return {
        markBoard,
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
    console.log(activePlayer);

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === Players.getPlayers()[0] ? Players.getPlayers()[1] : Players.getPlayers()[0];
        console.log(activePlayer);
    }

    const getActivePlayer = () => activePlayer;

    function placeMarker(inputRow, inputColumn){
        gameBoard.markBoard(getActivePlayer().marker, inputRow, inputColumn)
    }

    // switchPlayerTurn();

    return {switchPlayerTurn, getActivePlayer, placeMarker}

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