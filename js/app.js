var canvas = document.createElement('canvas'),
context = canvas.getContext('2d');
var canvasWidth = window.innerWidth;
canvasHeight = window.innerHeight;
var mouseX, mouseY;
var touchListener;


function onPageLoaded(argument) {
    console.log("loadad");
    init();
}


function init() {

    // CANVAS SET UP
    document.body.appendChild(canvas);
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    drawCanvasBG();
    initTouch();

}

function drawCanvasBG(){
    context.strokeStyle = "rgba(255, 255, 255, 1)";
    context.fillStyle = "rgba(80,80,80,1)";
    context.lineWidth = 1;
    context.fillRect(0,0,canvasWidth,canvasHeight);
    drawMarkers();
}

function drawMarkers(){
    context.strokeStyle = 'white';
    context.beginPath();
    context.moveTo(0,0);
    context.lineTo(canvasWidth, canvasHeight);
    context.moveTo(0,canvasHeight);
    context.lineTo(canvasWidth,0);
    context.closePath();
    context.stroke();

}


