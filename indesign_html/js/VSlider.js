mc.VSlider = function(parent, x, y, handler) {
    mc.initComp(this, parent, x, y);
    this.handler = handler;
    this.mouseIsOver = false;
    this._minimum = 0;
    this._maximum = 100;
    this._value = 0;
    this.canvas.width = this._width = 10;
    this.canvas.height = this._height = 110;
    this.calculateHandle();
    this.draw();
    this._continuous = true;
    $(this.canvas).css("cursor", "pointer");
    $(this.canvas).mouseover($.proxy(this.onMouseOver, this));
    $(this.canvas).mouseout($.proxy(this.onMouseOut, this));
    $(this.canvas).mousedown($.proxy(this.onMouseDown, this));
}

mc.initCompClass(mc.VSlider);

mc.VSlider.prototype.draw = function() {
    this.drawBack();
    this.drawHandle();
}

mc.VSlider.prototype.drawBack = function() {
    this.drawRect(0, 0, this._width, this._height, mc.style.shadowColor);
    this.drawRect(1.5, 1.5, this._width - 1.5, this._height - 1.5, "#d0d0d0");
}

mc.VSlider.prototype.drawHandle = function() {
    this.drawRect(1, this.handleY + 1, this._width - 2, this._width - 2, mc.style.highlightColor);
    this.drawRect(2, this.handleY + 2, this._width - 2, this._width - 2, mc.style.shadowColor);
    this.drawRect(2, this.handleY + 2, this._width - 3, this._width - 3, mc.style.buttonDownColor);
}

mc.VSlider.prototype.calculateHandle = function() {
    var range = this._maximum - this._minimum;
    var percent = (this._value - this._minimum) / range;
    var h = this._height - this._width;
    this.handleY = h - h * percent;
}

mc.VSlider.prototype.onMouseOver = function(event) {
    this.mouseIsOver = true;
}

mc.VSlider.prototype.onMouseOut = function(event) {
    this.mouseIsDown = false;
    this.mouseIsOver = false;
}

mc.VSlider.prototype.onMouseDown = function(event) {
    this.mouseIsDown = true;
    var y = event.pageY - this.getPagePosition().y;
    if(y >= this.handleY &&
       y <= this.handleY + this._width) {
        this.dragging = true;
        this.dragOffset = y - this.handleY;
        $(document).bind("mouseup", $.proxy(this.onMouseUp, this));
        $(document).bind("mousemove", $.proxy(this.onMouseMove, this));
    }
    else {
        this.handleY = Math.max(0, y - this._width / 2);
        this.handleY = Math.min(this._height - this._width, this.handleY);
        this.calculateValue();
        this.draw();
        if(this.handler) {
            this.handler(this);
        }
        this.updateLabel();
    }
}

mc.VSlider.prototype.onMouseUp = function(event) {
    if(this.dragging) {
        if(this.handler) {
            this.handler(this);
        }
        this.updateLabel();
    }
    this.mouseIsDown = false;
    this.dragging = false;
    $(document).unbind("mouseup", $.proxy(this.onMouseUp, this));
    $(document).unbind("mousemove", $.proxy(this.onMouseMove, this));
}

mc.VSlider.prototype.onMouseMove = function(event) {
    if(this.dragging) {
        var y = event.pageY - this.getPagePosition().y;
        this.handleY = y - this.dragOffset;
        this.handleY = Math.min(this.handleY, this._height - this._width);
        this.handleY = Math.max(this.handleY, 0);
        
        this.calculateValue();
        if(this._continuous && this.handler) {
            this.handler(this);
        }
        this.updateLabel();
        this.draw();
    }
}

mc.VSlider.prototype.updateLabel = function() {
    if(this.label) {
        this.label.setText(this.getValue(this.labelPrecision));
    }    
}

mc.VSlider.prototype.calculateValue = function() {
    var range = this._maximum - this._minimum;
    var h = this._height - this._width;
    this._value = this._minimum + (h - this.handleY) / h * range;
    this._value = Math.min(this._value, this._maximum);
    this._value = Math.max(this._value, this._minimum);
    this.draw();
}

mc.VSlider.prototype.setSliderParams = function(min, max, value) {
    this._minimum = min;
    this._maximum = max;
    this._value = value;
    this.calculateHandle();
    this.draw();
    return this;
}

mc.VSlider.prototype.setValue = function(val) {
    this._value = val;
    this.calculateHandle();
    this.draw();
    return this;
}

mc.VSlider.prototype.getValue = function(precision) {
    if(precision == undefined) {
        return this._value;        
    }
    var mult = Math.pow(10, precision);
    return Math.round(this._value * mult) / mult;
}

mc.VSlider.prototype.setMaximum = function(max) {
    this._maximum = max;
    this.calculateHandle();
    this.draw();
    return this;
}

mc.VSlider.prototype.getMaximum = function() {
    return this._maximum;
}

mc.VSlider.prototype.setMinimum = function(min) {
    this._minimum = min;
    this.calculateHandle();
    this.draw();
    return this;
}

mc.VSlider.prototype.getMinimum = function() {
    return this._minimum;
}

mc.VSlider.prototype.bindLabel = function(label, precision) {
    this.label = label;
    this.labelPrecision = precision;
    this.updateLabel();
    return this;
}

mc.VSlider.prototype.setContinuous = function(bool) {
    this._continuous = bool;
    return this;
}

mc.VSlider.prototype.getContinuous = function() {
    return this._continuous;
}
