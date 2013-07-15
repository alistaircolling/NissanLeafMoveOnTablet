mc.Pushbutton = function(parent, x, y, label, handler) {
    mc.initComp(this, parent, x, y);
    this._label = label;
    this.handler = handler;
    this.mouseIsOver = false;
    this.mouseIsDown = false;
    this.setSize(100, mc.style.fontSize + 8);
    $(this.canvas).css("cursor", "pointer");
    $(this.canvas).mouseover($.proxy(this.onMouseOver, this));
    $(this.canvas).mouseout($.proxy(this.onMouseOut, this));
    $(this.canvas).mousedown($.proxy(this.onMouseDown, this));
    $(this.canvas).mouseup($.proxy(this.onMouseUp, this));
}

mc.initCompClass(mc.Pushbutton);

mc.Pushbutton.prototype.onMouseOver = function(event) {
    this.mouseIsOver = true;
    this.draw();
}

mc.Pushbutton.prototype.onMouseOut = function(event) {
    this.mouseIsDown = false;
    this.mouseIsOver = false;
    this.draw();
}

mc.Pushbutton.prototype.onMouseDown = function(event) {
    this.mouseIsDown = true;
    this.draw();
}

mc.Pushbutton.prototype.onMouseUp = function(event) {
    if(this.mouseIsOver && this.mouseIsDown && this.handler != null) {
        this.handler(this);
    }
    this.mouseIsDown = false;
    this.draw();
}

mc.Pushbutton.prototype.draw = function() {
    this.drawBorder();
    this.drawFace();
    this.drawText();
};

mc.Pushbutton.prototype.drawBorder = function() {
    if(this.mouseIsDown) {
        this.drawRect(0, 0, this._width, this._height, mc.style.shadowColor);
    }
    else {
        this.drawRect(0, 0, this._width, this._height, mc.style.borderColor);
    }
};

mc.Pushbutton.prototype.drawFace = function() {
    if(this.mouseIsDown) {
        this.drawRect(1.5, 1.5, this._width - 1.5, this._height - 1.5, mc.style.buttonDownColor);
    }
    else if(this.mouseIsOver) {
        this.drawRect(1, 1, this._width - 2, this._height - 2, mc.style.buttonOverColor);
    }
    else {
        this.drawRect(1, 1, this._width - 2, this._height - 2, mc.style.buttonUpColor);
    }
};

mc.Pushbutton.prototype.drawText = function() {    
    var textWidth = this.measureText(this._label);
    this.drawLabel(this._label, (this._width - textWidth) / 2, (this._height - mc.style.fontSize) / 2);
};

mc.Pushbutton.prototype.setLabel = function(label) {
    this._label = label;
    this.draw();
    return this;
}

mc.Pushbutton.prototype.getLabel = function() {
    return this._label;
}