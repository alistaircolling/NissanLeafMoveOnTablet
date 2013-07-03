var mc = {};
mc.style = {
    fontSize : 10,
    fontName : "sans-serif",
    shadowColor : "#888888",
    borderColor : "#999999",
    buttonDownColor : "#bbbbbb",
    buttonOverColor : "#cccccc",
    buttonUpColor : "#ffffff",
    highlightColor : "#eeeeee",
    labelColor : "#ff00ff",
    inputTextBGColor : "#eeeeee"
}


mc.drawRect = function(context, x, y, w, h, color) {
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
}

mc.initComp = function(comp, parent, x, y) {
    comp.canvas = $("<canvas width='100' height='100'/>").get(0);
    comp.context = comp.canvas.getContext("2d");
    $(comp.canvas).css("position", "absolute");
    $(parent).append(comp.canvas);
    comp.move(x, y);
}

mc.initCompClass = function(compClass) {

    compClass.prototype.drawLabel = function(text, x, y) {
        this.context.font = mc.style.fontSize + "px " + mc.style.fontName;
        this.context.textBaseline = "top";
        this.context.fillStyle = mc.style.labelColor;
        this.context.fillText(text, x, y);
    };

    compClass.prototype.measureText = function(text) {
        this.context.font = mc.style.fontSize + "px " + mc.style.fontName;
        return this.context.measureText(text).width;
    };

    compClass.prototype.move = function(x, y) {
        this._x = x;
        this._y = y;
        $(this.canvas)
            .css("top", this._y)
            .css("left", this._x);
        return this;
    };

    compClass.prototype.setSize = function(w, h) {
        this.canvas.width = this._width = w;
        this.canvas.height = this._height = h;
        this.draw();
        return this;
    };

    compClass.prototype.getWidth = function() {
        return this._width;
    };

    compClass.prototype.setWidth = function(w) {
        this.canvas.width = this._width = w;
        this.draw();
        return this;
    };

    compClass.prototype.getHeight = function() {
        return this._height;
    };

    compClass.prototype.setHeight = function(h) {
        this.canvas.height = this._height = h;
        this.draw();
        return this;
    };

    compClass.prototype.getX = function() {
        return this._x;
    };

    compClass.prototype.setX = function(x) {
        this._x = x;
        $(this.canvas)
            .css("left", this._x);
        return this;
    };

    compClass.prototype.getY = function() {
        return this._y;
    };

    compClass.prototype.setY = function(y) {
        $(this.canvas)
            .css("top", this._y)
        return this;
    };

    compClass.prototype.drawRect = function(x, y, w, h, color) {
        this.context.fillStyle = color;
        this.context.fillRect(x, y, w, h);
    };

    compClass.prototype.drawCircle = function(x, y, r, color) {
        this.context.fillStyle = color;
        this.context.beginPath();
        this.context.arc(x, y, r, 0, Math.PI * 2, false);
        this.context.fill();
    };

    compClass.prototype.getPagePosition = function() {
        var x = 0, y = 0, element = this.canvas;
        do {
            x += element.offsetLeft;
            y += element.offsetTop;
            element = element.offsetParent;
        } while(element != undefined);
        return {x:x, y:y};
    };

};

