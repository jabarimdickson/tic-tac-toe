let Gameboard = (() => {
    let board = Array.from(document.querySelectorAll(".box"));

    return {board}
})()

const Player = (mark) => {
    function getMark() {
        return mark;
    }

    return {getMark}
}

let playerX = Player("X");
let playerO = Player("O");


let gameplayController = (() => {
    let turn = 1;
    let turnPlayer = playerX;

    function switchTurnPlayer() {
        if (turnPlayer === playerX) {
            turnPlayer = playerO;
        } else if (turnPlayer === playerO) {
            turnPlayer = playerX;
        }
    }

    function putMark(e) {
            if (this.textContent !== "") {
                return;
            } else {
                this.textContent = turnPlayer.getMark();
                switchTurnPlayer();
                return console.log(turn++);
            }
        }
    
        Gameboard.board.forEach(
            x => x.addEventListener("click", putMark)
        )

    return {playerX, playerO, turnPlayer, putMark}
})()