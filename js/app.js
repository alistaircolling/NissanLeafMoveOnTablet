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



function initTouch(){

    console.log("init touch");
    canvas.addEventListener("mousedown", this.mouseDown, false);
    canvas.addEventListener("touchstart", this.touchDown, false);
    canvas.addEventListener("touchmove", draw, false);
    canvas.addEventListener("touchmove", this.touchXY, true);
    canvas.addEventListener("touchend", this.touchUp, false);

    document.body.addEventListener("mouseup", this.mouseUp, false);
    document.body.addEventListener("touchcancel", this.touchUp, false);

}

function mouseMove(event){
  var coors = {
      x: event.targetTouches[0].pageX,
      y: event.targetTouches[0].pageY
   };

}
function mouseUp() {
          mouseIsDown = 0;          
          
}

function draw(event){


  console.log("draw......");
   // get the touch coordinates
   var coors = {
      x: event.targetTouches[0].pageX,
      y: event.targetTouches[0].pageY
   };
 
  //context.clearRect(0,0,canvasWidth, canvasHeight);
  drawCanvasBG();
  //draw a circle

  context.beginPath();
  context.arc(coors.x, coors.y, 20, 0, 2 * Math.PI, false);
  context.fillStyle = 'black';
  context.fill();
  context.lineWidth = 5;
  context.strokeStyle = '#000000';
  context.stroke();



  context.stroke();
   // pass the coordinates to the appropriate handler
//   drawer[event.type](coors);
}


function touchUp() {
            mouseIsDown = 0;
            // no touch to track, so just show state
          //  this.showPos();
}

function mouseDown() {
      console.log("md");
      mouseIsDown = 1;
          //  this.mouseXY();

}

function touchDown() {
            mouseIsDown = 1;
 //           this.touchXY();
}

