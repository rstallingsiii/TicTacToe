
/*
    We store our game status element here to allow us to more easily 
    use it later on 
    */
    const statusDisplay = document.querySelector('.game--status');
    let gameActive = true;
    let currentPlayer = "X";
    const timer = document.getElementById("timer");
    let timerInterval;
    let timerValue = 0;    
    
    let gameState = [null, null, null, null, null, null, null, null, null];
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const winningMessage = () => `Player ${currentPlayer} has won!`;
    const drawMessage = () => 'Game ended in a draw!';
    const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
          
    
    function startTimer() {
        
        timerInterval = setInterval(function() {
          timerValue++;
          timer.textContent = timerValue;
        }, 1000);
      }
  
      function resetTimer() {
        clearInterval(timerInterval);
        timerValue = 0;
        timer.textContent = timerValue;
      }
    
    /*
    We set the initial message to let the players know whose turn it is
    */

    function setCellText(clickedCell, clickedCellIndex) {
        /*
        We update our internal game state to reflect the played move, 
        as well as update the user interface to reflect the played move
        */
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
    }

    function handlePlayerChange() {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusDisplay.textContent = currentPlayerTurn();
    }

   

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            let a = gameState[winCondition[0]];
            let b = gameState[winCondition[1]];
            let c = gameState[winCondition[2]];
    
            if (a === null || b === null || c === null) {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }
    
        let roundDraw = !roundWon && !gameState.includes(null);
        if (roundWon) {
            statusDisplay.textContent = winningMessage();
            gameActive = false;
            return;
        }
    
        if (roundDraw) {
            statusDisplay.textContent = drawMessage();
            gameActive = false;
            return;
        }
    
        handlePlayerChange();
    }
    

    function handleCellClick(clickedCellEvent) {
        /*
        We will save the clicked html element in a variable for easier further use
        */
        const clickedCell = clickedCellEvent.target;

        /*
        Here we will grab the 'data-cell-index' attribute from the clicked cell to identify where that cell is in our grid. 
        Please note that the getAttribute will return a string value. Since we need an actual number we will parse it to an 
        integer(number)
        */
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

        /* 
        Next up we need to check whether the call has already been played, 
        or if the game is paused. If either of those is true we will simply ignore the click.
        */
        if (gameState[clickedCellIndex] !== null || !gameActive) {
        return;
        }

        /* 
        If everything if in order we will proceed with the game flow
        */
        setCellText(clickedCell, clickedCellIndex);
        handleResultValidation();

    }

    function handleRestartgame() {
        gameActive = true;
        currentPlayer = "X";
        gameState = [null, null, null, null, null, null, null, null, null];
        statusDisplay.textContent = currentPlayerTurn();
        document.querySelectorAll('.cell').forEach(cell => cell.textContent = null);
        resetTimer();
    }

    startTimer();
    statusDisplay.textContent = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
    document.querySelector('.game--restart').addEventListener('click', handleRestartgame)
    document.querySelector('.game--ragequit').addEventListener('click', handleRestartgame)
