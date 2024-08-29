const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const tileCount = 20;
canvas.width = canvas.height = gridSize * tileCount;

let snake = [{ x: 10, y: 10 }];
let apple = { x: 5, y: 5 };
let velocity = { x: 0, y: 0 };
let score = 0;

function gameLoop() {
    update();
    draw();
    setTimeout(gameLoop, 100);
}

function update() {
    // Move the snake
    const head = { x: snake[0].x + velocity.x, y: snake[0].y + velocity.y };

    // Check for wall collisions
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        resetGame();
        return;
    }

    // Check for self collision
    for (let segment of snake) {
        if (segment.x === head.x && segment.y === head.y) {
            resetGame();
            return;
        }
    }

    snake.unshift(head);

    // Check if snake eats the apple
    if (head.x === apple.x && head.y === apple.y) {
        score++;
        apple = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount),
        };
    } else {
        snake.pop();
    }
}

function draw() {
    // Clear the canvas
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the snake
    ctx.fillStyle = "#0f0";
    for (let segment of snake) {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    }

    // Draw the apple
    ctx.fillStyle = "#f00";
    ctx.fillRect(apple.x * gridSize, apple.y * gridSize, gridSize, gridSize);

    // Draw the score
    ctx.fillStyle = "#fff";
    ctx.font = "18px Arial";
    ctx.fillText("Score: " + score, 10, 20);
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    velocity = { x: 0, y: 0 };
    score = 0;
    apple = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount),
    };
}

window.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
            if (velocity.y === 0) velocity = { x: 0, y: -1 };
            break;
        case "ArrowDown":
            if (velocity.y === 0) velocity = { x: 0, y: 1 };
            break;
        case "ArrowLeft":
            if (velocity.x === 0) velocity = { x: -1, y: 0 };
            break;
        case "ArrowRight":
            if (velocity.x === 0) velocity = { x: 1, y: 0 };
            break;
    }
});

// Start the game loop
gameLoop();
