const canvasEl = document.getElementById("canvas");
canvasEl.width = canvasEl.parentElement.clientWidth;
canvasEl.height = canvasEl.parentElement.clientHeight;

const context = canvasEl.getContext("2d");

const lineWidthEl = document.getElementById("line-width");

let prevX = null;
let prevY = null;
let draw = false;
let color = "#000000";

lineWidthEl.innerHTML = 5;

canvasEl.addEventListener("mousedown", () => (draw = true));
canvasEl.addEventListener("mouseup", () => (draw = false));

canvasEl.addEventListener("mousemove", (e) => {
  if (prevX == null || prevY == null || !draw) {
    prevX = e.clientX;
    prevY = e.clientY;
    return;
  }

  let currentX = e.clientX;
  let currentY = e.clientY;

  context.beginPath();
  context.arc(currentX, currentY, lineWidthEl.innerHTML, 0, Math.PI * 2);
  context.fillStyle = color;
  context.fill();
  context.beginPath();
  context.moveTo(prevX, prevY);
  context.lineTo(currentX, currentY);
  context.strokeStyle = color;
  context.lineWidth = lineWidthEl.innerHTML * 2;
  context.stroke();

  prevX = currentX;
  prevY = currentY;
});

document.getElementById("plus").addEventListener("click", () => {
  if (lineWidthEl.innerHTML == 50) {
    return;
  } else {
    lineWidthEl.innerHTML = +lineWidthEl.innerHTML + 5;
  }
});

document.getElementById("minus").addEventListener("click", () => {
  if (lineWidthEl.innerHTML == 5) {
    return;
  } else {
    lineWidthEl.innerHTML = +lineWidthEl.innerHTML - 5;
  }
});

document
  .getElementById("color")
  .addEventListener("input", (e) => (color = e.target.value));

document
  .getElementById("clear")
  .addEventListener("click", () =>
    context.clearRect(0, 0, canvasEl.width, canvasEl.height)
  );

document.getElementById("save").addEventListener("click", () => {
  let data = canvasEl.toDataURL("imag/png");
  let a = document.createElement("a");
  a.href = data;
  a.download = "sketch.png";
  a.click();
});
