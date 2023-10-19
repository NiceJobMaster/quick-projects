const character = document.getElementById("character");
const block = document.getElementById("block");
const scoreElement = document.getElementById("score");
let score = 0;
scoreElement.innerHTML = score;

const jump = () => {
  if (!block.classList.contains("animateBlock")) {
    block.classList.add("animateBlock");
  }

  if (!character.classList.contains("animateJump")) {
    character.classList.add("animateJump");
    setTimeout(() => {
      character.classList.remove("animateJump");
    }, 500);
  }
};

const checkDead = setInterval(() => {
  const characterTop = parseInt(
    window.getComputedStyle(character).getPropertyValue("top")
  );
  const blockLeft = parseInt(
    window.getComputedStyle(block).getPropertyValue("left")
  );

  if (blockLeft < 20 && blockLeft > 0 && characterTop >= 130) {
    block.classList.remove("animateBlock");
    block.style.left = "480px";
    alert("You lose!");
    score = 0;
  }
}, 10);

const checkScore = setInterval(() => {
  const characterTop = parseInt(
    window.getComputedStyle(character)?.getPropertyValue("top")
  );
  const blockLeft = parseInt(
    window.getComputedStyle(block).getPropertyValue("left")
  );
  if (blockLeft < 20 && blockLeft > 0 && characterTop <= 130) {
    score++;
  }

  scoreElement.innerHTML = score;
}, 40);
