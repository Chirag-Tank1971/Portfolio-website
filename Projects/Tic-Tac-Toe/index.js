let gameInfo = document.querySelector(".curernt-player");
let boxes = document.querySelectorAll(".box");
let newGame = document.querySelector(".btn");

let gameGrid;
let currentPlayer;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function gameInit(){
    gameGrid=["","","","","","","","",""];
    currentPlayer="X";
    gameInfo.innerText=`Curretnt Player - ${currentPlayer}`
    boxes.forEach((box ,index)=> {
        box.innerText=""
        boxes[index].style.pointerEvents="all"
        box.classList = `box box${index+1}`
    })
    newGame.classList.remove("active")
}
gameInit();

newGame.addEventListener("click" ,gameInit);

function swapTurn() {
    if(currentPlayer=="X"){
        currentPlayer="O"
    }
    else{
        currentPlayer="X"
    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    let answer="";

    winningPositions.forEach((position) => {
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
            && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {

                //check if winner is X
                if(gameGrid[position[0]] === "X") 
                    answer = "X";
                else {
                    answer = "O";
                }
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
            
        }
            
       


    });
    if(answer!==""){
        gameInfo.innerText=`Winner Is Player - ${answer}`
        newGame.classList.add("active")
        boxes.forEach((box)=>
         box.style.pointerEvents="none")  
    }

    let fillCount = 0;
    gameGrid.forEach((box)=>{
        if(box!=="")
            fillCount++;})

        if(fillCount==9 && answer===""){
            gameInfo.innerText="Game Tied!!"  
            newGame.classList.add("active") 
        }
}



function handleClick(index) {
    if(gameGrid[index] === "" ) {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        swapTurn();
        checkGameOver();
    }
}

boxes.forEach((box , index)  => {
    box.addEventListener("click" , ()=> {
        handleClick(index)
    })
});