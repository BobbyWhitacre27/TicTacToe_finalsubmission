// Bobby's psuedocode to write the Tic Tac Toe game:

// 1. Players enter names and they are saved

// 2. A random player is assigned to go first

// 3. Players playe their move by clicking empty box

// 4. Player alternate moves after each click

// 5. If 3 in a row === A WINNER

// 6. If all spaces full and no 3 in a row === A TIE

// 7. Reset button clears the board to start new



// Players enter names
var p1button = document.getElementById("p1button")
var p1div = document.getElementById("p1div")
var p2button = document.getElementById("p2button")
var p2div = document.getElementById("p2div")

let names = []

function p1namefunc(){
  var p1name = document.getElementById("p1input").value
  p1div.innerHTML = `Player 1: ${p1name}`
  return names.push(p1name)
}

function p2namefunc(){
  var p2name = document.getElementById("p2input").value
  p2div.innerHTML = `Player 2: ${p2name}`
  return names.push(p2name)
}

p1button.addEventListener("click", p1namefunc)
p2button.addEventListener("click", p2namefunc)

// A random player is assigned to go first
var startButton = document.getElementById("startButton")

function randomPlayerfunc(){
  if(names.length === 2){
  console.log(names.length)
  let firstplayer = names[Math.floor(Math.random()*names.length)]
  console.log(firstplayer)
  randompdiv.innerHTML = `${firstplayer} goes first! ${firstplayer} will be X`
  }
}

startButton.addEventListener("click", randomPlayerfunc)

// 3. Players can play their move by clicking empty spaces
const cells = document.querySelectorAll(".cell");
const restartBtn = document.querySelector("#restartBtn");

// Define winning matches
const winConditions = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6],
];

// Need an array to store the users moves in
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

// Game begins after users names are entered
startButton.addEventListener("click", initializeGame)

// Function for the initial game state
function initializeGame() {
  cells.forEach(cell => cell.addEventListener("click", cellClicked));
  restartBtn.addEventListener("click", restartGame);
  running = true;
}

// Function to click cell 
function cellClicked() {
  const cellIndex = this.getAttribute("cellIndex");

  if(options[cellIndex] != "" || !running){
    return;
  }
  updateCell(this, cellIndex);
  checkWinner();
}

// Function to add players move to box
function updateCell(cell, index){
  options[index] = currentPlayer;
  cell.innerHTML = currentPlayer;
}

// Function to change player moves
function changePlayer(){
  currentPlayer = (currentPlayer == "X") ? "O" : "X";
  randompdiv.innerHTML = `${currentPlayer}'s turn`;
}

// Function to check for winner 
function checkWinner(){
let roundWon = false;
for (let i=0; i<winConditions.length; i++){
  const condition = winConditions[i];
  const cellA = options[condition[0]];
  const cellB = options[condition[1]];
  const cellC = options[condition[2]];

  if(cellA == "" || cellB =="" || cellC ==""){
    continue;
  }
  if(cellA == cellB && cellB == cellC){
    roundWon = true;
    break;
  }
}
if(roundWon){
  randompdiv.textContent = `${currentPlayer} wins!`
  running = false;
}else if(!options.includes("")){
  randompdiv.innerHTML = 'Draw!'
  running = false;
}
else{
  changePlayer();
}
}

// Reset game function
function restartGame(){
  currentPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  let firstplayer = names[Math.floor(Math.random()*names.length)]
  randompdiv.innerHTML = `${firstplayer} goes first! ${firstplayer} will be X`
  cells.forEach(cell => cell.innerHTML = "");
  running = true;
}
