const gameData = {
    chip1: 0,
    chip2: 0,
    chip3: 0,
    currentChipId: 0,
    countMove: 0,
};

let game = document.getElementById('game');

function eventHandler(event) {
    //перехват нажатия на поле
    if (event.target.id === 'game') {
        return;
    }
    let classTargetCell = event.target.className.split(' ');
    if (gameData.currentChipId === 0 && classTargetCell.length !== 1) {
        checkMove(event.target.id);
    } else {
        move(event.target);
    }
}

function move(currentCell) {
    let classCurrentCell = currentCell.className.split(' ');
    if (classCurrentCell.length == 2 && classCurrentCell[1] == 'access') {
        let movingChip = document.getElementById(gameData.currentChipId);
        let classMovingChip = movingChip.className.split(' ');
        currentCell.className = `cell ${classMovingChip[1]}`;
        movingChip.className = 'cell';
        cleaningPreviousAccessMove();
        gameData.currentChipId = 0;
        updateCountMove();
        checkingTheCompletionOfTheGame();
    } else {
        cleaningPreviousAccessMove();
        checkMove(currentCell.id);
    }
}

function updateCountMove() {
    gameData.countMove++;
    document.getElementById('count-move').innerHTML = String(gameData.countMove);
}

function checkingTheCompletionOfTheGame() {
    let chip1 = 0;
    let chip2 = 0;
    let chip3 = 0;
    for (let item of game.childNodes) {
        let column = item.id % 10;
        let classItem = item.className.split(' ')
        if (column === 1 && classItem.length === 2 && classItem[1] === 'chip1') {
            chip1++;
        } else if (column === 3 && classItem.length === 2 && classItem[1] === 'chip2') {
            chip2++;
        } else if (column === 5 && classItem.length === 2 && classItem[1] === 'chip3') {
            chip3++;
        }
    }
    if (chip1 === 5 && chip2 === 5 && chip3 === 5) {
        document.getElementById('win').innerHTML = `Поздравляем! Вы завершили игру за ${gameData.countMove} ${getWordMove(gameData.countMove)}) Попробуйте завершить за меньшее число ходов!`;
        document.getElementById('win').style.backdropFilter = "blur(20px)";
    }
}

function getWordMove(countMove) {
    let word = 'ход'
    let reminderOfTen = countMove % 10;
    let reminderOfHundred = countMove % 100;
    if (reminderOfTen == 0 || (reminderOfTen > 4 && reminderOfTen < 10) || (reminderOfHundred > 10 && reminderOfHundred < 15)) {
        word += 'ов';
    } else if (reminderOfTen > 1 && reminderOfTen < 5) {
        word += 'а';
    }
    return word;
}

function cleaningPreviousAccessMove() {
    let row = Math.floor(gameData.currentChipId / 10);
    let column = gameData.currentChipId % 10;
    //up
    if (row !== 1 && column % 2 != 0) {
        let upCell = document.getElementById(`${row - 1}${column}`);
        let classUpCell = upCell.className.split(" ");
        if (classUpCell[classUpCell.length - 1] === 'access') {
            classUpCell.pop();
            upCell.className = classUpCell.join(' ');
        }
    }
    if (column !== 5 && row % 2 != 1) {
        let rightCell = document.getElementById(`${row}${column + 1}`)
        let classRightCell = rightCell.className.split(" ");
        if (classRightCell[classRightCell.length - 1] === 'access') {
            classRightCell.pop();
            rightCell.className = classRightCell.join(' ');
        }
    }
    if (row !== 5 && column % 2 != 0) {
        let downCell = document.getElementById(`${row + 1}${column}`)
        let classDownCell = downCell.className.split(" ");
        if (classDownCell[classDownCell.length - 1] === 'access') {
            classDownCell.pop();
            downCell.className = classDownCell.join(' ');
        }
    }
    if (column !== 1 && row % 2 != 1) {
        let leftCell = document.getElementById(`${row}${column - 1}`)
        let classLeftCell = leftCell.className.split(" ");
        if (classLeftCell[classLeftCell.length - 1] == 'access') {
            classLeftCell.pop();
            leftCell.className = classLeftCell.join(' ')
        }
    }
    currentCell = document.getElementById(`${row}${column}`);
    classCurrentCell = currentCell.className.split(' ')
    if (classCurrentCell[classCurrentCell.length - 1] === 'access') {
        classCurrentCell.pop();
        currentCell.className = classCurrentCell.join(' ');
    }
    gameData.currentChipId = 0;
}

function checkMove(currentId) {
    let accessMove = 0;
    let row = Math.floor(currentId / 10);
    let column = currentId % 10;
    //up
    if (row !== 1 && column % 2 != 0) {
        let upCell = document.getElementById(`${row - 1}${column}`)
        let classUpCell = upCell.className.split(" ");
        if (classUpCell.length == 1) {
            upCell.className += ' access';
            accessMove++;
        }
    }
    //right
    if (column !== 5 && row % 2 != 1) {
        let rightCell = document.getElementById(`${row}${column + 1}`)
        let classRightCell = rightCell.className.split(" ");
        if (classRightCell.length == 1) {
            rightCell.className += ' access';
            accessMove++;
        }
    }
    //down
    if (row !== 5 && column % 2 != 0) {
        let downCell = document.getElementById(`${row + 1}${column}`)
        let classDownCell = downCell.className.split(" ");
        if (classDownCell.length == 1) {
            downCell.className += ' access';
            accessMove++;
        }
    }
    //left
    if (column !== 1 && row % 2 != 1) {
        let leftCell = document.getElementById(`${row}${column - 1}`)
        let classLeftCell = leftCell.className.split(" ");
        if (classLeftCell.length == 1) {
            leftCell.className += ' access';
            accessMove++;
        }
    }

    if (accessMove != 0) {
        document.getElementById(currentId).className += ' access';
        gameData.currentChipId = currentId;
    }
}

function creatingGameField() {
    let row = 10;
    let column = 1;
    for (let i = 1; i <= 25; i++) {
        let cell = document.createElement('div');
        // cell.className = 'cell';
        if (column === 6) {
            row += 10;
            column = 1;
        }
        cell.id = row + column; 
        column++;
        game.appendChild(cell);
    }
    document.getElementById('count-move').innerHTML = gameData.countMove;
}

function restartGame() {
    cleaningGameData();
    deletingGameField();
    creatingGameField();
    changeButtonFromRestartToStart();
    document.getElementById('win').innerHTML = "";
    document.getElementById('win').style.backdropFilter = "blur(0px)";
}

function cleaningGameData() {
    let keysOfGameData = Object.keys(gameData)
    for (let key of keysOfGameData) {
        gameData[key] = 0;
    }   
}
function deletingGameField() {
    while (game.firstChild) {
        game.lastChild.remove();
    }
}
function changeButtonFromRestartToStart() {
    let buttonRestart = document.getElementById('restart')
    buttonRestart.value = 'Запустить игру';
    buttonRestart.setAttribute('onclick', 'startGame()');
    buttonRestart.id = 'start';
}

function startGame() {
    game.addEventListener('mousedown', eventHandler);
    fillingGameField();
    changeButtonFromStartToRestart();
}

function fillingGameField() {
    let cells = game.childNodes;
    let number = 0;
    
    for (let cell of cells) {
        if (Number(cell.id) % 2 == 1) {
            do {
                number = getNumber();
            } while (checkChips(number) !== true)
            cell.className += ` chip${number}`;
        } else {
            if (Math.floor(Number(cell.id) / 10) % 2 == 1) {
                cell.className += ' block';
            }
        }
    }
}
function changeButtonFromStartToRestart() {
    let buttonStart = document.getElementById('start')
    buttonStart.value = 'Перезапустить игру';
    buttonStart.setAttribute('onclick', 'restartGame()');
    buttonStart.id = 'restart';
}

function checkChips(number) {
    if (number === 1 && gameData.chip1 < 5) {
        gameData.chip1++;
        return true;
    } else if (number === 2 && gameData.chip2 < 5) {
        gameData.chip2++;
        return true;
    } else if (number === 3 && gameData.chip3 < 5) {
        gameData.chip3++;
        return true;
    } else {
        return false;
    }
}

function getNumber() {
    return Math.floor(Math.random() * 3) + 1;
}

creatingGameField();