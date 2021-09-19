const game = {
    countRed: 0,
    countYellow: 0,
    countGreen: 0,
    target: 0,
    accessMove: {
        up: 0,
        right: 0,
        down: 0,
        left : 0
    },
    result: {
        green: 0,
        yellow: 0,
        red: 0,
    },
    countMove: 0,
}

function restartGame() {
    location.reload();
}

function startGame() {
    for (let i = 1; i < 6; i++) {
        for (let j = 1; j < 6; j += 2) {
            let currentBlock = document.getElementById(String(i) + String(j));
            let currentNumber = getNumber();
            while(checkFilled(currentNumber, game) === false) {
                currentNumber = getNumber();
            }
            currentBlock.style.backgroundColor = getColor(currentNumber);
            currentBlock.addEventListener('mousedown', target);
        }
    }
    checkGame();
}

function checkGame() { 
    game.result.green = 0;
    game.result.yellow = 0;
    game.result.red = 0; 
    for (let i = 1; i < 6; i++) {
        if (document.getElementById(String(i) + String(1)).style.backgroundColor === 'green') {
            game.result.green++;
        }
        if (document.getElementById(String(i) + String(3)).style.backgroundColor === 'yellow') {
            game.result.yellow++;
        }
        if (document.getElementById(String(i) + String(5)).style.backgroundColor === 'red') {
            game.result.red++;
        }
    }
    document.getElementById('result-green').style.backgroundColor = (game.result.green === 5) ? 'green' : 'red';
    document.getElementById('result-yellow').style.backgroundColor = (game.result.yellow === 5) ? 'green' : 'red';
    document.getElementById('result-red').style.backgroundColor = (game.result.red === 5) ? 'green' : 'red';
    if (game.result.green + game.result.yellow + game.result.red === 15) {
        document.getElementById('result-text').textContent = "Вы выйграли! Количество ходов: " + game.countMove;
    }
}

function target() {
    if (game.target !== 0) {
        previousTarget = document.getElementById(game.target);
        previousTarget.style.border = '1px solid black';
        game.target = 0;
        cleaningAccessMove();
    }
    this.style.border = '3px solid blue';
    game.target = this.id;

    //check up
    let upBlockId = Number(this.id) - 10;
    if (upBlockId / 10 >= 1) {
        let upBlock = document.getElementById(upBlockId);
        if (upBlock.className === 'empty') {
            upBlock.style.border = '3px solid blue';
            upBlock.addEventListener('mousedown', move);
            game.accessMove.up = upBlockId;
        }
    }

    // check right
    let rightBlockId = Number(this.id) + 1;
    if (rightBlockId % 10 < 6) {
        let rightBlock = document.getElementById(rightBlockId);
        if (rightBlock.className === 'empty') {
            rightBlock.style.border = '3px solid blue';
            rightBlock.addEventListener('mousedown', move);
            game.accessMove.right = rightBlockId;        
        }
    }
    
    //check down
    let downBlockId = Number(this.id) + 10;
    if (Math.floor(downBlockId / 10) <= 5) {
        let downBlock = document.getElementById(downBlockId);
        if (downBlock.className === 'empty') {
            downBlock.style.border = '3px solid blue';
            downBlock.addEventListener('mousedown', move);
            game.accessMove.down = downBlockId;        
        }
    }
    
    // check left
    let leftBlockId = Number(this.id) - 1;
    if (leftBlockId % 10 > 0) {
        let leftBlock = document.getElementById(leftBlockId);
        if (leftBlock.className === 'empty') {
            leftBlock.style.border = '3px solid blue';
            leftBlock.addEventListener('mousedown', move);          
            game.accessMove.left = leftBlockId;        
        }
    }
}

// Зачистка выделенных ячеек, когда доступно несколько ячеек для хода
function cleaningAccessMove()
{
    console.log(game.accessMove);
    for (key in game.accessMove) {
        value = game.accessMove[key];
        if (value) {
            document.getElementById(value).style.border = '1px solid black';
            document.getElementById(value).removeEventListener('mousedown', move);
            game.accessMove[key] = 0;
        }
    }
    console.log(game.accessMove);
}

function move() {
    let targetBlock = document.getElementById(game.target);
    game.target = 0;
    
    this.style.backgroundColor = targetBlock.style.backgroundColor;
    this.className = targetBlock.style.className;
    this.style.border = '1px solid black';
    
    targetBlock.style.backgroundColor = 'white';
    targetBlock.className = 'empty';
    targetBlock.style.border = '1px solid black';
    
    this.removeEventListener('mousedown', move);
    this.addEventListener('mousedown', target);
    targetBlock.removeEventListener('mousedown', target);
    cleaningAccessMove();

    game.countMove++;
    document.getElementById('count-move').textContent = game.countMove;
    checkGame();
}

function checkFilled(cN, game) {
    if (cN === 0 && game.countRed < 5) {
        game.countRed++;
        return true;
    } else if (cN === 1 && game.countYellow < 5) {
        game.countYellow++;
        return true;
    } else if (cN === 2 && game.countGreen < 5) {
        game.countGreen++;
        return true;
    } else {
        return false;
    }
}

function getColor(number) {
    switch(number) {
        case 0:
            return 'green';
        case 1:
            return 'yellow';
        case 2:
            return 'red';
        default:
            return 'error';
    }
}

function getNumber() {
    return Math.floor(Math.random() * 3);
}
