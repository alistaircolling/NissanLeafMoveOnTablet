



            $(function(){
                // hide video
                $("#myVideo").css({'visibility' : 'hidden', 'display' : 'none'});

                // extend button functionality
                $('#fs').bind('touchstart', function() {
                    // display the video
                    $("#myVideo").css({'visibility' : 'visible', 'display' : 'block'});

                    $("#fs").css({'visibility' : 'hidden', 'display' : 'none'});
                    
                    // launch the video fullscreen
                    $("#myVideo")[0].webkitEnterFullscreen();
                });
            });