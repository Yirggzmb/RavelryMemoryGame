var gameData = new Array();	//to store just the important info

var boardWidth;			//to store width of board
var boardHeight;		//to store max board height
var cardCount;			//number of cards total
var pairsCount;			//number of cards to double

var cards = new Array();	//to store cards to use
var turnMarker;			//marker for when actually playing, holds cards played this round
var score = 0;			//the score
var moves = 0;			//moves made

function gamesetup(data){
	i=0;
	while(i<data.projects.length){

		//only store cards that have images
		 if(data.projects[i].thumbnail != null){
			name = data.projects[i].name;
			image = data.projects[i].thumbnail.src;
			state = data.projects[i].status;
			gameData.push([name, image, state]);
		}
		i++;
	}	
}


function createGame(){
	//reset info before calculating
	boardWidth = 0;
	boardHeight = 0;
	cards = new Array();
	turnMarker = new Array();
	score = 0;
	moves = 0;

	//get data from form
	game = document.getElementById('gameType').value;
	mod = document.getElementById('finished').checked;

	//calculate draw stats
	boardWidth = document.getElementById('gameWidth').value;
	boardHeight = document.getElementById('gameHeight').value;
	cardCount = boardWidth * boardHeight;
	pairsCount = cardCount / 2;

	//Likely there will be way more available cards than there's room for
	if(gameData.length > pairsCount){
		i=0;
		while(i<pairsCount){

			//pick cards at random
			var randomNum = Math.floor(Math.random()*gameData.length);

			if(mod){
				//if only finished projects is selected check that first
				if(gameData[randomNum][2] == "finished"){
					card = [gameData[randomNum][0], gameData[randomNum][1]];
					cards.push(card);
					gameData.splice(randomNum,1)
					i++;
				}
			}
			else{
				//if finished only not selected just pick things
				card = [gameData[randomNum][0], gameData[randomNum][1]];
				cards.push(card);
				gameData.splice(randomNum,1)
				i++;
			}
		}
	}
	drawBoard(game);
}

function prepareDeck(mode){
	//clear deck
	var cardsList = new Array();

	//fill deck
	i=0;
	while(i<cards.length){
		cardsList.push(['<img src="'+cards[i][1]+'">', i]);			//add card image
		if(mode==1){ cardsList.push([cards[i][0], i]); }	//if mode is image to title, add title
		else{ cardsList.push(['<img src="'+cards[i][1]+'">', i]); }		//otherwise add another image

		i++;
	}
	
	//shuffle deck
	shuffles = 100;
	i=0;
	while(i<shuffles){
		var randomNum = Math.floor(Math.random()*cardsList.length);
		card = [cardsList[randomNum][0], cardsList[randomNum][1]];
		cardsList.splice(randomNum,1)
		cardsList.push(card);
		i++;
	}

	

	return cardsList;	//send deck back so it can be drawn on screen
	
}

function drawBoard(mode){
	document.getElementById('gamecontents').innerHTML = "";
	document.getElementById('formcontents').style.display = "none";

	cardsList = prepareDeck(mode);


	//print cards to screen
	display = "<table>";
	

	//Loop through the rows and columns of table to print deck
	h=0;
	i=0
	while(h<boardHeight){
		display += "<tr>";
		c=0;
		while(c<boardWidth){
			display += '<td><div class="card back" id="'+i+'" onclick="turnCard('+cardsList[i][1]+','+i+')"> </div></td>';
			c++;
			i++;
		}
		display += "</tr>";
		
		h++;
	}

	display += "</table>";
	display += '<div id="scoreDisplay"></div>';



	document.getElementById('gamecontents').innerHTML = display;
	showScore();
	
}

function showScore(){
	display = 'Matches: ' + score + '<br>Moves: '+ moves;
	document.getElementById("scoreDisplay").innerHTML = display;
}

function turnCard(id,deckid){		//id = card's id, used for matching.  deckid = card's place in deck.
	//turnMarker's length determines state of play
	//	0 = no cards flipped
	//	1 = 1 card flipped
	//	2 = 2 cards flipped, not allowed to make a move
	
	if(turnMarker.length < 2){

		//make sure someone didn't click the same card twice
		if((turnMarker.length == 1)){
			if(turnMarker[0][1] != deckid){
				turnMarker.push([id,deckid]);	//add card info to marker
		
				//display card
				document.getElementById(deckid).innerHTML = cardsList[deckid][0];
				document.getElementById(deckid).style.background = "white";
			}
		}
		else{
			turnMarker.push([id,deckid]);	//add card info to marker
	
			//display card
			document.getElementById(deckid).innerHTML = cardsList[deckid][0];
			document.getElementById(deckid).style.background = "white";
		}


		//Check marker again to see if need to check for match
		if(turnMarker.length == 2){
			setTimeout("checkMatch()",1000);
		}
		
		
	}

}

function checkMatch(){
	//check id to see if same
	if(turnMarker[0][0] == turnMarker[1][0]){
		//add to score and remove cards
		score++;
		document.getElementById(turnMarker[0][1]).style.visibility = "hidden";
		document.getElementById(turnMarker[1][1]).style.visibility = "hidden";
	}
	else{
		//show back of card if not a match
		document.getElementById(turnMarker[0][1]).innerHTML = " ";
		document.getElementById(turnMarker[1][1]).innerHTML = " ";
		document.getElementById(turnMarker[0][1]).style.background = "red";
		document.getElementById(turnMarker[1][1]).style.background = "red";
	}

	//no matter what, add to moves
	moves++;

	//clear marker
	turnMarker = new Array();

	//update score
	showScore();

	if(score == pairsCount){ winGame(); }
}

function winGame(){
	display = "You Win!<br>";
	display += '<div id="scoreDisplay"></div>';
	display += '<p><a class="hoverhand" onclick="resetAll()">Play Again?</a></p>';
	
	document.getElementById('gamecontents').innerHTML = display;
	showScore();
}

function resetAll(){
	document.getElementById('gamecontents').innerHTML = "";
	document.getElementById('formcontents').style.display = "block";
}
