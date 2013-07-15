mc.HSlider = function(parent, x, y, handler) {
    mc.initComp(this, parent, x, y);
    this.handler = handler;
    this.mouseIsOver = false;
    this._minimum = 0;
    this._maximum = 100;
    this._value = 0;
    this.setSize(this._width = 110,
                 this._height = 10);
    this.calculateHandle();
    this.draw();
    this._continuous = true;
    $(this.canvas).css("cursor", "pointer");
    $(this.canvas).mouseover($.proxy(this.onMouseOver, this));
    $(this.canvas).mouseout($.proxy(this.onMouseOut, this));
    $(this.canvas).mousedown($.proxy(this.onMouseDown, this));
}

mc.initCompClass(mc.HSlider);

mc.HSlider.prototype.draw = function() {
    this.drawBack();
    this.drawHandle();
}

mc.HSlider.prototype.drawBack = function() {
    this.drawRect(0, 0, this._width, this._height, mc.style.shadowColor);
    this.drawRect(1.5, 1.5, this._width - 1.5, this._height - 1.5, "#d0d0d0");
}

mc.HSlider.prototype.drawHandle = function() {
    this.drawRect(this.handleX + 1, 1, this._height - 2, this._height - 2, mc.style.highlightColor);
    this.drawRect(this.handleX + 2, 2, this._height - 2, this._height - 2, mc.style.shadowColor);
    this.drawRect(this.handleX + 2, 2, this._height - 3, this._height - 3, mc.style.buttonDownColor);
}

mc.HSlider.prototype.calculateHandle = function() {
    var range = this._maximum - this._minimum;
    var percent = (this._value - this._minimum) / range;
    var w = this._width - this._height;
    this.handleX = w * percent;
}

mc.HSlider.prototype.onMouseOver = function(event) {
    this.mouseIsOver = true;
}

mc.HSlider.prototype.onMouseOut = function(event) {
    this.mouseIsDown = false;
    this.mouseIsOver = false;
}

mc.HSlider.prototype.onMouseDown = function(event) {
    this.mouseIsDown = true;
    var x = event.pageX - this.getPagePosition().x;
    if(x >= this.handleX &&
       x <= this.handleX + this._height) {
        this.dragging = true;
        this.dragOffset = x - this.handleX;
        $(document).bind("mouseup", $.proxy(this.onMouseUp, this));
        $(document).bind("mousemove", $.proxy(this.onMouseMove, this));
    }
    else {
        this.handleX = Math.max(0, x - this._height / 2);
        this.handleX = Math.min(this._width - this._height, this.handleX);
        this.calculateValue();
        this.draw();
        if(this.handler) {
            this.handler(this);
        }
        this.updateLabel();
    }
}

mc.HSlider.prototype.onMouseUp = function(event) {
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

mc.HSlider.prototype.onMouseMove = function(event) {
    if(this.dragging) {
        var x = event.pageX - this.getPagePosition().x;
        this.handleX = x - this.dragOffset;
        this.handleX = Math.min(this.handleX, this._width - this._height);
        this.handleX = Math.max(this.handleX, 0);
        
        this.calculateValue();
        if(this._continuous && this.handler) {
            this.handler(this);
        }
        this.updateLabel();
        this.draw();
    }
}

mc.HSlider.prototype.updateLabel = function() {
    if(this.label) {
        this.label.setText(this.getValue(this.labelPrecision));
    }    
}

mc.HSlider.prototype.calculateValue = function() {
    var range = this._maximum - this._minimum;
    var w = this._width - this._height;
    this._value = this._minimum + this.handleX / w * range;
    this._value = Math.min(this._value, this._maximum);
    this._value = Math.max(this._value, this._minimum);
    this.draw();
}

mc.HSlider.prototype.setSliderParams = function(min, max, value) {
    this._minimum = min;
    this._maximum = max;
    this._value = value;
    this.calculateHandle();
    this.draw();
    return this;
}

mc.HSlider.prototype.setValue = function(val) {
    this._value = val;
    this.calculateHandle();
    this.draw();
    return this;
}

mc.HSlider.prototype.getValue = function(precision) {
    if(precision == undefined) {
        return this._value;        
    }
    var mult = Math.pow(10, precision);
    return Math.round(this._value * mult) / mult;
}

mc.HSlider.prototype.setMaximum = function(max) {
    this._maximum = max;
    this.calculateHandle();
    this.draw();
    return this;
}

mc.HSlider.prototype.getMaximum = function() {
    return this._maximum;
}

mc.HSlider.prototype.setMinimum = function(min) {
    this._minimum = min;
    this.calculateHandle();
    this.draw();
    return this;
}

mc.HSlider.prototype.getMinimum = function() {
    return this._minimum;
}

mc.HSlider.prototype.bindLabel = function(label, precision) {
    this.label = label;
    this.labelPrecision = precision;
    this.updateLabel();
    return this;
}

mc.HSlider.prototype.setContinuous = function(bool) {
    this._continuous = bool;
    return this;
}

mc.HSlider.prototype.getContinuous = function() {
    return this._continuous;
}
