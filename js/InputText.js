
mc.InputText = function(parent, x, y, text, handler) {
    this.handler = handler;
    this._text = text;
    this.input = $("<input type='text'/>")
        .css("position", "absolute")
        .css("left", x)
        .css("top", y)
        .css("font-family", mc.style.fontName)
        .css("font-size", mc.style.fontSize)
        .css("color", mc.style.fontColor)
        .css("border-style", "solid")
        .css("border-width", "1px")
        .css("outline-style", "none")
        .css("border-left-color", mc.style.shadowColor)
        .css("border-top-color", mc.style.shadowColor)
        .css("border-right-color", mc.style.highlightColor)
        .css("border-bottom-color", mc.style.highlightColor)
        .css("background-color", mc.style.inputTextBGColor);
    this.input.attr("value", text)
    this.input.keyup($.proxy(this.onTextChange, this));
    $(parent).append(this.input);
    this.move(x, y);
    this._width = this.input.attr("width");
    this._height = this.input.attr("height");
}

mc.InputText.prototype.onTextChange = function() {
    var oldText = this._text;
    this._text = this.input.attr("value");
    if(this.handler && oldText != this._text) {
        this.handler();
    }
}

mc.InputText.prototype.setText = function(text) {
    this._text = text;
    this.input.attr("value", text);
    this.draw();
    return this;
}

mc.InputText.prototype.getText = function() {
    return this._text;
}

mc.InputText.prototype.move = function(x, y) {
    this._x = x;
    this._y = y;
    this.input
        .css("top", this._y)
        .css("left", this._x);
    return this;
};

mc.InputText.prototype.setSize = function(w, h) {
    this._width = w;
    this._height = h;
    this.input
        .css("width", this._width)
        .css("height", this._height);
    return this;
};

mc.InputText.prototype.getWidth = function() {
    return this._width;
};

mc.InputText.prototype.setWidth = function(w) {
    this._width = w;
    this.input.css("width", this._width);
    return this;
};

mc.InputText.prototype.getHeight = function() {
    return this._height;
};

mc.InputText.prototype.setHeight = function(h) {
    this._height = h;
    this.input.css("height", this._height);
    return this;
};

mc.InputText.prototype.getX = function() {
    return this._x;
};

mc.InputText.prototype.setX = function(x) {
    this._x = x;
    $(this.input)
        .css("left", this._x);
    return this;
};

mc.InputText.prototype.getY = function() {
    return this._y;
};

mc.InputText.prototype.setY = function(y) {
    $(this.input)
        .css("top", this._y)
    return this;
};
