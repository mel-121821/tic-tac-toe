Project: Tic Tac Toe

Instructions:

- [x] Set up your project with HTML, CSS and Javascript files and get the Git repo all set up.

- [x] You’re going to store the gameboard as an array inside of a Gameboard object, so start there! Your players are also going to be stored in objects, and you’re probably going to want an object to control the flow of the game itself.

- [ ] Your main goal here is to have as little global code as possible. Try tucking as much as you can inside factories. If you only need a single instance of something (e.g. the gameboard, the displayController etc.) then wrap the factory inside an IIFE (module pattern) so it cannot be reused to create additional instances.

- [ ] In this project, think carefully about where each bit of logic should reside. Each little piece of functionality should be able to fit in the game, player or gameboard objects. Take care to put them in “logical” places. Spending a little time brainstorming here can make your life much easier later!

- If you’re having trouble, Building a house from the inside out (https://www.ayweb.dev/blog/building-a-house-from-the-inside-out) is a great article that lays out a highly applicable example both of how you might approach tackling this project as well as how you might organize and structure your code.

- [x] Focus on getting a working game in the console first. Make sure you include logic that checks for when the game is over! You should be checking for all winning 3-in-a-rows and ties. Try to avoid thinking about the DOM and your HTML/CSS until your game is working.

- [ ] Once you have a working console game, create an object that will handle the display/DOM logic. Write a function that will render the contents of the gameboard array to the webpage (for now, you can always just fill the gameboard array with "X"s and "O"s just to see what’s going on).

- [ ] Write the functions that allow players to add marks to a specific spot on the board by interacting with the appropriate DOM elements (e.g. letting players click on a board square to place their marker). Don’t forget the logic that keeps players from playing in spots that are already taken!

- [ ] Clean up the interface to allow players to put in their names, include a button to start/restart the game and add a display element that shows the results upon game end!

_____________________________________________


Media:

Dummy bg image: PIRO from Pixabay
https://pixabay.com/photos/clover-four-leaf-clover-lucky-clover-1949981/

____________________________________________


Tools:

____________________________________________


Resources:

Create an empty array of a given size:
https://stackoverflow.com/questions/34937349/javascript-create-empty-array-of-a-given-size

Using .splice() to replace items in an array:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

How to check if an array value is undefined:
https://stackoverflow.com/questions/2673147/javascript-array-value-is-undefined-how-do-i-test-for-that

2D Arrays:
https://www.freecodecamp.org/news/javascript-2d-arrays/

How to check if all values in an array are equal:
https://dev.to/rajnishkatharotiya/function-to-check-if-all-records-are-equal-in-array-javascript-3mo3

Getting columns from a 2D Array:
https://stackoverflow.com/questions/7848004/get-column-from-a-two-dimensional-array

For...of loops:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of

Error: unexpected identifier:
https://runjs.app/blog/how-to-solve-unexpected-identifier-error

Array.push
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push

Adding a break to a for loop:
https://stackoverflow.com/questions/9830650/how-to-stop-a-javascript-for-loop

indexOf in 2d arrays:
https://stackoverflow.com/questions/24943200/javascript-2d-array-indexof

Checking for a value in a 2d array (solution using the .some() method):
https://stackoverflow.com/questions/48538162/how-to-check-if-a-two-dimensional-array-includes-a-string

Checking for a value in a 2d array (solution using the .every() method):
https://stackoverflow.com/questions/53897673/check-if-all-values-in-array-are-true-then-return-a-true-boolean-statement-jav

Best Solution:
https://stackoverflow.com/questions/56022154/how-to-check-every-item-in-a-2d-array-for-specific-condition

Changing a value in a object:
https://stackoverflow.com/questions/4689856/how-to-change-value-of-object-which-is-inside-an-array-using-javascript-or-jquer