const clearButton = document.querySelector('.clear');
const stroke_weight = document.querySelector('.stroke-weight');
const color_picker = document.querySelector('.color-picker');

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const nav_height = document.getElementById("navi").clientHeight;
let isDrawing = false;

console.log(nav_height);

canvas.addEventListener('mousedown', start);

canvas.addEventListener('mousemove', draw);

canvas.addEventListener('mouseup', stop);


clearButton.addEventListener('click', clearCanvas);

function start (e) {
  isDrawing = true;
  draw(e);
}

function draw ({offsetX: x, offsetY: y}) {
  if (!isDrawing) return;
  ctx.lineWidth = stroke_weight.value;
  ctx.lineCap = "round";
  ctx.strokeStyle = color_picker.value;

  ctx.lineTo(x, y+16);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y+16);
}

function stop () {
  isDrawing = false;
  ctx.beginPath();
}

function clearCanvas () {
  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
}

window.addEventListener('resize', resizeCanvas);
function resizeCanvas () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
