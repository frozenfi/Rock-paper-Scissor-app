const game = () => {
  let pScore = 0;
  let cScore = 0;
  let rowP = 0;
  let rowC = 0;
  let winHistory = [];

  //Start the Game
  const startGame = () => {
    const playBtn = document.querySelector(".intro button");
    const introScreen = document.querySelector(".intro");
    const match = document.querySelector(".match");

    playBtn.addEventListener("click", () => {
      introScreen.classList.add("fadeOut");
      match.classList.add("fadeIn");
    });
  };

  
  //Play Match
  const playMatch = () => {
    const options = document.querySelectorAll(".options button");
    const playerHand = document.querySelector(".player-hand");
    const computerHand = document.querySelector(".computer-hand");
    const hands = document.querySelectorAll(".hands img");

    hands.forEach((hand) => {
      hand.addEventListener("animationend", function () {
        hand.style.animation = "";
      });
    });

    hands.forEach((hand) => {
      hand.addEventListener("animationstart", function () {
        hand.src = `./images/rock.png`;
      });
    });
    
    //Computer Options
    const computerOptions = ["rock", "paper", "scissors"];
    for (const option of options) {
      option.addEventListener("click", () => {
        //Computer Choice
        const computerNumber = Math.floor(Math.random() * 3);
        const computerChoice = computerOptions[computerNumber];

        const rockBtn = document.querySelector('.rock');
        const paperBtn = document.querySelector('.paper');
        const scissorsBtn = document.querySelector('.scissors');

        rockBtn.disabled=true; rockBtn.style.opacity='0.5';
        paperBtn.disabled=true; paperBtn.style.opacity='0.5';
        scissorsBtn.disabled=true; scissorsBtn.style.opacity='0.5';


        setTimeout(() => {
          //Here is where we call compare hands
          compareHands(option.textContent, computerChoice);

          rockBtn.disabled=false; rockBtn.style.opacity='1';
          paperBtn.disabled=false; paperBtn.style.opacity='1';
          scissorsBtn.disabled=false; scissorsBtn.style.opacity='1';

          //Update Images
          playerHand.src = `./images/${option.textContent}.png`;
          computerHand.src = `./images/${computerChoice}.png`;
        }, 1500);
        //Animation
        playerHand.style.animation = "shakePlayer 1s ease";
        computerHand.style.animation = "shakeComputer 1s ease";
      });
    }
  };
//For updating the score
  const updateScore = () => {
    const playerScore = document.querySelector(".player-score p");
    const computerScore = document.querySelector(".computer-score p");

    playerScore.textContent = pScore;
    computerScore.textContent = cScore;
  };


  
  const winner = document.querySelector(".winner");
  const compareHands = (playerChoice, computerChoice) => {


    //Checking for a tie
      if (playerChoice === computerChoice) {
        winner.textContent = "It is a tie";
        winHistory.push("t");
        rowP = 0;
        rowC = 0;
        console.log(winHistory);
        return;
      }
      //Check for Rock
      if (playerChoice === "rock") {
        if (computerChoice === "scissors") {
          winner.textContent = "Player Wins";
          pScore++;
          rowP++;
          rowC = 0;
          updateScore();
          winHistory.push("p");
          checkWinner();
          console.log(winHistory);
          return;
        } else {
          winner.textContent = "Computer Wins";
          cScore++;
          rowC++;
          rowP = 0;
          updateScore();
          winHistory.push("c");
          checkWinner();
          console.log(winHistory);
          return;
        }
      }
      //Check for Paper
      if (playerChoice === "paper") {
        if (computerChoice === "scissors") {
          winner.textContent = "Computer Wins";
          cScore++;
          rowC++;
          rowP = 0;
          updateScore();
          winHistory.push("c");
          checkWinner();
          console.log(winHistory);
          return;
        } else {
          winner.textContent = "Player Wins";
          pScore++;
          rowP++;
          rowC = 0;
          updateScore();
          winHistory.push("p");
          checkWinner();
          console.log(winHistory);
          return;
        }
      }

      //Check for Scissors
      if (playerChoice === "scissors") {
        if (computerChoice === "rock") {
          winner.textContent = "Computer Wins";
          cScore++;
          rowC++;
          rowP = 0;
          updateScore();
          winHistory.push("c");
          checkWinner();
          console.log(winHistory);
          return;
        } else {
          winner.textContent = "Player Wins";
          pScore++;
          rowP++;
          rowC = 0;
          updateScore();
          winHistory.push("p");
          checkWinner();
          console.log(winHistory);
          return;
        }
      }
    
    function checkWinner() {
     const winner = document.querySelector('.winner');
      const playerScore = document.querySelector('.player-score p');
      const computerScore = document.querySelector('.computer-score p');
    
     //This loads the gameover screen after a game is over
      const gameOver = () => {
      const playAgainBtn = document.querySelector('.restart-game button');
      const restartScreen = document.querySelector('.restart-game');
      const hands = document.querySelector('.hands');
      const options = document.querySelector('.options');

      hands.classList.add('fadeOut');
      options.classList.add('fadeOut');
      restartScreen.classList.add('fadeIn'); 

      playAgainBtn.addEventListener('click', function () {location.reload()});
    }
     // This decides the winner
      if (pScore == 10 || cScore == 10) {
          if (pScore > cScore) {
              winner.textContent = `Player Wins the game! Congratulations!`;
              gameOver();
              playerScore.textContent = '0';
              computerScore.textContent = '0';
               
          } else {
              winner.textContent = `Computer Wins the game! Better luck Next Time!`;
             gameOver();
              playerScore.textContent = '0';
              computerScore.textContent = '0';
                
          }
      }
        if( rowP>= 3 || rowC >= 3){
       if (rowP > rowC){
          winner.textContent = `Player Wins the game! Three wins in a row! Congratulations!`;
          gameOver();
          playerScore.textContent = '0';
          computerScore.textContent = '0';
         
        } else{ 
      winner.textContent = `Computer Wins the game! Three wins in a row! Better luck next time!`;
      //hideText();
      gameOver();
      playerScore.textContent = '0';
      computerScore.textContent = '0';

      return;
     };
     };

    }

  };
  //Is call all the inner function
  startGame();
  playMatch();

};
//start the game function
game();
