const restart = document.querySelector("button");

let Gameboard = (() => {
    let board = Array.from(document.querySelectorAll(".box"));
    return {board}
})()

const Player = (mark, boxesOwned) => {
    function getMark() {
        return mark;
    }

    return {getMark, boxesOwned}
}

let playerX = Player("X", []);
let playerO = Player("O", []);


let gameplayController = (() => {
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
            if (Gameboard.board[i].textContent === "X") {
                if (!playerX.boxesOwned.includes(i)) {
                    playerX.boxesOwned.push(i);
                    Gameboard.board[i].classList.remove("box");
                    Gameboard.board[i].classList.add("box-filled");
                }
            } else if (Gameboard.board[i].textContent === "O"){
                if (!playerO.boxesOwned.includes(i)) {
                    playerO.boxesOwned.push(i);
                    Gameboard.board[i].classList.remove("box");
                    Gameboard.board[i].classList.add("box-filled");
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
            checkWinner();
            switchTurnPlayer();
        }
    }
    
    Gameboard.board.forEach(
        x => x.addEventListener("click", putMark)
    )

    let winningCombinations = [
        [0, 1, 2],
        [0, 4, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [3, 4, 5],
        [6, 7, 8]
    ]

    function removeHighlightsAndEvents() {
        Gameboard.board.forEach(
            x => {
                    x.classList.remove("box");
                    x.classList.add("box-filled");
                    x.removeEventListener("click", putMark);
                }
        )
    }

    function checkWinner() {
        winningCombinations.forEach(
            x => {
                if (playerX.boxesOwned.includes(x[0]) && playerX.boxesOwned.includes(x[1]) && playerX.boxesOwned.includes(x[2])) {
                    removeHighlightsAndEvents();
                    return alert("X wins!")
                } else if (playerO.boxesOwned.includes(x[0]) && playerO.boxesOwned.includes(x[1]) && playerO.boxesOwned.includes(x[2])) {
                    removeHighlightsAndEvents();
                    return alert("O wins!")
                }
            }
        )
    }

    function clear(e) {
        Gameboard.board.forEach(
            x => {
                x.textContent = "";
                x.classList.remove("box-filled");
                x.classList.add("box");
                x.addEventListener("click", putMark);
                playerX.boxesOwned = [];
                playerO.boxesOwned = [];
                turnPlayer = playerX;
            }
        )
    }

    restart.addEventListener("click", clear);

    return {playerX, playerO, turnPlayer, putMark, clear}
})()