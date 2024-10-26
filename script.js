const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const canvasSize = 400;
const LEFT = 37;
const UP = 38;
const RIGHT = 39;
const DOWN = 40;

let snake, direction, food, gameOver;

function drawRect(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, gridSize, gridSize);
}

function drawSnake() {
  snake.forEach((segment) => drawRect(segment.x, segment.y, 'green'));
}

function drawFood() {
  drawRect(food.x, food.y, 'red');
}

function moveSnake() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    placeFood();
  } else {
    snake.pop();
  }

  if (
    head.x < 0 ||
    head.x >= canvasSize ||
    head.y < 0 ||
    head.y >= canvasSize ||
    snakeCollision(head)
  ) {
    gameOver = true;
  }
}

function snakeCollision(head) {
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      return true;
    }
  }
  return false;
}

function placeFood() {
  food = {
    x: Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize,
    y: Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize,
  };
}

function update() {
  if (gameOver) {
    alert('Game Over');
    document.location.reload();
    return;
  }

  ctx.clearRect(0, 0, canvasSize, canvasSize);
  moveSnake();
  drawSnake();
  drawFood();
}

function changeDirection(event) {
  const keyPressed = event.keyCode;

  if (keyPressed === LEFT && direction.x === 0) {
    direction = { x: -gridSize, y: 0 };
  } else if (keyPressed === UP && direction.y === 0) {
    direction = { x: 0, y: -gridSize };
  } else if (keyPressed === RIGHT && direction.x === 0) {
    direction = { x: gridSize, y: 0 };
  } else if (keyPressed === DOWN && direction.y === 0) {
    direction = { x: 0, y: gridSize };
  }
}

function init() {
  snake = [{ x: gridSize * 5, y: gridSize * 5 }];
  direction = { x: gridSize, y: 0 };
  food = { x: gridSize * 10, y: gridSize * 10 };
  gameOver = false;

  document.addEventListener('keydown', changeDirection);
  setInterval(update, 100);
}

init();
