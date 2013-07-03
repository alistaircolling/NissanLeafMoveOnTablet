mc.RadioButton = function(parent, x, y, label, selected, handler) {
    mc.initComp(this, parent, x, y);
    this._label = label;
    this.handler = handler;
    this._selected = selected;
    if(this._selected) {
        mc.RadioButton.selectedButton = this;
    }
    mc.RadioButton.group.push(this);
    this.mouseIsOver = false;
    this.mouseIsDown = false;
    this.draw();
    $(this.canvas).css("cursor", "pointer");
    $(this.canvas).mouseover($.proxy(this.onMouseOver, this));
    $(this.canvas).mouseout($.proxy(this.onMouseOut, this));
    $(this.canvas).mousedown($.proxy(this.onMouseDown, this));
    $(this.canvas).mouseup($.proxy(this.onMouseUp, this));
}

mc.initCompClass(mc.RadioButton);
mc.RadioButton.group = [];

mc.RadioButton.clearAll = function() {
    for(var i = 0; i < mc.RadioButton.group.length; i += 1) {
        var rb = mc.RadioButton.group[i];
        rb.setSelected(false);
    }
}


mc.RadioButton.prototype.onMouseOver = function(event) {
    this.mouseIsOver = true;
}

mc.RadioButton.prototype.onMouseOut = function(event) {
    this.mouseIsOver = false;
    this.mouseIsDown = false;
}

mc.RadioButton.prototype.onMouseDown = function(event) {
    this.mouseIsDown = true;
}

mc.RadioButton.prototype.onMouseUp = function(event) {
    if(this.mouseIsOver && this.mouseIsDown) {
        mc.RadioButton.clearAll();
        mc.RadioButton.selectedButton = this;
        this._selected = true;
        this.drawRadio();
        if(this.handler != undefined) {
            this.handler(this);
        }
    }
    this.mouseIsDown = false;
}

mc.RadioButton.prototype.draw = function() {
    this.canvas.width = this._width = this.measureText(this._label) + mc.style.fontSize + 3;
    this.canvas.height = this._height = mc.style.fontSize + 1;
    this.drawRadio();
    this.drawLabel(this._label, mc.style.fontSize + 3, 0);
}

mc.RadioButton.prototype.drawRadio = function() {
    var radius = mc.style.fontSize / 2
    this.drawCircle(radius, radius, radius, mc.style.borderColor);
    this.drawCircle(radius, radius, radius - 1, mc.style.buttonUpColor);
    
    if(this._selected) {
        this.drawCircle(radius, radius, radius - 3, mc.style.shadowColor);
    }
}

mc.RadioButton.prototype.setSelected = function(sel) {
    this._selected = sel;
    if(this._selected) {
        mc.RadioButton.selectedButton = this;
    }
   this.drawRadio();
   return this;
}

mc.RadioButton.prototype.getSelected = function() {
    return this._selected;
}

mc.RadioButton.prototype.setLabel = function(label) {
    this._label = label;
    this.drawRadio();
    return this;
}

mc.RadioButton.prototype.getLabel = function() {
    return this._label;
}
