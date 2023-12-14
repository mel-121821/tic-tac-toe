// tic tac toe instructions
// Store the gameboard as an array inside of a gameboard object
// your players are going to be stored in objects and you're probably going to want an object to control the flow of the game itself
// have as little global code as possible, tuck as much as you can in factories
// if you only need a single instance of something (eg. the gameboard, the displayController etc.), then wrap the factory inside an IFFE so it cannot be used to create additional instances
// think carefully about where each bit of logic should reside, each piece of functionality should be able to fit in the game, player or gameboard objects. Spend some time brainstorming here
// focus on getting a working game in the console first...

const createGameBoard = (function() {
    // This variable should be private so that the user cannot manipulate it directly
    const gameBoard = Array.apply(null, Array(9));
    console.log(gameBoard)

    const placeMarker = (marker, arrayPlace) => {
        if (typeof gameBoard[arrayPlace] == "undefined") {
        gameBoard.splice(arrayPlace, 1, `${marker}`);
        console.log(gameBoard);
        } else {
            // do nothing
            console.log("Do nothing")
        }
    };
    return {
        placeMarker,
    }
})();

console.log(createGameBoard.placeMarker("X", 4));
console.log(createGameBoard.placeMarker("O", 4));
console.log(createGameBoard.placeMarker("M", 1))

// function createPlayer(name, marker) {
//     const name = name;
//     const marker = marker
// }