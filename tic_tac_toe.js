let turns_boxes = document.querySelectorAll(".box");
let btnre = document.querySelector(".reset");
btnre.classList.remove("hide");
let newbtn = document.querySelector("#newgame");
let msg = document.querySelector(".msg");
let win = document.querySelector("#winner");
let tie = document.querySelector("#tie");
alert("This game will be between two real-life people and not a automatic game");
let player1 = prompt("Player1 what do you want to pick between X and O");
let player2 = prompt("Player2 what do you want to pick between X and O");
if (player2 === player1 || (player1 != "X" && player1 != "O") || (player2 != "X" && player2 != "O")) {
    alert("You have to choose different from the other player. Please refresh and enter the valid symbols");
}
else {
    let turn1;
    if (player1 === 'X') {
        turn1 = true;
    }
    else {
        turn1 = false;
    }
    //possible combinations in case of a victory
    const win_pat = [[0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]];

    //to enter the X or O in the boxes
    turns_boxes.forEach((box) => {
        box.addEventListener("click", () => {
            console.log("you clicked right.");
            if (turn1) {
                box.innerText = "X";
                turn1 = false;
            }
            else {
                box.innerText = "O";
                turn1 = true;
            }
            box.disabled = true;
            checkWinner();
        });
    });

    //function to reset the whole game
    const reset = () => {
        if (player1 === 'X') {
            turn1 = true;

        }
        else {
            turn1 = false;
        }
        enabledboxes();
        msg.classList.add("hide");
        btnre.classList.remove("hide");
    }

    //function to disable other boxes
    const disabledboxes = () => {
        for (let box of turns_boxes) {
            box.disabled = true;
        }
    };

    //to enable boxes
    const enabledboxes = () => {
        for (let box of turns_boxes) {
            box.disabled = false;
            box.innerText = "";
        }
    };

    //function to show the winner on the page
    const showWinner = (winner) => {
        if(winner==="TIE"){
            win.innerText=`The Game is a TIE`;
            msg.classList.remove("hide");
        btnre.classList.add("hide");
        disabledboxes();
        }
        else{
        win.innerText = `Congratulations, Winner is ${winner}`;
        msg.classList.remove("hide");
        btnre.classList.add("hide");
        disabledboxes();
        }
    };

    //function to check the winner
    const checkWinner = () => {
        let w = 0;
        for (let pat of win_pat) {
            let pos1 = turns_boxes[pat[0]].innerText;
            let pos2 = turns_boxes[pat[1]].innerText;
            let pos3 = turns_boxes[pat[2]].innerText;
            if (pos1 != "" && pos2 != "" && pos3 != "") {
                if (pos1 === pos2 && pos2 === pos3) {
                    let winner;
                    if (pos1 === player1) {
                        console.log("Player 1 wins");
                        winner = "Player 1";
                        w = 1;
                        showWinner(winner);
                    }
                    else if(pos1 ===  player2){
                        w = 1;
                        console.log("Player 2 wins");
                        winner = "Player 2";
                        showWinner(winner);
                    }
                    else{
                        
                    }
                }
            }
        }
        if (w == 0) {
            let f = 0;
            for (let box of turns_boxes) {
                if (!box.disabled) {
                    f = 1;
                }
            }
            if (f == 0) {
                winner="TIE";
                console.log("Tie");
                showWinner(winner);
            }
        }
    };

    //to reset the whole game
    newbtn.addEventListener("click", reset);
    btnre.addEventListener("click", reset);
    if (win.innerText = "") {
        tie.classList.remove("hide");
    }
}