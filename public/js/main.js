/*
	This code is the implementation of the Memory Card Game with the following requirements and rules:

	Build a memory card game that can be played in a browser and shared with us in an online JavaScript editor such as Code Pen or similar.

	Rules:
        Generate a game of configurable size
        Player can turn over any two cards that are not matched yet
        If the two cards match, keep them flipped over
        If they don't match, turn them back over after a pause
        Repeat 2-4 until game is solved
        Indicate to the user that the game is completed and show the number of turns it took to complete
*/

var game = {
	
    /************************************************/
      /* INITIALIZE GAME FUNCTION                     */
    /************************************************/
      init: function () {
  
      // Get grid size from GUI
      game.total = document.getElementById("selectgridsize").value;    
      
      // Initialize game grid
          game.grid = [];
              
          for (var i=1; i<=game.total; i++) {
                game.grid.push(i);
                game.grid.push(i);
          }
      
          var currIndex = game.grid.length;
          var	tempValue = 0;
      var randIndex = 0;
  
      // Shuffle all the numbers in the grid to make sure all the card numbers are in random order
          while (0 !== currIndex) {
          randIndex = Math.floor(Math.random() * currIndex);
          currIndex -= 1;
          tempValue = game.grid[currIndex];
          game.grid[currIndex] = game.grid[randIndex];
          game.grid[randIndex] = tempValue;
          }
  
          // Clear all the game variables
          game.remain = game.total;
          game.moves = 0;
          game.mistakes = 0;
          game.first = null;
          game.second = null;
          if (game.timer != null) {
          clearTimeout(game.timer);
          game.timer = null;
          }
  
          // Render game grid
          var container = document.getElementById("game-grid"),
          card = null;
          container.innerHTML = "";
          for (var i=0; i<game.grid.length; i++) {
          card = document.createElement("div");
          card.innerHTML = "<img src='images/card-0.png'/>";
          card.classList.add("grid-card");
          card.setAttribute("id", "grid-card-" + i);
          card.dataset.idx = i;
          card.addEventListener("click", game.play);
          container.appendChild(card);
          }
  
          // console.log(game.grid);
    },
  
      // Initialize game variables
      remain : 0,     // number of pairs remaining to be matched
      moves : 0,      // total number of moves
      mistakes : 0,   // total number of mismatches
      first : null,   // first opened card
      second : null,  // second opened card
      show : 1000,    // delay/time to show wrong cards, in micro seconds
      timer : null,   // timer to flip back
  
      /************************************************/
      /* PLAY GAME FUNCTION                           */
      /************************************************/
      play : function () {
  
          if (game.second === null) {
              
              if (this.dataset.idx != game.first) {
            
                  // Save card selections
                  if (game.first === null) {
                      game.first = this.dataset.idx;
                  }
                  else {
                      game.second = this.dataset.idx;
                  }
  
                  // Flip card and show card
                  this.classList.add("open");
                  this.innerHTML = "<img src='images/card-" + game.grid[this.dataset.idx] + ".png'/>";
  
                  // Match cards after second card selection and update variables accordingly
                  game.moves++;
                  if (game.first!==null && game.second!==null) {
                      if (game.grid[game.first] == game.grid[game.second]) {
                          // Cards matched
                          game.update(true);
                          game.remain--;
  
                          // All cards matched
                          if (game.remain==0) {
                              // Delay to make sure card updated before final completion message
                              setTimeout(function () {
                                  alert("Congrats you win! Total moves: " + game.moves + " Total mistakes: " + game.mistakes)
                               }, game.show);
                          }
                       } else {
                            // Delay if it is a mismatch
                            game.timer = setTimeout(game.update, game.show);
                            game.mistakes++;
                      }
                  }
              }
          }
      },
  
      /************************************************/
      /* UPDATE GAME FUNCTION                         */
      /************************************************/
      update : function (matched) {
          
          // Process first card selection
          var card = document.getElementById("grid-card-" + game.first);
          card.classList.remove("open");
          if (matched) {
              // Change color to green by changing the class
              card.classList.add("matched");
          } else {
              // Set card image back to question mark
              card.innerHTML = "<img src='images/card-0.png'/>";
              card.addEventListener("click", game.play);
          }
  
          // Process second card selection
          card = document.getElementById("grid-card-" + game.second);
          card.classList.remove("open");
          if (matched) {
              // Change color to green by changing the class          
              card.classList.add("matched");
          } else {
              // Set card image back to question mark
              card.innerHTML = "<img src='images/card-0.png'/>";
              card.addEventListener("click", game.play);
          }
  
          // Reset user selections to allow next user attempt
          game.first = null;
          game.second = null;
          game.timer = null;
      }
  };
  
  // Initialize the game on windows load
  window.addEventListener("load", game.init);
  