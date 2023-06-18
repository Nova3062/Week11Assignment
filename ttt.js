/**
 * clicking a box will create an X or an O dpending on who's turn it is
 * turns are alternated, after x goes, 0 goes
 * the point of the game is to get three in a row up down or diagonally 
 * once three in a row, column or diagonal is achived a winner is declared, if not it is tie
 * winning combinations are needed
 * need systens to check for game winner and tie if no more moves are avaiable and notify the DOM 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */

// document.querySelectorAll(".cell");
let gameOver = false //initializing variables to false and true respectively
let gameActive = true;
let gameBoard = ['', '', '', '', '', '', '', '', ''] //array representing the state of the game board with empty string representing empty cells to be clicked on 

const wc = [// Winning combinations
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6] // Diagonals
];


let gameCells = document.querySelectorAll('.cell'); //variable assigned to all of the elements with the class name cell
let currentPlayer = 'x' //current player
console.log(gameCells)

for (let cell of gameCells){//event listener block and cell click, for loop to iterate over each cell in gameCells
    cell.addEventListener('click', (event) => { //e can be short hand for event-- event listener added to each cell using "click" to activate function inside the listener
        let index = event.target.id//finds cells index within the array
        if (gameBoard[index] === '' && !gameOver){// if clicked cell is empty and game is not over following actions are run
            if (currentPlayer === 'x'){ //current player maked as x or o is added to the cell clicked
                currentPlayer = 'o'//player is switched
                document.getElementById('player-turn').innerHTML = "O's Turn"//player is switched, cell is marked and updated in DOM
                if ( gameBoard[index] === ''){
                    gameBoard[index] = 'x'
                }
            } else{
                currentPlayer ='x'
                document.getElementById('player-turn').innerHTML = "X's Turn"//player is switched cell is marked and updated in DOM
                if ( gameBoard[index] === ''){
                    gameBoard[index] = 'o'
                }
            } 
        } reDrawBoard() //functions called to update after the game and check for a winner or a draw 
        gameWinner()
        if (!gameOver){
            tieBreak()
        }
    })
} 


let reStart = document.getElementById('restart-button')
function restartButton(){
    location.reload()
}
reStart.addEventListener("click", restartButton);//function with event listener that when clicked restarts the gane and resets the game cells to empty values


function reDrawBoard(){ //updates cells on game board in the DOM
    for(let i =0; i < gameBoard.length; i++){
        document.getElementById(`${i}`).innerHTML = gameBoard[i]//iterates over the gameboard and sets the inner HTML of each cell to the corresponding value on the board
    }
}
reDrawBoard()

function gameWinner(){// function to check for winner by examining all winning combinations in the WC array
   let tempString = ''
        
        for ( let i = 0; i < wc.length; i++){
            tempString = gameBoard[wc[i][0]] + gameBoard[wc[i][1]] + gameBoard[wc[i][2]]///checks if three cells have the same mark correspoinding to a winning conbination of game cells with x's and o's
            if ( tempString === 'xxx'){
                document.getElementById('player-turn').innerHTML = "x wins the game"
                console.log('x wins')
                gameOver = true
            }
            if ( tempString === 'ooo'){
                document.getElementById('player-turn').innerHTML = "o wins the game"
                console.log('o wins')
                gameOver = true
            }
        }
}
function tieBreak(){// function to check for draw by checking to see if there are any empty cells remaining in the gameboard, if cells not found it annouces a draw to the DOM
    if (!gameBoard.some((e)=> {
       return e === ''
    })){
        document.getElementById('player-turn').innerHTML = "Game is a Draw!"

    }
}