const clearButton = document.querySelector('.clear');
const stroke_weight = document.querySelector('.stroke-weight');
const color_picker = document.querySelector('.color-picker');
const save_btn = document.querySelector('.save');

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;

canvas.addEventListener('mousedown', start);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stop);

clearButton.addEventListener('click', clearCanvas);
save_btn.addEventListener('click', download);

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
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function download(){
  if(window.navigator.msSaveBlob){
    window.navigator.msSaveBlob(canvas.msToBlob(), 'SketchUp-img.png');
  } else{
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.href = canvas.toDataURL();
    a.download = 'SketchUp-img.png';
    a.click();
    document.body.removeChild(a);
  }
}

window.addEventListener('resize', resizeCanvas);
function resizeCanvas () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
