mc.CheckBox = function(parent, x, y, label, selected, handler) {
    mc.initComp(this, parent, x, y);
    this._label = label;
    this.handler = handler;
    this._selected = selected;
    this.mouseIsOver = false;
    this.mouseIsDown = false;
    this.draw();
    $(this.canvas).css("cursor", "pointer");
    $(this.canvas).mouseover($.proxy(this.onMouseOver, this));
    $(this.canvas).mouseout($.proxy(this.onMouseOut, this));
    $(this.canvas).mousedown($.proxy(this.onMouseDown, this));
    $(this.canvas).mouseup($.proxy(this.onMouseUp, this));
}

mc.initCompClass(mc.CheckBox);

mc.CheckBox.prototype.onMouseOver = function(event) {
    this.mouseIsOver = true;
}

mc.CheckBox.prototype.onMouseOut = function(event) {
    this.mouseIsOver = false;
    this.mouseIsDown = false;
}

mc.CheckBox.prototype.onMouseDown = function(event) {
    this.mouseIsDown = true;
}

mc.CheckBox.prototype.onMouseUp = function(event) {
    if(this.mouseIsOver && this.mouseIsDown) {
        this._selected = !this._selected;
        if(this.handler != undefined) {
            this.handler(this);
        }
    }
    this.mouseIsDown = false;
    this.drawCheck();
}

mc.CheckBox.prototype.draw = function() {
    this.canvas.width = this._width = this.measureText(this._label) + mc.style.fontSize + 3;
    this.canvas.height = this._height = mc.style.fontSize + 1;
    this.drawCheck();
    this.drawLabel(this._label, mc.style.fontSize + 3, 0);
}

mc.CheckBox.prototype.drawCheck = function() {
    this.drawRect(0, 0, mc.style.fontSize, mc.style.fontSize, mc.style.shadowColor);
    this.drawRect(1.5, 1.5, mc.style.fontSize - 1.5, mc.style.fontSize - 1.5, mc.style.buttonUpColor);
    
    if(this._selected) {
        this.drawRect(2, 2, mc.style.fontSize - 4, mc.style.fontSize - 4, mc.style.highlightColor);
        this.drawRect(3, 3, mc.style.fontSize - 5, mc.style.fontSize - 5, mc.style.shadowColor);
        this.drawRect(3, 3, mc.style.fontSize - 6, mc.style.fontSize - 6, mc.style.buttonDownColor);
    }
}

mc.CheckBox.prototype.setLabel = function(label) {
    this._label = label;
    this.draw();
    return this;
}

mc.CheckBox.prototype.getLabel = function() {
    return this._label;
}

mc.CheckBox.prototype.setSelected = function(sel) {
    this._selected = sel;
    this.drawCheck();
    return this;
}

mc.CheckBox.prototype.getSelected = function() {
    return this._selected;
}

