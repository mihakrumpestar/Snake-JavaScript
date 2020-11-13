const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";

let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

document.addEventListener("keydown",direction);

function direction(event){
    let key = event.keyCode;
    if( key == 37 && d != "RIGHT"){
        d = "LEFT";
        left.play();
    }else if(key == 38 && d != "DOWN"){
        d = "UP";
        up.play();
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
        right.play();
    }else if(key == 40 && d != "UP"){
        d = "DOWN";
        down.play();
    }
}

function collision(head,array) {
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

function draw() {
    
    for( let i = 0; i < snake.length ; i++) {
        ctx.fillStyle = ( i == 0 )? "green" : "white";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(snakeX == food.x && snakeY == food.y) {
        eat.play();
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
    }else{
        snake.pop();
    }
    
    let newHead = {
        x : snakeX,
        y : snakeY
    }
    
    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
        clearInterval(game);
        dead.play();

        (async () => {
            ctx.fillStyle = "white";
            ctx.font = "22px Changa one";
            ctx.fillText("      Pritisni space za nadaljevanje ..." ,2*box,1.6*box);
            await waitingKeypress();
            document.location.reload();
        }) ()
    }

    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score,2*box,1.6*box);
}

let game = setInterval(draw,100);

function waitingKeypress() {
    return new Promise((resolve) => {
        document.addEventListener('keydown', onKeyHandler);
        function onKeyHandler(e) {
            if (e.keyCode === 32) {
                document.removeEventListener('keydown', onKeyHandler);
                resolve();
            }
        }
    });
}