var drawer = {
   isDrawing: false,
   touchstart: function(coors){
      context.beginPath();
      context.moveTo(coors.x, coors.y);
      this.isDrawing = true;
   },
   touchmove: function(coors){
      if (this.isDrawing) {
         context.lineTo(coors.x, coors.y);
         context.stroke();
      }
   },
   touchend: function(coors){
      if (this.isDrawing) {
         this.touchmove(coors);
         this.isDrawing = false;
      }
   }
};


function initTouch(){
//    canvas = document.getElementById("canvasHolder");
 //   canvas = can.getContext("2d");
    console.log("init touch");
    canvas.addEventListener("mousedown", this.mouseDown, false);
  //  canvas.addEventListener("mousemove", mouseMove, false);
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
  console.log("mmmmm"+coors.x+":"+coors.y);

}
function mouseUp() {
          mouseIsDown = 0;
            //this.mouseXY();
          showPos();
}

function draw(event){
  console.log("draw");
   // get the touch coordinates
   var coors = {
      x: event.targetTouches[0].pageX,
      y: event.targetTouches[0].pageY
   };
   // pass the coordinates to the appropriate handler
   drawer[event.type](coors);
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


function showPos() {
        console.log("mouseisDown:"+mouseIsDown);;
            // large, centered, bright green text
         /*   context.font = "24pt Helvetica";
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillStyle = "rgb(64,255,64)";
            var str = canX + ", " + canY;
            if (mouseIsDown)
                str += " down";
            if (!mouseIsDown)
                str += " up";
            context.clearRect(0, 0, canvas.width, canvas.height);
            // draw text at center, max length to fit on canvas
            context.fillText(str, canvas.width / 2, canvas.height / 2, canvas.width - 10);
            // plot cursor
            context.fillStyle = "white";
            context.fillRect(canX -5, canY -5, 10, 10);*/
        }