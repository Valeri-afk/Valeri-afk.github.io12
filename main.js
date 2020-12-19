let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let direction = 39;

//Эскиз игрового поля, игрового счета и текста 'Конец игры'.
class Canvas {
    constructor(score) {
        this.score = score
    }
    drawCanvas() {
        ctx.lineWidth = 20;
        ctx.strokeRect(0,0,400,400)
    }
    drawScore() {
        ctx.font = '25px Arial'
        ctx.fillText('Счет:' + ' ' + this.score, 15,40)
    }
    drawEndGameText() {
        ctx.font = '50px Arial'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText('Конец игры',200,200)
    }
}

//Эскиз тела змеи.
class Blocks {
    constructor(col,row,color,blockSize) {
        this.col = col
        this.row = row
        this.color = color
        this.blockSize = blockSize
    }
    SnakeBlocks() {
            this.col = this.col
            ctx.fillStyle = this.color
            ctx.fillRect(this.col,this.row,this.blockSize,this.blockSize)
    }
}

//Класс, отвечающий за отрисовку змеи, ее передвижение и столкновение со стеной, собственным телом или с яблоком 
 class Snake {
    constructor() {
        this.arrOfHeads = [new Blocks(200,200,'blue',10),new Blocks(190,200,'blue',10),new Blocks(180,200,'blue',10)],
        this.newSnakeHead;
    }
    drawSnakeBlocks() {
        for(let i=0;i<this.arrOfHeads.length;i++) {
            this.arrOfHeads[i].SnakeBlocks()
        }
    }
    moveSnake() {
        let headOfSnake = this.arrOfHeads[0];
        if(direction === 39) {
        this.newSnakeHead = new Blocks(headOfSnake.col + headOfSnake.blockSize,headOfSnake.row, 'blue',headOfSnake.blockSize)
        }
        if(direction === 37) {
        this.newSnakeHead = new Blocks(headOfSnake.col - headOfSnake.blockSize,headOfSnake.row, 'blue',headOfSnake.blockSize)
        }
        if(direction === 38) {
        this.newSnakeHead = new Blocks(headOfSnake.col,headOfSnake.row - headOfSnake.blockSize, 'blue',headOfSnake.blockSize)
        }
        if(direction === 40) {
        this.newSnakeHead = new Blocks(headOfSnake.col,headOfSnake.row + headOfSnake.blockSize, 'blue',headOfSnake.blockSize)
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
    return this.newSnakeHead.col === apple.col && this.newSnakeHead.row === apple.row
    }
}

//Класс, отвечающий за прорисовку яблока и генерирование положения.
class Apple {
    constructor(col,row,radius,blockSize,color) {
        this.col = col;
        this.row = row;
        this.radius = radius;
        this.color = color;
        this.blockSize = blockSize
    }
    spawnOfApple() {
        this.col = Math.floor((Math.random()*4) + 1)*(this.blockSize**2) - 20
        this.row = Math.floor((Math.random()*4) + 1)*(this.blockSize**2) - 20
    }
    drawApple() {
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.arc(this.col,this.row,this.radius,0,2*Math.PI)
        ctx.fill()
    }
}


let playingArea = new Canvas(0)
let apple = new Apple(10,10,10 / 2, 10,'green')
let snake = new Snake()
apple.spawnOfApple()


let gameEnd = setInterval(function() {
    ctx.clearRect(0,0,400,400)
    playingArea.drawCanvas()
    playingArea.drawScore()
    apple.drawApple()
    snake.drawSnakeBlocks()
    snake.moveSnake()
    if(snake.collision()) {
        clearInterval(gameEnd)
        playingArea.drawEndGameText()
    }
    if(snake.eatingOfApple()) {
        playingArea.score++;
        apple.spawnOfApple()
        snake.arrOfHeads.push(snake.newSnakeHead)
    }
},100)



document.querySelector('body').addEventListener('keydown', function(event) {
    if(event.keyCode === 39) {
        direction === 37 ? direction = 37 : direction = event.keyCode
    }
    if(event.keyCode === 37) {
        direction === 39 ? direction = 39 : direction = event.keyCode;
    }
    if(event.keyCode === 38) {
        direction === 40 ? direction = 40 : direction = event.keyCode
    }
    if(event.keyCode === 40) {
        direction === 38 ? direction = 38 : direction = event.keyCode; 
    }
});
