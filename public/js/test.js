const cards = document.querySelectorAll('.memory-card'); //List of all memory cards elemenst

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if(lockBoard) return;
    if(this=== firstCard) return;
    this.classList.add('flip'); // add the word 'flip' to each card the user pressed
    
    if(!hasFlippedCard) {
        //First click
        hasFlippedCard = true;
        firstCard = this;
        
        return;

    }
    
    //Second click
    hasFlippedCard = false;
    secondCard = this;

   checkForMatch();
}
    

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    
    isMatch ? disableCards() : unFlipCards();
}

function disableCards() {
    //It's a match
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    
    resetBoard();
}

function unFlipCards(){
    
    lockBoard = true;
     //Not a match
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        
        resetBoard();
                
    }, 1500);
}

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos =  Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));