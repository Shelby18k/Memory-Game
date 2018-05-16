/*
 * Create a list that holds all of your cards
 */

//Creation of a list of all the icons classes
var icons = new Array('fa fa-diamond','fa fa-paper-plane-o','fa fa-anchor','fa fa-bolt',
						'fa fa-cube','fa fa-anchor','fa fa-leaf','fa fa-bicycle','fa fa-diamond',
						'fa fa-bomb','fa fa-leaf','fa fa-bomb','fa fa-bolt','fa fa-bicycle','fa fa-paper-plane-o',
						'fa fa-cube');
icons = shuffle(icons);


var listItems = document.querySelectorAll('.card i');

//Selecting the moves class
var moves = document.querySelector('.moves');
var numberOfMoves = 0;
let matchedCards = 0;
let count = 0;

//Selecting the stars
let stars = document.querySelector('.stars');
stars.style.cssText = "color: rgba(0,0,0,0.6);";

//Variable to store number of matches

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

//Looping through all the cards to add dynamic icons
 for(let i=0;i<listItems.length;i++){
 	listItems[i].setAttribute('class',icons[i]);
 }

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 let openCards = new Array();
let match = 0;

//Getting all the cards list
const cardList = document.querySelectorAll('.card');
const iconsList = document.querySelectorAll('.card i');
for(let i=0;i<cardList.length;i++){
	cardList[i].addEventListener('click',showCard,true);
	iconsList[i].addEventListener('click', showCard,true);
}

//Adding open and show class to the clicked card
function displayCard(clickedCard){
	openCards.push(clickedCard);
	clickedCard.classList.add("open","show");
}

//Adding match class to the matched cards
function cardsMatched(){
	openCards[0].classList.add("match");
	openCards[1].classList.add("match");
	matchedCards++;
	openCards = [];
}

//When no match is found
function noMatch(){

	setTimeout(function(){
		
		openCards[0].classList.toggle("shake");
		openCards[1].classList.toggle("shake");
		
	},300);

	setTimeout(function(){
		if(typeof openCards[0] !== 'undefined' && typeof openCards[1] !== 'undefined'){
		openCards[0].classList.remove("open","show");
		openCards[1].classList.remove("open","show");
		openCards[0].classList.remove("shake");
		openCards[1].classList.remove("shake");
		openCards = [];
		}
	},900);
}


//Function to increment number of moves
function incrementMoves(clickedCard){
	if(clickedCard.classList.contains("open")){
	numberOfMoves += 1;
	moves.innerHTML = numberOfMoves;
	}
}


//Function to remove Stars based on user's performance
function removeStars(){
	let firstStar = document.querySelector('.fa-star');
	firstStar.remove();
}

//Adding stars again on restart
function addStars(){
	let stars = document.querySelector('.stars');
	stars.innerHTML = "<li><i class='fa fa-star'></i></li>" + 
					   "<li><i class='fa fa-star'></i></li>" + 
					   "<li><i class='fa fa-star'></i></li>";
}

function youWon(){
	let overlay = document.querySelector('.overlay');
	let modal = document.querySelector('.modal');
	let tick = document.querySelector('.tick');
	overlay.style.cssText = "visibility: visible;";
	modal.style.cssText = "visibility: visible";
	tick.classList.add("rotate");
	let numberMoves = document.querySelector('.total-moves-number');
	numberMoves.innerHTML = "<b>" + numberOfMoves + "</b>";
}

//Click event listener function

function showCard(event){
	let clickedCard = event.target;
	if(!clickedCard.classList.contains("open") && clickedCard.className === "card"){

		if(openCards.length < 2){
			displayCard(clickedCard);
		}

		if(openCards.length === 2){
			if(openCards[0].innerHTML.trim() === openCards[1].innerHTML.trim()){
				if(typeof openCards[0] !== 'undefined' && typeof openCards[1] !== 'undefined'){
					cardsMatched();
					incrementMoves(clickedCard);
			}
				
			}else{
				if(typeof openCards[0] !== 'undefined' && typeof openCards[1] !== 'undefined'){
				 	noMatch();
				 	incrementMoves(clickedCard);
				}
			}
		}

		if(numberOfMoves === 10 && count === 0){
			removeStars();
			count = 1;
		}
		 if (numberOfMoves === 14 && count === 1 ) {
			removeStars();
			count =0;
		}
	}

	if(matchedCards === 8){
		youWon();
	}


}

function startGameOnceAgain(){
	icons = shuffle(icons);
	var listItems = document.querySelectorAll('.card i');

 //Getting all the cards list
const cardList = document.querySelectorAll('.card');

//Looping through all the cards to add dynamic icons
 for(let i=0;i<listItems.length;i++){
 	listItems[i].setAttribute('class',icons[i]);
 	cardList[i].setAttribute('class',"");
 	cardList[i].classList.add("card");
 	numberOfMoves = 0;
 	moves.innerHTML = numberOfMoves;
 	addStars();
 }


}


let restart = document.querySelector('.restart');
restart.addEventListener('click',function(){
	startGameOnceAgain();
});

let playAgain = document.querySelector('.play-again');
playAgain.addEventListener('click',function(){
	startGameOnceAgain();
	let overlay = document.querySelector('.overlay');
	let modal = document.querySelector('.modal');
	overlay.style.cssText = "visibility: hidden;";
	modal.style.cssText = "visibility: hidden";
});
