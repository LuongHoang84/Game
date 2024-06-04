const playerScore = document.getElementById("player-score");
const computerScore = document.getElementById("computer-score");
const resultMessage = document.getElementById("result-msg");
const winnerMessage = document.getElementById("winner-msg");
const optionsContainer = document.querySelector(".options-container");

const rockbtn = document.getElementById("rock-btn");
const paperbtn = document.getElementById("paper-btn");
const scissorsbtn = document.getElementById("scissors-btn");
const resetbtn = document.getElementById("reset-game-btn");

let User_Score = 0;
let Computer_Score = 0;

function getRandomComputerResult() {
    const options = ["Đá", "Giấy", "Kéo"];
    const index = Math.floor(Math.random() * options.length);
    return options[index];
}

function hasPlayerWonTheRound(player, computer) {
    if(player === "Đá" && computer === "Kéo"){
        return true;
    }
    else if(player === "Kéo" && computer === "Giấy"){
        return true;
    }

    else if(player === "Giấy" && computer === "Đá"){
        return true;
    }

    else{
        return false;
    }
}

function getRoundResults(userOption) {
    const computerResult = getRandomComputerResult();

    if(hasPlayerWonTheRound(userOption, computerResult)){
        User_Score++;
        return `Người chơi thắng! ${userOption} đánh bại ${computerResult}`;
    }
    else if(userOption === computerResult){
        return `Hòa! Cả hai chọn ${userOption}`;
    }
    else{
        Computer_Score++;
        return `Máy tính thắng! ${computerResult} đánh bại ${userOption}`;
    }
}

function showResults(userOption) {
    let message = getRoundResults(userOption);
    playerScore.innerText = User_Score;
    computerScore.innerText = Computer_Score;
    resultMessage.innerText = message;

    if(User_Score === 3 || Computer_Score === 3){
        winnerMessage.innerHTML = `${User_Score === 3 ? "Người chơi" : "Máy tính"} chiến thắng! &#x1F389 &#x1F389 &#x1F389`;
        optionsContainer.style.display = 'none';
        resetbtn.style.display = 'block';
    }
};

function resetGame() {
    User_Score = 0;
    Computer_Score = 0;
    playerScore.innerText = User_Score;
    computerScore.innerText = Computer_Score;
    resultMessage.innerText = "";
    winnerMessage.innerText = "";
    optionsContainer.style.display = 'block';
    resetbtn.style.display = 'none';
};


rockbtn.addEventListener("click", function() {
    showResults("Đá");
});

paperbtn.addEventListener("click", function(){
    showResults("Giấy");
});

scissorsbtn.addEventListener("click", function(){
    showResults("Kéo");
});

resetbtn.addEventListener("click", function(){
    resetGame();
})