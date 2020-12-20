let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let gameEnd;

class Restart {
    constructor(x,y,width,height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.isActive = false;
    }
    drawRestartBtn() {
    ctx.fillStyle = 'black'
    ctx.fillRect(this.x,this.y,this.width,this.height)
    ctx.font = '15px Arial'
    ctx.textAlign = 'left'
    ctx.fillStyle = 'white'
    ctx.fillText('RESTART',this.x + ctx.measureText('RESTART').width - this.width/2, this.y + this.height/2)
    }
}

class Canvas {
    constructor(width,height,lineWidth,score) {
        this.x;
        this.y;
        this.width = width;
        this.height = height;
        this.score = score;
        this.lineWidth = lineWidth;
    }
    drawCanvas() {
        this.x = 0;
        this.y = 0;
        ctx.lineWidth = this.lineWidth;
        ctx.strokeRect(this.x,this.y,this.width,this.height)
    }
    drawScore() {
        this.x = 15;
        this.y = 40;
        ctx.font = '25px Arial'
        ctx.textAlign = 'left'
        ctx.textBaseline = 'middle'
        ctx.fillText('Счет:' + ' ' + this.score, this.x,this.y)
    }
    drawEndGameText() {
        this.x = 200;
        this.y = 200;
        ctx.font = '50px Arial'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText('Конец игры',this.x,this.y)
    }
}

class Blocks {
    constructor(col,row,blockSize) {
        this.col = col 
        this.row = row 
        this.color = 'blue'
        this.blockSize = blockSize
    }
    SnakeBlocks() {
            this.col = this.col
            ctx.fillStyle = this.color
            ctx.fillRect(this.col,this.row,this.blockSize,this.blockSize)
    }
}

 class Snake {
    constructor(direction) {
        this.arrOfHeads = [new Blocks(200,200,10),new Blocks(190,200,10),new Blocks(180,200,10)],
        this.newSnakeHead;
        this.direction = direction
    }
    drawSnakeBlocks() {
        for(let i=0;i<this.arrOfHeads.length;i++) {
            this.arrOfHeads[i].SnakeBlocks()
        }
    }
    moveSnake() {
        let headOfSnake = this.arrOfHeads[0];
        switch(this.direction) {
            case 'right':
                this.newSnakeHead = new Blocks(headOfSnake.col + headOfSnake.blockSize,headOfSnake.row,headOfSnake.blockSize)
                break;
            case 'left':
                this.newSnakeHead = new Blocks(headOfSnake.col - headOfSnake.blockSize,headOfSnake.row,headOfSnake.blockSize)
                break;
            case 'top':
                this.newSnakeHead = new Blocks(headOfSnake.col,headOfSnake.row - headOfSnake.blockSize,headOfSnake.blockSize)
                break;
            case 'down':
                this.newSnakeHead = new Blocks(headOfSnake.col,headOfSnake.row + headOfSnake.blockSize,headOfSnake.blockSize)
                break;
                default:
        }
        this.arrOfHeads.unshift(this.newSnakeHead)
        this.arrOfHeads.pop()
    }
    collision() {
    if(this.newSnakeHead.col === 0 || this.newSnakeHead.col === 390 || this.newSnakeHead.row === 0 || this.newSnakeHead.row === 390) {
        return true
    } 
    for(let j=1;j<this.arrOfHeads.length;j++) {
        if(this.newSnakeHead.col === this.arrOfHeads[j].col && this.newSnakeHead.row === this.arrOfHeads[j].row) {
        return true
    } 
}
    }
    eatingOfApple() {
    return this.newSnakeHead.col === apple.col  && this.newSnakeHead.row === apple.row
    }
}

class Apple {
    constructor(gameBoardSize,radius,blockSize) {
        this.gameBoardSize = gameBoardSize;
        this.radius = radius;
        this.color = 'green';
        this.blockSize = blockSize
        this.row;
        this.col;
    }
    spawnOfApple() {
        let colRanNum;
        let rowRanNum;
         do {
            colRanNum = Math.random().toFixed(1);
            rowRanNum = Math.random().toFixed(1);
         }
          while(colRanNum < 0.1 || rowRanNum < 0.1)
        this.col = colRanNum*this.gameBoardSize - playingArea.lineWidth
        this.row = rowRanNum*this.gameBoardSize - playingArea.lineWidth
    }
    drawApple() {
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.arc(this.col + this.radius,this.row + this.radius,this.radius,0,2*Math.PI)
        ctx.fill()
    }
}

let playingArea = new Canvas(400,400,20,0)
let apple = new Apple(400,10/2, 10)
let snake = new Snake('right')
let restartBtn = new Restart(150,250,100,30);
apple.spawnOfApple()

function start() {
        gameEnd = setInterval(function() {
        ctx.clearRect(0,0,400,400)
        restartBtn.isActive = false
        playingArea.drawCanvas()
        playingArea.drawScore()
        apple.drawApple()
        snake.drawSnakeBlocks()
        snake.moveSnake()
        if(snake.collision()) {
            clearInterval(gameEnd)
            playingArea.drawEndGameText()
            restartBtn.isActive = true
            restartBtn.drawRestartBtn()
        }
        if(snake.eatingOfApple()) {
            playingArea.score++;
            apple.spawnOfApple()
            snake.arrOfHeads.push(snake.newSnakeHead)
        }
    },100)
}
start()


document.querySelector('body').addEventListener('keydown', function(event) {
    switch(event.keyCode) {
        case 39:
            snake.direction === 'left' ? snake.direction = 'left' : snake.direction = 'right'
            break;
        case 37:
            snake.direction === 'right' ? snake.direction = 'right' : snake.direction = 'left';
            break;
        case 38:
            snake.direction === 'down' ? snake.direction = 'down' : snake.direction = 'top'
            break;
        case 40:
            snake.direction === 'top' ? snake.direction = 'top' : snake.direction = 'down';
            break;
    }
});


canvas.addEventListener('click', function(event) {
    if(restartBtn.isActive === true) {
        if(checkCollision(event.offsetX,event.offsetY)) {
            clearInterval(gameEnd)
            playingArea.score = 0;
            apple.spawnOfApple();
            snake.arrOfHeads = [new Blocks(200,200,10),new Blocks(190,200,10),new Blocks(180,200,10)];
            snake.direction = 'right';
            start()
        }
    }
},false);

function checkCollision(x,y) {
    return x > restartBtn.x && x <= restartBtn.x + restartBtn.width &&
  y >= restartBtn.y && y <= restartBtn.y + restartBtn.height ;
}
