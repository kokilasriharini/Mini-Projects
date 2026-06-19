let gameMode = "";

let player1Choice = "";
let player2Choice = "";

let player1Score = 0;
let player2Score = 0;

let currentPlayer = 1;

let computerChoice = "";

let result = "";

let drawCount = 0;
let totalRounds = 0;
let maxRounds = 10;

function resetMatch() {
    const popup = document.createElement("div");
    popup.id = "resetPopup";
    popup.className = "popup";
    popup.innerHTML = `<div id="resetPopup" class="popup hidden">
    <div class="popup-box">
        <h2>Reset Game?</h2>
        <div class="popup-buttons">
            <button onclick="restartGame()">Restart</button>
            <button onclick="reselectMode()">Reselect</button>
            <button onclick="closePopup()">Cancel</button>
        </div>
    </div>
</div>`;
  document.body.appendChild(popup);
}
function closePopup() {
    const popup = document.getElementById("resetPopup");
    if (popup) popup.remove();
}
function restartGame() {
    player1Score = 0;
    player2Score = 0;
    drawCount = 0;
    totalRounds = 0;
    currentPlayer = 1;
    result = "";
    document.getElementById("score1").textContent = "0";
    document.getElementById("score2").textContent = "0";
    document.getElementById("rounds").textContent = "Rounds 0";
    document.getElementById("draws").textContent = "Draws 0";
    document.getElementById("turnText").textContent = "Player 1 Turn";
    document.getElementById("FinalResult").textContent = "";
    document.getElementById("result1").innerHTML = "";
    document.getElementById("result2").innerHTML = "";
    closePopup();
}
function reselectMode() {
    player1Score = 0;
    player2Score = 0;
    drawCount = 0;
    totalRounds = 0;
    currentPlayer = 1;
    gameMode = "";
    document.getElementById("game").style.display = "none";
    document.getElementById("active").style.display = "flex";
    closePopup();
}
const darkToggle = document.querySelector(".toggleTrack");
const label = document.querySelector(".state-label");
const app = document.querySelector(".app");
darkToggle.addEventListener("click", () => {
    darkToggle.classList.toggle("is-day");
    app.classList.toggle("is-day");

    if(app.classList.contains("is-day")){
        label.textContent = "Light";
    } else {
        label.textContent = "Dark";
    }
});

const btns = document.querySelector(".btn");
const btn = document.querySelector(".btn1");
const Playercard = document.getElementById("player");
const computercard = document.getElementById("computer");
Playercard.addEventListener("mouseenter", () => {
    btns.style.display = "block";
});
Playercard.addEventListener("mouseleave", () => {
    btns.style.display = "none";
});
computercard.addEventListener("mouseenter", () => {
    btn.style.display = "block";
});
computercard.addEventListener("mouseleave", () => {
    btn.style.display = "none";
});

function playervsplayer(){
    gameMode = "pvp";
    document.getElementById("game").style.display = "block";
    document.getElementById("result1").style.display = "block";
    document.getElementById("active").style.display = "none";
}
function computervsplayer(){
    gameMode = "computer";
    document.getElementById("game").style.display = "block";
    document.getElementById("result2").style.display = "block";
    document.getElementById("active").style.display = "none";
    document.getElementById("score2").textContent = "0";
}
function game(choice){
    console.log(choice);
    if(gameMode === "pvp"){
        if(currentPlayer === 1){
            player1Choice = choice;
            currentPlayer = 2;
             document.getElementById("result1").innerHTML = `
                <p>Player 1 : ${player1Choice}</p>
                <p>Player 2 : ${player2Choice}</p>`;
            document.getElementById("turnText").textContent = "Player 2 Turn";
            return;
        }
        if(currentPlayer === 2){
            player2Choice = choice;
            checkWinner(player1Choice, player2Choice);
            document.getElementById("result1").innerHTML = `
                <p>Player 1 : ${player1Choice}</p>
                <p>Player 2 : ${player2Choice}</p>
                <h2>${result}</h2>
            `;
            updateScore();
            currentPlayer = 1;
            document.getElementById("turnText").textContent = "Player 1 Turn";
            return;
        }
    }
    else if(gameMode === "computer"){
        player1Choice = choice;
        const choices = ["Rock", "Paper", "Scissors"];
        computerChoice = choices[Math.floor(Math.random() * choices.length)];
        
        checkWinner(player1Choice, computerChoice);
     
        if(result === "Player 1 Wins!"){
            result = "You Win!";
        }
        else if(result === "Player 2 Wins!"){
            result = "Computer Wins!";
        }
        document.getElementById("result2").innerHTML = 
        `<p>You : ${player1Choice}</p>
         <p>Computer : ${computerChoice}</p>
         <p>${result}</p>`;
        updateScore();
    }
}
function checkWinner(choice1, choice2){
    totalRounds++;
    if(choice1 ===  choice2){
        result = "Draw";
        drawCount++;
    }
    else if(
        (choice1 === "Rock" && choice2 === "Scissors") ||
        (choice1 === "Paper" && choice2 === "Rock") ||
        (choice1 === "Scissors" && choice2 === "Paper")
    ){
        result = "Player 1 Wins!";
        player1Score++;
    }
    else{
        result = "Player 2 Wins!";
        player2Score++;
    }
    
}
function updateScore(){
    document.getElementById("score1").textContent = `${player1Score}`;
    if(gameMode === "computer"){
        document.getElementById("score2").textContent =
        `${player2Score}`;
    }
    else{
        document.getElementById("score2").textContent =
        `${player2Score}`;
    }
    document.getElementById("rounds").textContent =
        `Rounds  ${totalRounds}`;
    document.getElementById("draws").textContent =
        `Draws  ${drawCount}`;
    
        if(totalRounds === maxRounds){
            if(player1Score > player2Score){
                 document.getElementById("FinalResult").textContent = "Player 1 wins the Match!";
                 setTimeout(() => {
                    resetMatch();
                 },3000);
            }
            else if(player2Score > player1Score){
                if(gameMode === "computer"){
                    document.getElementById("FinalResult").textContent =
                    "Computer Wins The Match!";
                }
                else{ 
                    document.getElementById("FinalResult").textContent = 
                    "Player 2 Wins the Match!";
                }
                setTimeout(() => {
                        resetMatch();
                    },3000);
            }
            else{
                document.getElementById("FinalResult").textContent = "Match draw!";
                setTimeout(() => {
                    resetMatch();
                },3000);
            }            
        }
    }
 



