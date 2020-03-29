const cards = document.querySelectorAll('.memory-card'); // On met tous les cards dans une const

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
var score = 0;
var countPlay = 0;
const showScore = document.querySelector(".score");
const moves = document.querySelector(".moves");

function flipCard() {
    if(lockBoard) return;
    if(this=== firstCard) return;
    this.classList.add('flip'); // ajoute flip dans la classe de l'élément cliquer
    
    if(!hasFlippedCard) {
        // premier clique
        hasFlippedCard = true;
        firstCard = this;
        
        return;

    }
    
    // Deuxieme clique
    hasFlippedCard = false;
    secondCard = this;

   checkForMatch();
}
    

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework; // verifie si le data-framework des deux éléments cliquer est le même 
    countPlay += 1;
    console.log(countPlay);
    isMatch ? disableCards() : unFlipCards(); // si c'est le même on active la fonction disbleCards() sinon on active unFlipCards
    moves.innerHTML = countPlay;
    
}

function disableCards() {
    // quand les data-framework des deux éléments cliquer sont les mêmes on enleve l'eventlistener, pour empecher les interactions avec les cartes déjà trouvées
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    score += 15;
    console.log(score);
    showScore.innerHTML = score;
    
    resetBoard();
}

function unFlipCards(){
    
    lockBoard = true;
     // quand les data-framework ne sont pas les mêmes on enleve le flip des cartes cliquer pour qu'elles se retournent
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        
        resetBoard();
                
    }, 1500);// 1500 milisecondes
}

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos =  Math.floor(Math.random() * 6);
        card.style.order = randomPos;
    });
})();




cards.forEach(card => card.addEventListener('click', flipCard));