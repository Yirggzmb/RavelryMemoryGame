RavelryMemoryGame
=================

memorygame.htm - The main html file that runs the game
memory.js - the JavaScript file that acts as the game engine
memory.css - the stylesheet

Basics - Creates a game of Memory by drawing from my Ravelry project page.  Includes options for different board sizes, game mode, and for limiting the potential cards to finished	projects only.  Play is simple - just flip two cards and hope they match.  Once you've managed to clear the board, you can then reset and play again.


When the page loads, the api calls a funtion in the .js file that looks through all projects and pulls info (image url, project name, and project status) into an array.

Once the start button is pressed, the game first determines how many "cards" are needed. Then it checks if the "Finished Projects Only" option is selected.  If so, the game	pulls a random selection of cards and if they are marked "finished" adds them to the array of cards.  If the option is not selected, the game simply pulls a random selection without checking the status.

The game then prepares the deck by creating two of each card.  If the "Picture Matching" option is selected, the game creates two card entries that use the image url.  If the "Picture to Project Name Matcing" option is selected, the game creates one card entry using the image url, and one entry using the name of the project.  It then shuffles these cards.

The game then hides the form and draws the deck to the screen, placing the card layout in a table.


When the player clicks on a card, the game first checks to see how many cards have already been flipped.  If it is less than two, the game double checks it's a new card, displays the info on screen, and updates the marker array that keeps track of which cards are flipped.  The game then checks to see if this is the second card turned over.  If it is, the game checks to see if the two cards are a match.

If the cards are not a match, they are flipped back over and the marker reset so the player may try again.  If they are a match, the "score" (a counter of matches made) is updated, the cards are cleared from the screen, and the marker is reset so the player can keep playing.

After checking for a match, the game checks to see if all possible matches have been made.  If so, the winning message is displayed and the player is given the option to reset and play a new board.  Resetting clears the board and reshows the game form.