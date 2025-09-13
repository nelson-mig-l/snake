const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const ground = '#444';
const snakeColor = '#0f0';
const foodColor = '#f00';

const gridSize = 10;
const width = canvas.width / gridSize;
const height = canvas.height / gridSize;

let snake = [
    { x: width / 2, y: height / 2 },
    { x: width / 2 - 1, y: height / 2 },
    { x: width / 2 - 2, y: height / 2 }
];
let food = { x: 0, y: 0 };
let direction = 'right';

function drawGround() {
    ctx.fillStyle = ground;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    snake.forEach(segment => {
        ctx.fillStyle = snakeColor;
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });
}

function drawFood() {
    ctx.fillStyle = foodColor;
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

function randomFood() {
    food = {
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height)
    };
}

function updateSnake() {
    const head = { x: snake[0].x, y: snake[0].y };
    switch (direction) {
        case 'right':
            head.x++;
            break;
        case 'down':
            head.y++;
            break;
        case 'left':
            head.x--;
            break;
        case 'up':
            head.y--;
            break;
    }
    if (head.x < 0 || head.x >= width || head.y < 0 || head.y >= height ||
        snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        clearInterval(game);
    }
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        randomFood();
    } else {
        snake.pop();
    }
}

function keyDown(e) {
    switch (e.key) {
        case 'ArrowRight':
            if (direction !== 'left') direction = 'right';
            break;
        case 'ArrowDown':
            if (direction !== 'up') direction = 'down';
            break;
        case 'ArrowLeft':
            if (direction !== 'right') direction = 'left';
            break;
        case 'ArrowUp':
            if (direction !== 'down') direction = 'up';
            break;
    }
}

let game = setInterval(() => {
    updateSnake();
    drawGround();
    drawSnake();
    drawFood();
}, 100);

window.addEventListener('keydown', keyDown);
