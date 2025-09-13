
class Snake {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.ground = '#444';
        this.snakeColor = '#0ff';
        this.foodColor = '#f00';
        this.gridSize = 10;
        this.width = canvas.width / this.gridSize;
        this.height = canvas.height / this.gridSize;
        this.snake = [
            { x: this.width / 2, y: this.height / 2 },
            { x: this.width / 2 - 1, y: this.height / 2 },
            { x: this.width / 2 - 2, y: this.height / 2 }
        ];
        this.food = { x: 0, y: 0 };
        this.direction = 'right';
        this.game = null;
        this.randomFood();
        window.addEventListener('keydown', this.keyDown.bind(this));
    }

    drawGround() {
        this.ctx.fillStyle = this.ground;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawSnake() {
        this.snake.forEach(segment => {
            this.ctx.fillStyle = this.snakeColor;
            this.ctx.fillRect(segment.x * this.gridSize, segment.y * this.gridSize, this.gridSize, this.gridSize);
        });
    }

    drawFood() {
        this.ctx.fillStyle = this.foodColor;
        this.ctx.fillRect(this.food.x * this.gridSize, this.food.y * this.gridSize, this.gridSize, this.gridSize);
    }

    randomFood() {
        this.food = {
            x: Math.floor(Math.random() * this.width),
            y: Math.floor(Math.random() * this.height)
        };
    }

    updateSnake() {
        const head = { x: this.snake[0].x, y: this.snake[0].y };
        switch (this.direction) {
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
        if (head.x < 0 || head.x >= this.width || head.y < 0 || head.y >= this.height ||
            this.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            clearInterval(this.game);
        }
        this.snake.unshift(head);
        if (head.x === this.food.x && head.y === this.food.y) {
            this.randomFood();
        } else {
            this.snake.pop();
        }
    }

    keyDown(e) {
        switch (e.key) {
            case 'ArrowRight':
                if (this.direction !== 'left') this.direction = 'right';
                break;
            case 'ArrowDown':
                if (this.direction !== 'up') this.direction = 'down';
                break;
            case 'ArrowLeft':
                if (this.direction !== 'right') this.direction = 'left';
                break;
            case 'ArrowUp':
                if (this.direction !== 'down') this.direction = 'up';
                break;
        }
    }

    start() {
        this.game = setInterval(() => {
            this.updateSnake();
            this.drawGround();
            this.drawSnake();
            this.drawFood();
        }, 100);
    }
}

const canvas = document.getElementById('canvas');
const snakeGame = new Snake(canvas);
snakeGame.start();
