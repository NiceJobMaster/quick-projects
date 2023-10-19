let canvas,
  context,
  playerX,
  playerY,
  playerWidth,
  playerHeight,
  playerXSpeed,
  playerYSpeed,
  gravity,
  onGround,
  holdLeft,
  holdRight,
  platforms;

window.onload = () => {
  canvas = document.getElementById("game");
  context = canvas.getContext("2d");

  setInitialValues();

  document.addEventListener("keydown", keyDown);
  document.addEventListener("keyup", keyUp);

  const framePerSecond = 30;
  setInterval(update, 1000 / framePerSecond);

  for (let i = 0; i < 50; i++) {
    createPlatform();
  }
};

const setInitialValues = () => {
  playerX = playerY = 200;
  playerXSpeed = playerYSpeed = 0;
  playerWidth = 10;
  playerHeight = 20;
  gravity = 0.5;
  onGround = false;
  holdLeft = holdRight = false;
  platforms = [];
};

const update = () => {
  move();
  draw();
};

const createPlatform = () => {
  platforms.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    width: Math.random() * 100 + 30,
    height: Math.random() * 30 + 20,
  });
};

const move = () => {
  if (holdLeft) {
    playerXSpeed = -2;
  }
  if (holdRight) {
    playerXSpeed = 2;
  }

  playerX += playerXSpeed;
  playerY += playerYSpeed;

  if (onGround) {
    playerXSpeed *= 0.8;
  } else {
    playerYSpeed += gravity;
  }

  onGround = false;
  for (let i = 0; i < 50; i++) {
    if (
      playerX > platforms[i].x &&
      playerX < platforms[i].x + platforms[i].width &&
      playerY > platforms[i].y &&
      playerY < platforms[i].y + platforms[i].height
    ) {
      playerY = platforms[i].y;
      onGround = true;
    }
  }
};

const draw = () => {
  colorRect(0, 0, canvas.width, canvas.height, "black");

  colorRect(
    playerX - playerWidth / 2,
    playerY - playerHeight,
    playerWidth,
    playerHeight,
    "yellow"
  );

  for (let i = 0; i < 50; i++) {
    colorRect(
      platforms[i].x,
      platforms[i].y,
      platforms[i].width,
      platforms[i].height,
      "white"
    );
  }
};

const colorRect = (x, y, width, height, color) => {
  context.fillStyle = color;
  context.fillRect(x, y, width, height);
};

const keyDown = (e) => {
  switch (e.keyCode) {
    case 37:
      holdLeft = true;
      break;
    case 38:
      if (onGround) {
        playerYSpeed = -10;
      }
      break;
    case 39:
      holdRight = true;
      break;
  }
};

const keyUp = (e) => {
  switch (e.keyCode) {
    case 37:
      holdLeft = false;
      break;
    case 38:
      if (playerYSpeed < -3) {
        playerYSpeed = -3;
      }
      break;
    case 39:
      holdRight = false;
      break;
  }
};
