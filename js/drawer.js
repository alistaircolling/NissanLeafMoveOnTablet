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