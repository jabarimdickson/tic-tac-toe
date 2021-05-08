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

let xBoxes = [];
let oBoxes = [];


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

    function ownsBox() {
        for (let i = 0; i < 9; i++) {
            console.log('curr val: ', Gameboard.board[i] )
            if (Gameboard.board[i].textContent  && Gameboard.board[i].textContent === "X") {
                if (!xBoxes.includes(i)) {
                    xBoxes.push(i);
                }
            } else if ( Gameboard.board[i].textContent && Gameboard.board[i].textContent === "O") {
                if (!oBoxes.includes(i)) {
                    oBoxes.push(i);
                }
            }
        }
    }


    function putMark(e) {
            if (this.textContent !== "") {
                return;
            } else {
                this.textContent = turnPlayer.getMark();
                ownsBox();
                switchTurnPlayer();
                return console.log(oBoxes);
            }
        }
    
        Gameboard.board.forEach(
            x => x.addEventListener("click", putMark)
        )

        function checkWin() {
            [
                0, 1, 2, 
                3, 4, 5, 
                6, 7, 8
            ]

        }


    return {playerX, playerO, turnPlayer, putMark}
})()