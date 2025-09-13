const Direction = Object.freeze({
    RIGHT: 'right',
    DOWN: 'down',
    LEFT: 'left',
    UP: 'up'
});

const GRID_SIZE = 10;

class Snake {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.snakeColor = '#0ff';
        this.width = canvas.width / GRID_SIZE;
        this.height = canvas.height / GRID_SIZE;
        this.body = [
            { x: this.width / 2, y: this.height / 2 },
            { x: this.width / 2 - 1, y: this.height / 2 },
            { x: this.width / 2 - 2, y: this.height / 2 }
        ];
    }

    draw() {
        this.body.forEach(segment => {
            this.ctx.fillStyle = this.snakeColor;
            this.ctx.fillRect(segment.x * GRID_SIZE, segment.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
        });
    }

}

class Ground {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.groundColor = '#444';
    }

    draw() {
        this.ctx.fillStyle = this.groundColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

}

class Food {
    constructor(canvas) {
        this.position = { x: 0, y: 0 };
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width / GRID_SIZE;
        this.height = canvas.height / GRID_SIZE;
        this.foodColor = '#f00';
        this.create();
    }

    create() {
        this.position = {
            x: Math.floor(Math.random() * this.width),
            y: Math.floor(Math.random() * this.height)
        };
    }

    draw() {
        this.ctx.fillStyle = this.foodColor;
        this.ctx.fillRect(this.position.x * GRID_SIZE, this.position.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
    }

}   


class Game {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.snake = new Snake(this.canvas);
        this.ground = new Ground(this.canvas);
        this.food = new Food(this.canvas);
        this.direction = Direction.RIGHT;
        this.game = null;
        window.addEventListener('keydown', this.onKeyDown.bind(this));
    }

    update() {
        this.updateSnake();
    }

    draw() {
        this.ground.draw();
        this.snake.draw();
        this.food.draw();
    }

    start() {
        this.game = setInterval(() => {
            this.update();
            this.draw();
        }, 100);
    }

    onKeyDown(e) {
        switch (e.key) {
            case 'ArrowRight':
                if (this.direction !== Direction.LEFT) this.direction = Direction.RIGHT;
                break;
            case 'ArrowDown':
                if (this.direction !== Direction.UP) this.direction = Direction.DOWN;
                break;
            case 'ArrowLeft':
                if (this.direction !== Direction.RIGHT) this.direction = Direction.LEFT;
                break;
            case 'ArrowUp':
                if (this.direction !== Direction.DOWN) this.direction = Direction.UP;
                break;
        }
    }

    updateSnake() {
        const head = { x: this.snake.body[0].x, y: this.snake.body[0].y };
        switch (this.direction) {
            case Direction.RIGHT:
                head.x++;
                break;
            case Direction.DOWN:
                head.y++;
                break;
            case Direction.LEFT:
                head.x--;
                break;
            case Direction.UP:
                head.y--;
                break;
        }
        if (head.x < 0 || head.x >= this.width || head.y < 0 || head.y >= this.height ||
            this.snake.body.some(segment => segment.x === head.x && segment.y === head.y)) {
            clearInterval(this.game);
        }
        this.snake.body.unshift(head);
        if (head.x === this.food.position.x && head.y === this.food.position.y) {
            this.food.create();
        } else {
            this.snake.body.pop();
        }
    }


}

const game = new Game();
game.start();
