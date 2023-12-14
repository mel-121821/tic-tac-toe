// tic tac toe instructions
// Store the gameboard as an array inside of a gameboard object
// your players are going to be stored in objects and you're probably going to want an object to control the flow of the game itself
// have as little global code as possible, tuck as much as you can in factories
// if you only need a single instance of something (eg. the gameboard, the displayController etc.), then wrap the factory inside an IFFE so it cannot be used to create additional instances
// think carefully about where each bit of logic should reside, each piece of functionality should be able to fit in the game, player or gameboard objects. Spend some time brainstorming here
// focus on getting a working game in the console first...


// _______________Game Board__________________________

const createGameBoard = (function() {
    // This variable should be private so that the user cannot manipulate it directly
    const gameBoard = Array.apply(null, Array(9));
    // console.log(gameBoard)

    const markBoard = (marker, arrayPlace) => {
        if (typeof gameBoard[arrayPlace] == "undefined") {
        gameBoard.splice(arrayPlace, 1, `${marker}`);
        console.log(gameBoard);
        } else {
            // do nothing
            console.log("There is a marker here already")
        }
    };
    return {
        markBoard,
    }
})();

console.log(createGameBoard.markBoard("X", 4));
console.log(createGameBoard.markBoard("O", 4));
console.log(createGameBoard.markBoard("M", 1))




// _________________Players__________________________

function createPlayer(name, marker) {
    // const name = name;
    // const marker = marker
    // You don't need to define name and marker with const. You are defining them when you return the object with the name and marker
    function placeMarker(input){
        createGameBoard.markBoard(marker, input)
    }
    
    return {name, marker, placeMarker};
}

const steve = createPlayer("Steve", "X");
console.log(steve.name);
console.log(steve.marker);
console.log(steve.placeMarker(0))

const dustin = createPlayer("Dustin", "O");
console.log(dustin.name);
console.log(dustin.marker);
console.log(dustin.placeMarker(2))



// _________________Game__________________________