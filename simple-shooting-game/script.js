const gunSound = new Audio("shot.mp3");

const enemyGunSound = new Audio("shot.mp3");
enemyGunSound.volume = 0.6;

const music = new Audio("music.mp3");
music.loop = true;

const newGame = () => {
  music.play();
  randomEnemyAttacks();
  document.querySelector("button").style.display = "none";
};

const iShoot = (enemy) => {
  enemy.classList.add("dead");

  if (!livingEnemies().length) {
    alert("Game Over!");
    window.location.reload();
  }
};

const enemyShootsMe = (enemy) => {
  if (!enemy.classList.contains("dead")) {
    enemyGunSound.play();
    enemy.classList.add("shooting");
    updateHealthPoints(healthPoints - 20);
    setTimeout(() => {
      enemy.classList.remove("shooting");
    }, 200);
  }
};

const enemyAttacksMe = (enemy) => {
  enemy.classList.add("showing");

  setTimeout(() => {
    enemyShootsMe(enemy);
  }, 1000);

  setTimeout(() => {
    enemy.classList.remove("showing");
  }, 3000);
};

const livingEnemies = () => {
  return document.querySelectorAll(".enemy:not(.dead)");
};

const randomEnemyAttacks = () => {
  let randomEnemyNo = Math.random() * livingEnemies().length;
  randomEnemyNo = Math.floor(randomEnemyNo);

  const enemy = livingEnemies()[randomEnemyNo];

  const randomDelay = Math.random() * 2000 + 1000;

  setTimeout(() => {
    enemyAttacksMe(enemy);
    randomEnemyAttacks();
  }, randomDelay);
};

let healthPoints = 100;
const updateHealthPoints = (points) => {
  healthPoints = points;
  const healthBar = document.getElementById("healthBar");
  healthBar.style.width = points + "%";

  if (healthPoints < 1) {
    alert("Game Over!");
    window.location.reload();
  }
};
