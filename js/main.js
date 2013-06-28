var APPLICATION = APPLICATION || {};

APPLICATION.POINTER_EVENT = (function() {
    //check if the browser supports touch events
    var supportsTouch = 'createTouch' in document;
    //base our event names on the result...
    var obj = {
        CLICK: (supportsTouch) ? 'tap' : 'click',
        START:  (supportsTouch) ? 'touchstart' : 'mousedown',
        MOVE:   (supportsTouch) ? 'touchmove'  : 'mousemove',
        END:    (supportsTouch) ? 'touchend'   : 'mouseup',
        getPointerPosition: function(ev) { return { x: (supportsTouch) ? ev.touches[0].pageX : ev.pageX, y: (supportsTouch) ? ev.touches[0].pageY : ev.pageY } }
    }
    return obj;
})();

APPLICATION.getTouchPosition = function(ev) {
    if( event.pageX ) {
        return { x: ev.pageX, y: ev.pageY }
    } else if( event.touches.length !== 0 ) {
        return { x: ev.touches[0].pageX, y: ev.touches[0].pageY }
    } else if( event.changedTouches.length !== 0 ) {
        return { x: ev.changedTouches[0].pageX, y: ev.changedTouches[0].pageY }
    } else {
        return { x: 0, y: 0 }
    }
};


APPLICATION.main = function() {
    this.currentPage = 0;
    console.log("hello");
    this.divs = [$('#page1'), $('#page2'), $('#page3'), $('#page4')];
    console.log(window.innerWidth);
    this.appDimensions = {width: window.innerWidth, height: window.innerHeight};
    this.arrangeDivs();
    this.swipeActivated = false;

    var startPoint, endPoint, startTime, endTime,
        that = this;
    $('#containerWrapper').bind(APPLICATION.POINTER_EVENT.START, function(event) {
        console.log("swipeActivated: " + that.swipeActivated);
        console.log(event);
       if( !that.swipeActivated ) return;
        startPoint = APPLICATION.getTouchPosition(event);
        startTime = new Date();
        $(this).one(APPLICATION.POINTER_EVENT.END, function(event) {
            endPoint = APPLICATION.getTouchPosition(event);
            endTime = new Date();
            if( endTime.getTime() - startTime.getTime() > 500 || Math.abs(startPoint.x - endPoint.x) < 25 ) return;
            startPoint.x < endPoint.x ? that.gotoPage(that.currentPage - 1) : that.gotoPage(that.currentPage + 1);
        });
    });


    console.log('dhrubo' + this.currentPage);

    var that = this;

    $('#page1').bind(APPLICATION.POINTER_EVENT.START, function() {
        that.gotoPage(1);

       
    });
    $('#page2').bind(APPLICATION.POINTER_EVENT.START, function() {
        that.gotoPage(2);
      
    });   
     $('#page3').bind(APPLICATION.POINTER_EVENT.START, function() {
        that.gotoPage(3);
        
    });   
        $('#page4').bind(APPLICATION.POINTER_EVENT.START, function() {
        that.gotoPage(0);
        
    });

   // $('#page1').bind(APPLICATION.POINTER_EVENT.START, function(event) {
     //   console.log("CLICKCCC");

   // })

 
}

APPLICATION.main.prototype.arrangeDivs = function() {
    $('#containerWrapper').css({
        'width': this.appDimensions.width + 'px',
        'min-height': this.appDimensions.height + 'px'
    });
    for( var i=0; i<this.divs.length; i++ ) {
        $(this.divs[i]).addClass('test')
        $(this.divs[i]).css({
            'left': (this.appDimensions.width * i) + "px",
            'top': '0px',
            'width': this.appDimensions.width + 'px',
            'min-height': this.appDimensions.height + 'px'
        });
    }

//    $('#pageContainer').css('width', (this.appDimensions.width * i) + 'px');
}








APPLICATION.main.prototype.gotoPage = function(pageNumber) {
    console.log("Go to page " + pageNumber);

    if( pageNumber < 0 || pageNumber >= this.divs.length ) return;
    this.currentPage = pageNumber;

    $('#pageContainer').css('-webkit-transform', 'translate3d('+(-1 * (this.currentPage * this.appDimensions.width))+'px, 0px, 0px)');
      $(this.pageNumber).addClass('openInfo');

}



