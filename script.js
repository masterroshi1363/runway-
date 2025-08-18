// Simple Runway game
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 600;

let player = { x: 180, y: 500, w: 40, h: 40 };
let obstacles = [];
let speed = 3;

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && player.x > 0) player.x -= 30;
  if (e.key === "ArrowRight" && player.x < canvas.width - player.w) player.x += 30;
});

function drawPlayer() {
  ctx.fillStyle = "lime";
  ctx.fillRect(player.x, player.y, player.w, player.h);
}

function drawObstacles() {
  ctx.fillStyle = "red";
  obstacles.forEach((o) => {
    ctx.fillRect(o.x, o.y, o.w, o.h);
  });
}

function updateObstacles() {
  if (Math.random() < 0.02) {
    obstacles.push({ x: Math.random() * 360, y: -20, w: 40, h: 40 });
  }
  obstacles.forEach((o) => (o.y += speed));
  obstacles = obstacles.filter((o) => o.y < canvas.height);
}

function detectCollision() {
  for (let o of obstacles) {
    if (
      player.x < o.x + o.w &&
      player.x + player.w > o.x &&
      player.y < o.y + o.h &&
      player.y + player.h > o.y
    ) {
      alert("Game Over!");
      obstacles = [];
      speed = 3;
    }
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawObstacles();
  updateObstacles();
  detectCollision();
  requestAnimationFrame(gameLoop);
}

gameLoop();
