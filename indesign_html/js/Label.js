
mc.Label = function(parent, x, y, text) {
    mc.initComp(this, parent, x, y);
    this._text = text || "";
    this._align = "left";
    this.draw();
}

mc.initCompClass(mc.Label);

mc.Label.prototype.setText = function(text) {
    this._text = text;
    this.draw();
    return this;
}

mc.Label.prototype.getText = function() {
    return this._text;
}

mc.Label.prototype.draw = function() {
    this.canvas.width = this._width = this.measureText(this._text);
    this.canvas.height = this._height = mc.style.fontSize + 1;
    this.drawLabel(this._text, 0, 0);
    
    if(this._align == "right") {
        $(this.canvas).css("left", this._x - this.canvas.width);
    }
    else if(this._align == "center") {
        $(this.canvas).css("left", this._x - this.canvas.width / 2);
    } else {
        $(this.canvas).css("left", this._x);
    }
}

mc.Label.prototype.setAlign = function(align) {
    this._align = align;
    this.draw();
    return this;
}

mc.Label.prototype.getAlign = function() {
    return this._align;
}
