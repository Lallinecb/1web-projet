const cards = document.querySelectorAll('.memory-card'); // On met tous les cards dans une const

let flipCards = false;
let lockBoard = false;
let firstClick, secondClick;
var score = 0;
var countPlay = 0;
const showScore = document.querySelector(".score");
const moves = document.querySelector(".moves");
const showScoreWin = document.querySelector(".scorewin");
const movesWin = document.querySelector(".moveswin");


function flipCard() {
    if(lockBoard) return;
    if(this=== firstClick) return;
    this.classList.add('flip'); // ajoute flip dans la classe de l'élément cliquer
    
    if(!flipCards) {
        // premier clique
        flipCards = true;
        firstClick = this;
        
        return;

    }
    
    // Deuxieme clique
    flipCards = false;
    secondClick = this;

   checkForMatch();
}
    

function checkForMatch() {
    let isMatch = firstClick.dataset.framework === secondClick.dataset.framework; // verifie si le data-framework des deux éléments cliquer est le même 

    countPlay += 1;
    console.log(countPlay);
    isMatch ? disableCards() : unFlipCards(); // si c'est le même on active la fonction disbleCards() sinon on active unFlipCards
    moves.innerHTML = countPlay;
    
}

function disableCards() {
    // quand les data-framework des deux éléments cliquer sont les mêmes on enleve l'eventlistener, pour empecher les interactions avec les cartes déjà trouvées
    firstClick.removeEventListener('click', flipCard);
    secondClick.removeEventListener('click', flipCard);
    score += 15;
    console.log(score);
    showScore.innerHTML = score;
    
    if(score === 45){
        document.querySelector(".win").style.display = 'block';
        document.querySelector(".memory-game").style.display = 'none';
        document.querySelector(".displaynone").style.display = 'none';
        movesWin.innerHTML = countPlay;
        showScoreWin.innerHTML = score;
    } 
    
    resetBoard();
}

function unFlipCards(){
    
    lockBoard = true;
     // quand les data-framework ne sont pas les mêmes on enleve le flip des cartes cliquer pour qu'elles se retournent
    setTimeout(() => {
        firstClick.classList.remove('flip');
        secondClick.classList.remove('flip');
        
        resetBoard();
                
    }, 1500);// 1500 milisecondes
}

function resetBoard(){
    [flipCards, lockBoard] = [false, false];
    [firstClick, secondClick] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos =  Math.floor(Math.random() * 6);
        card.style.order = randomPos;
    });
})();




cards.forEach(card => card.addEventListener('click', flipCard));